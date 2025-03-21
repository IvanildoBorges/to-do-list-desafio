import { ReactNode } from "react";
import styled from "styled-components";

interface PropsCTA {
    classe?: string;
    tipo?: "button" | "submit" | "reset";
    tarefa: string;
    texto: string;
    icone?: ReactNode
}

const CTA = styled.button`
    &.cta {
        width: 12rem;
        height: 100%;
        padding: 0.625rem;
        border-radius: 0.5rem;
        cursor: pointer;
        background-color: var(--primaria);
        color: var(--gray-100);
        text-align: center;
        font-weight: var(--fonte-negrita);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        transition: all .2s ease-in;
    }

    &.cta:hover {
        background-color: var(--secundaria);
    }

    &.cta:disabled {
        background-color: var(--primaria-dark);
        opacity: .7;
        cursor: not-allowed;
    }

    &.full-width {
        width: 100%;
    }

    @media screen and (max-width: 768px) {
        &.cta {
            width: 100%;
            height: 3.5rem;
        }
    }
`;

export default function ButtonCTA({ classe, tipo = "submit", tarefa, texto, icone }: PropsCTA) {
    return (
        <CTA 
            className={`cta ${classe}`} 
            type={tipo} 
            disabled={tarefa.length > 0 ? false : true} 
            aria-disabled={tarefa.length > 0 ? false : true}
        >
            {texto} {icone} 
        </CTA>
    )
}