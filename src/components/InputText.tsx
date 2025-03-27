import {
    ChangeEvent,
    FormEvent,
    InvalidEvent,
    useState
} from "react";
import styled from "styled-components";
import { criarTarefa } from "../api/api";
import { NovaTarefa } from "../models/NovaTarefa";
import { Tarefa } from "../models/Tarefa";
import ButtonCTA from "./ButtonCTA";

const Form = styled.form`
    &.formulario {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 8rem;
        width: 100%;
        height: 3.5rem;
    }

    @media screen and (max-width: 768px) {
        &.formulario {
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 4rem;
            height: auto;
        }
    }
`;

const Input = styled.input`
    &.campo-de-entrada {
        width: 60%;
        padding: 0.875rem;
        border-radius: 0.5rem;
        border: 2px solid var(--primaria);
        color: var(--gray-600);
        background-color: var(--gray-200);
        outline: none;
        transition: all .2s ease-in;

        &:hover {
            border-color: var(--secundaria-dark);
        }

        &:focus {
            background-color: var(--gray-100);
            border-color: var(--secundaria-dark);
        }  
    }

    @media screen and (max-width: 768px) {
        &.campo-de-entrada {
            width: 100%;
        }
    }
`;

export function TarefaComponente({ lista, setLista, setLoading, setTextoLoading }: NovaTarefa) {
    const [novaTarefa, setNovaTarefa] = useState<string | null>(null);

    async function criarNovaTarefa(event: FormEvent) {
        try {
            event.preventDefault();
            setLoading(true); // Ativa o loading
            
            if (novaTarefa && novaTarefa.trim() && setLista !== undefined) {
                const tarefaParaEnviar: Tarefa = new Tarefa(novaTarefa);
                setTextoLoading("Criando sua tarefa... 📋");
    
                const tarefa: Tarefa = await criarTarefa(tarefaParaEnviar);
                setLista([...lista, tarefa]);   // nova lista criada
            } else {
                setTextoLoading("Digite uma tarefa por favor!");
            }
            setNovaTarefa(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setTextoLoading(error.message);
        } finally {
            setTimeout(() => {
                setTextoLoading("");
                setLoading(false);
            }, 2000);
        }
    }

    function carregaNovaTarefa(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("");
        setNovaTarefa(event.target.value);
    }

    function tarefaInvalida(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity("Por favor digite uma tarefa!")
    }

    return (
        <Form className="formulario" onSubmit={criarNovaTarefa}>
          <Input 
            className="campo-de-entrada"
            type="text" 
            name="tarefas" 
            id="campo-tarefas"
            placeholder="Adicione uma nova tarefa..."
            value={novaTarefa ? novaTarefa : ""}
            onChange={carregaNovaTarefa}
            onInvalid={tarefaInvalida}
          />
          <footer>
                <ButtonCTA  
                    tipo="submit"
                    tarefa={novaTarefa ? novaTarefa : ""}
                    texto="Adicionar"
                    icone={<span className="material-icons">add</span>}
                />
          </footer>
        </Form>
    )
}