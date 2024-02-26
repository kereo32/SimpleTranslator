import Textarea from '../../components/Textarea'
import React, { useState, useEffect } from 'react'
import useTranslate from '../../hooks/useTranslate'
import useSpeechRecognition from '../../hooks/useSpeechRecognition'

interface TextEntry {
  originalText: string;
  translatedText: string;
}

const TranslationLayout = () => {
  const [currentText, setCurrentText] = useState('')
  const [textHistory, setTextHistory] = useState<TextEntry[]>([]);
  const { data, isLoading, isError, fetchData, changeLoadState } = useTranslate('https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=tr&api-version=3.0&profanityAction=NoAction&textType=plain')
  const { isListening, stopListening, transcript, startListening } = useSpeechRecognition();
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchDataWithDelay = () => {
      if (currentText) {
        fetchData(currentText)
      }
    };
    if (currentText) {
      changeLoadState(true);
      timeoutId = setTimeout(fetchDataWithDelay, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [currentText]);

  useEffect(() => {
    changeLoadState(false);
    currentText && data && setTextHistory([...textHistory, { originalText: currentText, translatedText: data as string }]);
    setCurrentText('')
  }, [data]);



  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchDataWithDelay = () => {
      if (transcript) {
        fetchData(transcript)
      }
    };
    if (transcript) {
      changeLoadState(true);
      timeoutId = setTimeout(fetchDataWithDelay, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [transcript])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(e.target.value)
  }

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
          <button onClick={() => { stopListening() }}>Stop Listening</button>
          :
          <button onClick={() => { startListening() }}>Start Listening</button>
        }
        <button>TextHistory</button>
      </div>
    </div>
  )
}

export default TranslationLayout;
