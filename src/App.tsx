import { ChangeEvent, useState } from 'react';
import './App.css';
import { removeStopwords, eng, porBr } from 'stopword';
// import { stopwordsEN, stopwordsPT } from './utils/stopwords';

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
    // const stopwords = language === 'pt' ? stopwordsPT : stopwordsEN;
    const normalizedWords = removeStopwords(
      words,
      language === 'pt' ? porBr : eng
    );
    setNormalizedText(normalizedWords.join(' ').toLocaleLowerCase());
  };

  const exportToFile = () => {
    const blob = new Blob([normalizedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'texto_normalizado.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        Remover Stopwords e Normalizar Texto
      </h1>
      <textarea
        rows={10}
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
        value={text}
        onChange={handleTextChange}
        placeholder="Cole seu texto aqui..."
      />
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".txt"
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Idioma:
            <select
              value={language}
              onChange={handleLanguageChange}
              className="border border-gray-300 rounded-md p-2 ml-2"
            >
              <option value="pt">Português</option>
              <option value="en">Inglês</option>
            </select>
          </label>
        </div>
        <button
          onClick={normalizeText}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
        >
          Normalizar Texto
        </button>
      </div>

      {normalizedText && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Texto Normalizado:
          </h2>
          <textarea
            rows={10}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            value={normalizedText}
            readOnly
          />

          <button
            onClick={exportToFile}
            className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-200"
          >
            Exportar Arquivo
          </button>
        </>
      )}
    </div>
  );
}

export default App;
