import { createGlobalStyle as globalStyle } from "styled-components";

const rootConfig = globalStyle`
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
        --primaria-dark: #9f581e;
        --secundaria-dark: #5E60CE;
        --terciaria: #4ed399;

        /* Escala de Cinza */
        --gray-100: #F2F2F2;
        --gray-200: #D9D9D9;
        --gray-300: #808080;
        --gray-400: #333333;
        --gray-500: #262626;
        --gray-600: #1A1A1A;
        --gray-700: #0D0D0D;

        /* Feedback */
        --atencao: #E25858;

        /* Dimensões e espaçamentos */
        --altura-header-desktop: 6rem;  /* 96px */
        --altura-header-mobile: 4rem;   /* 64px */
    }

    body, input, textarea {
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

    .conteiner {
        margin: 0 auto;
        padding-top: var(--altura-header-desktop);
        width: 64rem;
    }

    ul, li {
        list-style-type: none;
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
    a.ativo {
        color: var(--secundaria);
    }
    a.ativo:hover {
        color: var(--primaria-dark);
    }

    @media screen and (max-width: 768px) {
        .conteiner {
            padding-top: var(--altura-header-mobile);
            width: 90%;
        }
    }
`;

export default rootConfig;