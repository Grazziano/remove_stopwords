# Text Normalizer App

Uma aplicação de normalização de texto que remove pontuações e palavras irrelevantes (stopwords) de textos em português e inglês. A aplicação também oferece suporte para alternar entre temas claro e escuro.

## Funcionalidades

- **Entrada de Texto**: O usuário pode digitar ou carregar um arquivo de texto.
- **Suporte a Idiomas**: Escolha entre português e inglês para aplicar as remoções de stopwords específicas do idioma.
- **Remoção de Stopwords**: Remove palavras irrelevantes do texto, como preposições, conjunções e artigos.
- **Remoção de Pontuação**: Exclui caracteres de pontuação, preservando acentos.
- **Tema**: Alterne entre os modos claro e escuro para uma melhor experiência de leitura.
- **Lematização**: (Possivelmente em desenvolvimento) Lematiza o texto, reduzindo as palavras à sua forma base.

## Como Usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/Grazziano/remove_stopwords.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute a aplicação:
   ```bash
   npm run dev
   ```

4. Use a interface para:
   - Digitar ou carregar um arquivo de texto.
   - Selecionar o idioma (português ou inglês).
   - Processar o texto removendo pontuações e stopwords.
   - Alternar entre os temas claro e escuro.

## Dependências

- React
- Lucide-react (ícones)
- React-toastify (notificações)
- Arquivos de stopwords customizados para PT e EN.

## Futuras Implementações

- **Lematização de Texto**: Redução das palavras à sua forma base.
- **Suporte a outros idiomas**.
- **Melhorias de interface** com mais opções de customização.
