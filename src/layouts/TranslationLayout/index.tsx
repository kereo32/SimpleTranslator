import Textarea from '../../components/Textarea';
import React, { useState, useEffect } from 'react';
import useTranslate from '../../hooks/useTranslate';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';
import TextHistory from '../../components/TextHistory';

interface TextEntry {
  originalText: string;
  translatedText: string;
}

const TranslationLayout = () => {
  const [currentText, setCurrentText] = useState('');
  const [textHistory, setTextHistory] = useState<TextEntry[]>([]);
  const { data, isLoading, isError, fetchData, changeLoadState } = useTranslate(import.meta.env.VITE_TRANSLATOR_API_URL as string);
  const { isListening, stopListening, transcript, startListening } = useSpeechRecognition();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const fetchDataWithDelay = (text: string) => {
      if (text) {
        fetchData(text);
      }
    };
    if (currentText) {
      changeLoadState(true);
      timeoutId = setTimeout(() => fetchDataWithDelay(currentText), 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [currentText]);

  useEffect(() => {
    changeLoadState(false);
    if (data && currentText) {
      setTextHistory(prevTextHistory => [...prevTextHistory, { originalText: currentText, translatedText: data as string }]);
      setCurrentText('');
    }
  }, [data]);

  useEffect(() => {
    setCurrentText(transcript);
  }, [transcript]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(e.target.value);
  };

  return (
    <div className='MainMenuWithOptions'>
      <div className="Main">
        {isListening ?
          <Textarea disabled={true} value={transcript} /> :
          <Textarea placeholder='Text here' setText={handleTextChange} value={currentText} />
        }
        <Textarea value={isLoading ? 'Loading...' : (isError ? 'Error occurred' : data as string)} disabled={true} />
      </div>
      <div className='buttonsBar'>
        {isListening ?
          <button disabled={isListening} onClick={() => { stopListening() }}>Stop Listening</button>
          :
          <button onClick={() => { startListening() }}>Start Listening</button>
        }
      </div>
      <TextHistory textHistory={textHistory} />
    </div>
  );
}

export default TranslationLayout;
