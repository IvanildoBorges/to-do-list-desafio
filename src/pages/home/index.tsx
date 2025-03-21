import {
  useEffect,
  useState
} from "react";
import iconeListaVazia from "../../assets/Clipboard.png";
import ButtonIcon from "../../components/ButtonIcon";
import { TarefaComponente } from "../../components/InputText";
import { ModalShare } from "../../components/Modal";
import { TarefaItem } from "../../components/Tarefa";
import { Tarefa } from "../../models/Tarefa";

export default function Home() {
  const [listaDeTarefas, setListaDeTarefas] = useState<Tarefa[]>([]);
  const [modalAtivo, setModalAtivo] = useState<boolean>(false);

  function apagarTodasTarefas(): void {
    const mensagem: string = listaDeTarefas.length > 1 ? "tarefas" : "tarefa";

    if (confirm(`Deseja mesmo excluir tudo? Você tem ${listaDeTarefas.length} ${mensagem}`)) {
      // axios.delete(`/tarefas/all`).then(() => {
      //   setListaDeTarefas([]);
      // });
      setListaDeTarefas([]);
      localStorage.removeItem("tarefas");
    }
  }

  function enviarTarefasParaWhatsApp() {
    if (modalAtivo) {
      setModalAtivo(false);
    } else {
      setModalAtivo(true);
    }
  }

  useEffect(() => {
    // axios.get("/tarefas").then((res) => {
    //   setListaDeTarefas(res.data.map(Tarefa.fromJSON));
    // });

    const tarefaLocal: string | null = localStorage.getItem("tarefas");

    if (tarefaLocal) {
        setListaDeTarefas(JSON.parse(tarefaLocal).map(Tarefa.fromJSON));
    } else {
        setListaDeTarefas([]);
    }
  }, []);

  useEffect(() => {
    if (listaDeTarefas.length > 0) {
        localStorage.setItem("tarefas", JSON.stringify(listaDeTarefas));
    }
  }, [listaDeTarefas]);

  return (
      <main className="conteiner grid grid-cols-1 pb-16 gap-[3rem] lg:gap-[4rem] lg:pb-24">
        <TarefaComponente lista={listaDeTarefas} setLista={setListaDeTarefas} />
        <div className="flex flex-col items-start gap-[1.5rem]">
            <div className="flex justify-between items-end self-stretch [&>p]:text-[var(--terciaria)] [&>p]:text-[var(--media)] [&>p]:font-[var(--fonte-negrita)] [&>p:not(:last-of-type)]:text-[var(--gray-200)] [&>p>span]:pt-[0.125rem] [&>p>span]:pb-[0.125rem] [&>p>span]:pl-[0.5rem] [&>p>span]:pr-[0.5rem] [&>p>span]:rounded-xl [&>p>span]:bg-[var(--gray-700)]">
              <p>Tarefas: <span>{listaDeTarefas.length}</span></p>
              <p>Concluídas: <span>{`${listaDeTarefas.filter(tarefa => tarefa.isConcluida() === true).length} de ${listaDeTarefas.length}`}</span></p>
            </div>
            <>
              {listaDeTarefas.length === 0
                ? <div className="flex flex-col justify-center items-center self-stretch gap-[1rem] pt-[4rem] pb-[4rem] pl-[1.5rem] pr-[1.5rem] rounded-lg border-t-1 border-solid border-[var(--gray-400)]">
                    <img 
                      className="w-[3.5rem] h-[3.5rem]" 
                      src={iconeListaVazia} 
                      alt="Icone de lista vazia" 
                    />
                    <p className="text-[var(--gray-300)] font-[var(--fonte-negrita)] text-center">
                      Você ainda não tem tarefas cadastradas
                    </p>
                    <span className="text-[var(--gray-300)] font-[var(fonte-normal)]">Crie tarefas e organize seus itens a fazer</span>
                  </div>
                : <div className="flex flex-col items-start gap-[0.75rem] self-stretch">
                    <div className="flex flex-col justify-center items-center gap-[1.5rem] w-full lg:flex-row   lg:justify-between mt-[0.5rem] mb-[0.5rem] ml-[0] mr-[0]">
                      <ButtonIcon 
                        funcao={enviarTarefasParaWhatsApp}
                        texto="Compartilhar"
                        icone="share"
                      />
                      <ButtonIcon 
                        classe="atencao"
                        funcao={apagarTodasTarefas}
                        texto="Apagar tudo"
                        icone="delete"
                      />
                    </div>
                    {listaDeTarefas.map((tarefa) => {
                      return (
                        <TarefaItem 
                          key={tarefa.getId()}
                          tarefa={tarefa}
                          lista={listaDeTarefas}
                          setLista={setListaDeTarefas}
                        />
                      )
                    })}
                  </div>
              }
            </>
          </div>
          {modalAtivo 
            ? <ModalShare 
                lista={listaDeTarefas} 
                ativado={modalAtivo} 
                setAtivado={setModalAtivo} 
              /> 
            : <></>
          }
      </main>
  )
}