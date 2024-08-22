import { useState } from 'react';
import './App.css';
import { stopwords } from './utils/stopwords';

function App() {
  const [text, setText] = useState<string>('');
  const [processedText, setProcessedText] = useState<string>('');

  function removeStopwords(text: string) {
    return text
      .split(' ')
      .filter((word) => !stopwords.includes(word.toLowerCase()))
      .join(' ');
  }

  function normalizeText(text: string) {
    return text.toLowerCase();
  }

  function processText() {
    const newNormalizeText = normalizeText(text);
    const textWithoutStopwords = removeStopwords(newNormalizeText);

    setProcessedText(textWithoutStopwords);
    console.log(textWithoutStopwords);
  }

  return (
    <>
      <h1>Remover Stopwords e Normalizar Texto</h1>

      <textarea
        id="inputText"
        rows={10}
        cols={50}
        placeholder="Cole seu texto aqui..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <br />
      <input type="file" id="fileInput" />
      <br />
      <button onClick={processText}>Processar Texto</button>

      <h2>Texto Processado:</h2>

      <br />
      <span>{processedText}</span>
    </>
  );
}

export default App;
