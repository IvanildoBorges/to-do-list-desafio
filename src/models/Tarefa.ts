import { v4 as uuidv4 } from "uuid";

export interface PropsTarefa {
    tarefa: Tarefa;
    lista: Tarefa[];
    setLista: React.Dispatch<React.SetStateAction<Tarefa[]>>;
}

export interface InterfaceTarefa {
    id?: string;
    descricao: string;
    concluida?: boolean;
    criadoEm?: Date;
    atualizadoEm?: Date;
}

export class Tarefa {
    private id: string;
    private descricao: string;
    private concluida: boolean;
    private criadoEm?: Date;
    private atualizadoEm?: Date;

    constructor(descricao: string, concluida?: boolean,  id?: string, criadoEm?: Date, atualizadoEm?: Date){
        this.id = id || uuidv4(); // Se não houver ID, gera um novo
        this.descricao = descricao;
        this.concluida = concluida || false;
        this.criadoEm = criadoEm;
        this.atualizadoEm = atualizadoEm;
    };

    static fromJSON(json: InterfaceTarefa): Tarefa {
        return new Tarefa(
            json.descricao, 
            json.concluida, 
            json.id, 
            json.criadoEm, 
            json.atualizadoEm
        );
    }

    getId(): string {
        return this.id;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getCriadoEm(): Date | undefined {
        return this.criadoEm;
    }

    getAtualizadoEm(): Date | undefined {
        return this.atualizadoEm;
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