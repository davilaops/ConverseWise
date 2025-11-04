# ConversaWise: Transcrição e Resumos com IA

Bem-vindo ao ConversaWise! Esta é uma aplicação web construída com Next.js que utiliza inteligência artificial para transcrever, resumir e analisar conteúdo de áudio e vídeo. Transforme longas reuniões, palestras e chamadas em insights acionáveis e fáceis de digerir.

## ✨ Recursos Principais

- **Transcrição com IA:** Transcreva com precisão áudio e vídeo de diversas fontes, como uploads de arquivos ou links do YouTube.
- **Resumos Inteligentes:** Obtenha resumos estruturados automaticamente, divididos em:
  - Pontos-chave
  - Decisões tomadas
  - Identificação de oradores
  - Insights relevantes
  - Próximos passos
- **Tipos de Resumo Ajustáveis:** Gere diferentes versões do seu resumo (rápido, completo ou executivo) com um único clique.
- **Criação de Destaques:** Selecione trechos da transcrição para criar clipes de destaque em formato de texto ou vídeo.
- **Suporte Multilíngue:** O sistema detecta automaticamente o idioma do conteúdo (suporte inicial para português e inglês).
- **Exportação e Compartilhamento:** Baixe suas transcrições e resumos como arquivos de texto (`.txt`) para fácil compartilhamento.

## 🚀 Tecnologias Utilizadas

- **Frontend:** [Next.js](https://nextjs.org/) (com App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Inteligência Artificial:** [Google Genkit](https://firebase.google.com/docs/genkit) com modelos Gemini
- **Hospedagem (Exemplo):** Configurado para exportação estática, pronto para plataformas como [Netlify](https://www.netlify.com/) ou [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

## ⚡️ Começando

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  Clone o repositório para sua máquina local:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd <NOME_DO_SEU_REPOSITORIO>
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) em seu navegador para ver a aplicação em funcionamento.

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento do Next.js.
- `npm run build`: Gera a build de produção do site. Se `output: 'export'` estiver no `next.config.ts`, isso gerará uma pasta `out` com os arquivos estáticos.
- `npm run start`: Inicia um servidor de produção do Next.js (requer `npm run build` primeiro).
- `npm run lint`: Executa o linter para verificar a qualidade do código.
