import { Tarefa } from "./Tarefa"

export interface NovaTarefa {
    lista: Tarefa[]
    setLista?: React.Dispatch<React.SetStateAction<Tarefa[]>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setTextoLoading: React.Dispatch<React.SetStateAction<string>>
}