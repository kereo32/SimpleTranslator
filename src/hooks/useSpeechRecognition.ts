/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

let recognition: any | null;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
}

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  useEffect(() => {
    if (!recognition) return
    recognition.onresult = (event: any) => {
      const result = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      setTranscript(result);
    };
    recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        recognition.abort();
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (transcript) {
      timeoutId = setTimeout(() => setIsListening(false), 3000); 
    }

    return () => clearTimeout(timeoutId);
  }, [transcript]);

  return { isListening, transcript, startListening, stopListening };
};

export default useSpeechRecognition;
