# Portfólio Jurídico - Front-end

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## Sobre o Projeto

Este é o repositório front-end do projeto **Portfólio Jurídico**. O sistema foi projetado sob medida para uma estudante de direito, com o objetivo de exibir seus artigos, áreas de atuação e evolução acadêmica de forma elegante, performática e dinâmica. 
A aplicação consome dados diretamente de um Headless CMS (Sanity) para garantir atualizações de conteúdo em tempo real sem a necessidade de novos deploys.

## Tecnologias Utilizadas

- **[React](https://reactjs.org/)** - Biblioteca principal para construção da interface.
- **[Vite](https://vitejs.dev/)** - Ferramenta de build super rápida e empacotador de módulos.
- **[Framer Motion](https://www.framer.com/motion/)** - Biblioteca para criação de animações fluidas e interações de interface.
- **[React Router](https://reactrouter.com/)** - Gerenciamento declarativo das rotas da aplicação.
- **[Sanity Client](https://www.sanity.io/docs/js-client)** - SDK para buscar os dados do Headless CMS de forma eficiente.

## Principais Funcionalidades

- **Rotas Dinâmicas**: Criação de páginas sob demanda para **Artigos** e **Evolução Acadêmica** a partir dos dados criados no Sanity.
- **Integração com CMS**: Conteúdo gerenciado totalmente via Back-end (Sanity Studio), refletido imediatamente na interface.
- **Download de Anexos (PDF)**: Suporte integrado para disponibilização de arquivos em formato PDF anexados aos artigos publicados.
- **Animações e Transições**: Navegação suave e revelação de elementos na tela utilizando Framer Motion.

## Variáveis de Ambiente e Configuração

Para conectar este front-end ao Sanity CMS, o projeto utiliza um `projectId` público. 
O projeto se conecta ao Sanity através do Client que está configurado com esse identificador. Você pode encontrar essas credenciais no painel de administração da sua conta Sanity ou através do arquivo `.env` configurado localmente.

Exemplo de uso:
```javascript
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'SEU_PROJECT_ID',
  dataset: 'production',
  useCdn: true, // Use `true` para respostas cacheadas de alta velocidade
  apiVersion: '2023-05-03',
});
```

---

# Legal Portfolio - Front-end

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## About the Project

This is the front-end repository for the **Legal Portfolio** project. The system was custom-designed for a law student, aiming to showcase her articles, practice areas, and academic evolution in an elegant, performant, and dynamic way. 
The application consumes data directly from a Headless CMS (Sanity) to ensure real-time content updates without the need for new deployments.

## Technologies Used

- **[React](https://reactjs.org/)** - Main library for building the user interface.
- **[Vite](https://vitejs.dev/)** - Super fast build tool and module bundler.
- **[Framer Motion](https://www.framer.com/motion/)** - Library for creating fluid animations and interface interactions.
- **[React Router](https://reactrouter.com/)** - Declarative routing management for the application.
- **[Sanity Client](https://www.sanity.io/docs/js-client)** - SDK to fetch data from the Headless CMS efficiently.

## Key Features

- **Dynamic Routes**: On-demand page creation for **Articles** and **Academic Evolution** based on data generated in Sanity.
- **CMS Integration**: Content fully managed via Back-end (Sanity Studio), immediately reflected in the interface.
- **Attachment Downloads (PDF)**: Built-in support for providing PDF files attached to published articles.
- **Animations and Transitions**: Smooth navigation and element reveal on screen using Framer Motion.

## Environment Variables and Configuration

To connect this front-end to Sanity CMS, the project uses a public `projectId`. 
The project connects to Sanity through the Client which is configured with this identifier. You can find these credentials in the administration panel of your Sanity account or through the locally configured `.env` file.

Usage example:
```javascript
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  useCdn: true, // Use `true` for high-speed cached responses
  apiVersion: '2023-05-03',
});
```
