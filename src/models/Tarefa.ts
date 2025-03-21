import { v4 as uuidv4 } from "uuid";

export interface PropsTarefa {
    tarefa: Tarefa;
    lista: Tarefa[];
    setLista: React.Dispatch<React.SetStateAction<Tarefa[]>>;
}

interface InterfaceTarefa {
    id?: string;
    descricao: string;
    concluida?: boolean;
}

export class Tarefa {
    private id: string;
    private descricao: string;
    private concluida: boolean;

    constructor(descricao: string, concluida: boolean = false,  id?: string){
        this.id = id || uuidv4(); // Se não houver ID, gera um novo
        this.descricao = descricao;
        this.concluida = concluida;
    };

    static fromJSON(json: InterfaceTarefa): Tarefa {
        return new Tarefa(json.descricao, json.concluida, json.id);
    }

    getId(): string {
        return this.id;
    }

    getDescricao(): string {
        return this.descricao;
    }
    
    setDescricao(descricao: string): void {
        this.descricao = descricao;
    }
    
    isConcluida(): boolean {
        return this.concluida;
    }
    
    setConcluida(concluida: boolean): void {
        this.concluida = concluida;
    }
}