import { createGlobalStyle as globalStyle } from "styled-components";

const rootConfig = globalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    
    :root {
        /* Fonte */
        --familia: "Poppins", sans-serif;
        --estilo: normal;
        --regular: 1rem;      /* 16px */
        --media: 0.875rem;    /* 14px */
        --pequena: 0.75rem;   /* 12px */
        --fonte-negrita: 700;
        --fonte-normal: 400;
        
        /* Cor */
        /* Produto */
        --blue-dark: #1E6F9F;
        --blue: #4EA8D3;
        --purple-dark: #5E60CE;
        --purple: #8284FA;

        /* Escala de Cinza */
        --gray-100: #F2F2F2;
        --gray-200: #D9D9D9;
        --gray-300: #808080;
        --gray-400: #333333;
        --gray-500: #262626;
        --gray-600: #1A1A1A;
        --gray-700: #0D0D0D;

        /* Feedback */
        --danger: #E25858;
    }

    body, input, button, textarea {
        font-family: var(--familia);
        font-weight: var(--fonte-normal);
        font-style: var(--estilo);
    }

    body {
        width: 100%;
        min-width: 320px;
        min-height: 100dvh;
        color: var(--gray-300);
        background-color: var(--gray-600);
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }
`;

export default rootConfig;