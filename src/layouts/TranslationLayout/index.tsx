import Textarea from '../../components/Textarea'
import React, { useState, useEffect } from 'react'
import useTranslate from '../../hooks/useTranslate'

interface TextEntry {
  originalText: string;
  translatedText: string;
}

const TranslationLayout = () => {
  const [currentText, setCurrentText] = useState('')
  const [textHistory, setTextHistory] = useState<TextEntry[]>([]);
  const { data, isLoading, isError, fetchData, changeLoadState } = useTranslate('https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=tr&api-version=3.0&profanityAction=NoAction&textType=plain')

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
  }, [currentText, fetchData]);

  useEffect(() => {
    changeLoadState(false);
    currentText && data && setTextHistory([...textHistory, { originalText: currentText, translatedText: data as string }]);
    setCurrentText('')
  }, [data]);

  useEffect(() => {
    console.log(textHistory);
  }, [textHistory]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(e.target.value)
  }

  return (
    <div className="Main">
      <Textarea setText={handleTextChange} value={currentText} />
      <Textarea value={isLoading ? 'Loading...' : (isError ? 'Error occurred' : data)} disabled={true} />
    </div>
  )
}

export default TranslationLayout;
