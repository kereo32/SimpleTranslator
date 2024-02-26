import { useState, useEffect } from 'react';

let recognition: any | null;

if('webkitSpeechRecognition' in window) {
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
  }

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  }

  useEffect(() => {
    if(!recognition) return;
    recognition.onresult = (event: SpeechRecognitionResult) => {
      const result = Array.from(event.results).map((result: SpeechRecognitionAlternative) => result[0]).map((result: SpeechRecognitionAlternative) => result.transcript).join('');
      setTranscript(result);
    };
  }, [])

  useEffect(() => {
    console.log(isListening, "isListening");
  }, [isListening]);

  return {isListening, transcript, startListening,stopListening};
}

export default useSpeechRecognition;