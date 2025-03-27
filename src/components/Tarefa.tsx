/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { atualizarTarefa, deletarTarefaPorId } from "../api/api";
import { PropsTarefa, Tarefa } from "../models/Tarefa";

const ItemTarefa = styled.div`
    &.tarefa-item {
        display: flex;
        padding: 1.5rem;
        align-items: flex-start;
        gap: 12px;
        align-self: stretch;
        border-radius: 8px;
        border: 1px solid var(--gray-400);
        background: var(--gray-500);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);

        .checkbox {
            width: 1.5rem;
            height: 1.5rem;
            padding: 0.205rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            overflow: hidden;
            position: relative;
        }

        input[type="checkbox"] {
            position: absolute;
            left: auto;
            top: auto;
            width: 1.091rem;
            height: 1.091rem;
            background: transparent;
            vertical-align: middle;
            color: var(--gray-100);
            border: 2px solid var(--primaria);
            outline: none;
            -webkit-appearance: none;
            appearance: none;
            border-radius: 50%;
            cursor: pointer;
            transition: all .2s;
        }

        input[type="checkbox"]:hover {
            border-color: var(--secundaria);
        }

        .checkbox [type="checkbox"]:checked {
            color: var(--gray-100);
            background: var(--secundaria);
            border-color: var(--secundaria);
        }

        .checkbox input[type="checkbox"]:checked::after {
            content: '✔';
            position: absolute;
            top: -5%;
            left: 15%;
            font-size: var(--pequena);
        }

        .boxParagraph {
            display: flex;
            flex: 1;
        }

        p {
            line-height: 1.4;
            font-weight: var(--fonte-normal);
            font-size: var(--media);
        }

        .paragraph {
            color: var(--gray-100);
        }

        .lineThrought {
            text-decoration: line-through;
            color: var(--gray-300);
        }

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1.5rem;
            width: 1.5rem;
            border-radius: 4px;
            transition: all .2s;
            cursor: pointer;
        }

        .icon:hover, .icon:hover svg {
            background: var(--gray-400);
            color: var(--atencao);
        }
    }

    @media screen and (max-width: 768px) {
        &.tarefa-item {
            padding: 1rem;
        }
    }
`;

export function TarefaItem({ 
    tarefa,
    lista,
    setLista
}: PropsTarefa) {
    async function alternarConclusao(): Promise<void> {
        try {
            // Atualizando a lista localmente
            const novasTarefas: Tarefa[] = lista.map((item) => {
                if (item.getId() === tarefa.getId()) {
                    item.setConcluida(!item.isConcluida());
                }
                return item;
            });

             // Chamada à API para atualizar no backend
            const sucesso: boolean = await atualizarTarefa(tarefa.getId(), tarefa);

            // Atualizando o estado da lista para refletir a alteração
            if (sucesso) {
                setLista(novasTarefas);
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

    async function excluirTarefa(id: string): Promise<void> {
        try {
            if (!tarefa.isConcluida() && !confirm(`Deseja mesmo excluir a tarefa ${tarefa.getDescricao()}?`)) return;

            const resposta: string = await deletarTarefaPorId(id);

            if (resposta) {
                setLista(lista.filter((item) => item.getId() !== id));
            }
        } catch (error: any) {
            alert(error.message);
        }
    }
    
    return (
        <ItemTarefa className="tarefa-item">
            <div className="checkbox">
                <input 
                    type="checkbox" 
                    name="checkTask" 
                    id={`checkTask-${tarefa.getId()}`} 
                    checked={tarefa.isConcluida()}
                    onChange={alternarConclusao}
                />
            </div>
            <div className="boxParagraph">
                <p className={tarefa.isConcluida() ? "lineThrought" : "paragraph"}>
                    {tarefa.getDescricao()}
                </p>
            </div>
            <button className="icon" onClick={() => excluirTarefa(tarefa.getId())}>
                <span className="material-icons" title="Excluir tarefa">delete</span>
            </button>
        </ItemTarefa>
    )
}