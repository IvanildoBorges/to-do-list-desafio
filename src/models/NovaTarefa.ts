import { Tarefa } from "./Tarefa"

export interface NovaTarefa {
    lista: Tarefa[]
    setLista?: React.Dispatch<React.SetStateAction<Tarefa[]>>
}