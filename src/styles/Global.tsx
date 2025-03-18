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
        --primaria: #FC6E51;
        --secundaria: #8284FA;
        --primaria-dark: #1E6F9F;
        --secundaria-dark: #5E60CE;

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

        /* Dimensões e espaçamentos */
        --altura-header-desktop: 6rem;  /* 96px */
        --altura-header-mobile: 4rem;   /* 64px */
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

    .container {
        padding-top: var(--altura-header-desktop);
    }

    a {
        text-decoration: none;
        color: var(--primaria);
        font-weight: var(--fonte-negrita);
        transition: all .3s ease-in-out
    }
    a:hover {
        color: var(--secundaria);
    }

    @media screen and (max-width: 768px) {
        .container {
            padding-top: var(--altura-header-mobile);
        }
    }
`;

export default rootConfig;