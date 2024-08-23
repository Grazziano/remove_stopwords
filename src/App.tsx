import { ChangeEvent, useState } from 'react';
import './App.css';
import { removeStopwords } from 'stopword';
import { stopwordsEN, stopwordsPT } from './utils/stopwords';

function App() {
  const [text, setText] = useState<string>('');
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [normalizedText, setNormalizedText] = useState<string>('');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(e.target.value as 'pt' | 'en');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const normalizeText = (): void => {
    const words = text.split(/\s+/);
    const stopwords = language === 'pt' ? stopwordsPT : stopwordsEN;
    const normalizedWords = removeStopwords(words, stopwords);
    setNormalizedText(normalizedWords.join(' '));
  };

  return (
    <div>
      <h1>Remover Stopwords e Normalizar Texto</h1>
      <textarea
        rows={10}
        cols={50}
        value={text}
        onChange={handleTextChange}
        placeholder="Cole seu texto aqui..."
      />
      <div>
        <input type="file" onChange={handleFileChange} accept=".txt" />
      </div>
      <div>
        <label>
          Idioma:
          <select value={language} onChange={handleLanguageChange}>
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
          </select>
        </label>
      </div>
      <button onClick={normalizeText}>Normalizar Texto</button>
      <h2>Texto Normalizado:</h2>
      <textarea rows={10} cols={50} value={normalizedText} readOnly />
    </div>
  );
}

export default App;
