import { ChangeEvent, useState } from 'react';
import { Sun, MoonStar } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { stopwordsEN, stopwordsPT } from './utils/stopwords';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [text, setText] = useState<string>('');
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [normalizedText, setNormalizedText] = useState<string>('');
  const [lemmatizedText, setLemmatizedText] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(e.target.value as 'pt' | 'en');
  };

  const removePunctuationKeepAccents = (text: string): string => {
    return text.replace(/[\.,!;:\?\"'\(\)$${}<>]/g, '');
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

  const removeStopwords = (text: string[], language: 'pt' | 'en'): string[] => {
    if (language === 'pt') {
      return text.filter((word) => !stopwordsPT.includes(word.toLowerCase()));
    } else {
      return text.filter((word) => !stopwordsEN.includes(word.toLowerCase()));
    }
  };

  const normalizeText = (): void => {
    if (!text) return;
    const words = text.split(/\s+/);
    const normalizedWords = removeStopwords(words, language);
    const textLowerCase = normalizedWords.join(' ').toLocaleLowerCase();
    const textWithoutPunctuation = removePunctuationKeepAccents(textLowerCase);
    setNormalizedText(textWithoutPunctuation);
    setIsModalOpen(true); // Abre o modal quando o texto é normalizado
  };

  const lemmatizeText = (): void => {
    if (!text) return;
    alert('Em desenvolvimento!');
    return;
    // TODO: Lógica da função de lemmatização
    const lemmatizedWords = text.split(/\s+/).map((word) => {
      return word.toLowerCase();
    });
    setLemmatizedText(lemmatizedWords.join(' '));
    setIsModalOpen(true); // Abre o modal ao lematizar
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

  const copyText = () => {
    navigator.clipboard.writeText(normalizedText);
    toast.success('Texto copiado!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`h-screen flex flex-col items-center justify-center ${theme}`}
    >
      <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition duration-300 mb-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Remover Stopwords e Normalizar Texto
        </h1>

        <button
          onClick={toggleTheme}
          className="flex items-center justify-center float-right border-none p-2 transition duration-200"
          title="Alternar Tema"
        >
          {theme === 'light' ? (
            <MoonStar className="text-gray-600" />
          ) : (
            <Sun className="text-yellow-500" />
          )}
        </button>

        <textarea
          rows={8}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          value={text}
          onChange={handleTextChange}
          placeholder="Cole seu texto aqui..."
        />

        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".txt"
            className="w-full border border-gray-300 rounded-md p-3 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <label className="block w-full sm:w-auto mb-2 sm:mb-0">
            Idioma:
            <select
              value={language}
              onChange={handleLanguageChange}
              className="border border-gray-300 rounded-md p-2 ml-2 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="pt">Português</option>
              <option value="en">Inglês</option>
            </select>
          </label>
          <button
            onClick={normalizeText}
            className="mt-2 sm:mt-0 bg-blue-500 text-white rounded-lg px-4 py-3 hover:bg-blue-600 transition duration-200"
          >
            Normalizar Texto
          </button>
          <button
            onClick={lemmatizeText}
            className="mt-2 sm:mt-0 bg-purple-500 text-white rounded-lg px-4 py-3 hover:bg-purple-600 transition duration-200"
          >
            Lemmatizar Texto
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mt-4 mb-2 text-gray-800 dark:text-white">
              Texto Normalizado ou Lemmatizado:
            </h2>

            <textarea
              onClick={copyText}
              rows={8}
              className="w-full border border-gray-300 rounded-md p-3 mb-4 cursor-pointer bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              value={normalizedText || lemmatizedText}
              readOnly
            />

            <div className="flex items-center justify-between">
              <span className="tooltip text-sm text-gray-500 dark:text-gray-400">
                Clique no texto para copiar 👆
              </span>

              <button
                onClick={exportToFile}
                className="bg-green-500 text-white rounded-lg px-4 py-3 hover:bg-green-600 transition duration-200"
              >
                Exportar Arquivo
              </button>

              <button
                onClick={closeModal}
                className="bg-red-500 text-white rounded-lg px-4 py-3 hover:bg-red-600 transition duration-200"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
