import styled from "styled-components";

interface PropsBotaoIcone {
    classe?: string;
    funcao?: () => void;
    texto: string;
    icone: string;
}

const BotaoIcone = styled.button`
    &.botao-icone {
        display: flex;
        align-items: center;
        padding: 0.15rem 0.5rem;
        font-size: var(--media);
        font-weight: var(--fonte-negrita); 
        border: 1px solid transparent;
        color: var(--gray-300);
        background: transparent;
        border-radius: 0.5rem;
        transition: all .2s;
        outline: none;
        cursor: pointer;
        gap: 0.25rem;

        &:hover {
            color: var(--secundaria);
            border: 1px solid var(--secundaria);
        }

        .icone{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
        }
    }

    &.atencao:hover {
        color: var(--atencao);
        border: 1px solid var(--atencao);
    }
`;

export default function ButtonIcon({ classe, funcao, texto, icone }: PropsBotaoIcone) {
    return (
        <BotaoIcone className={`botao-icone ${classe}`} onClick={funcao}>
            {texto} <span className="material-icons icone">{icone}</span>
        </BotaoIcone>
    )
}