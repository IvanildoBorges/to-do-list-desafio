import {
  useEffect,
  useState
} from "react";
import { deletarTodasTarefas, listarTarefas } from "../../api/api";
import iconeListaVazia from "../../assets/Clipboard.png";
import ButtonIcon from "../../components/ButtonIcon";
import { TarefaComponente } from "../../components/InputText";
import Loading from "../../components/Loading";
import { ModalShare } from "../../components/Modal";
import { TarefaItem } from "../../components/Tarefa";
import { Tarefa } from "../../models/Tarefa";

export default function Home() {
  const [listaDeTarefas, setListaDeTarefas] = useState<Tarefa[]>([]);
  const [modalAtivo, setModalAtivo] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [textoAnimado, setTextoAnimado] = useState<string>("Não se preocupe! Estamos buscando suas tarefas... 😎");

  function apagarTodasTarefas(): void {
    const mensagem: string = listaDeTarefas.length > 1 ? "tarefas" : "tarefa";

    if (confirm(`Deseja mesmo excluir tudo? Você tem ${listaDeTarefas.length} ${mensagem}`)) {
      deletarTodasTarefas().then(() => setListaDeTarefas([]));
    }
  }

  function enviarTarefasParaWhatsApp() {
    setModalAtivo(!modalAtivo);
  }

  useEffect(() => {
    async function carregarTarefas() {
      setCarregando(true); // Ativa o loading

      try {
        const tarefasBanco: Tarefa[] = await listarTarefas();

        if (tarefasBanco.length > 0) {
          setListaDeTarefas(tarefasBanco);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setTimeout(() => {
          setTextoAnimado("");
          setCarregando(false);
        }, 3000);
      }
    }

    carregarTarefas();
  }, []);

  return (
      <main className="conteiner grid grid-cols-1 pb-16 gap-[3rem] lg:gap-[4rem] lg:pb-24">
        <TarefaComponente lista={listaDeTarefas} setLista={setListaDeTarefas} setLoading={setCarregando} setTextoLoading={setTextoAnimado} />
        {carregando
          ? (
            <div className="flex flex-col items-center">
              <h2 className={"text-[var(--terciaria)] font-[var(--fonte-negrita)] text-center"}>
                {textoAnimado.split("").map((letra, index) => (
                  <span key={index} style={{ animationDelay: `${index * 150}ms` }}>
                    {letra}
                  </span>
                ))}
              </h2>
              <Loading />
            </div>
          )
          : listaDeTarefas.length > 0 
              ? (
                <div className="flex flex-col items-start gap-[1.5rem]">
                  <div className="flex justify-between items-end self-stretch [&>p]:text-[var(--terciaria)] [&>p]:text-[var(--media)] [&>p]:font-[var(--fonte-negrita)] [&>p:not(:last-of-type)]:text-[var(--gray-200)] [&>p>span]:pt-[0.125rem] [&>p>span]:pb-[0.125rem] [&>p>span]:pl-[0.5rem] [&>p>span]:pr-[0.5rem] [&>p>span]:rounded-xl [&>p>span]:bg-[var(--gray-700)]">
                    <p>Tarefas: <span>{listaDeTarefas.length}</span></p>
                    <p>Concluídas: <span>{`${listaDeTarefas.filter(tarefa => tarefa.isConcluida() === true).length} de ${listaDeTarefas.length}`}</span></p>
                  </div>
                    <div className="flex flex-col items-start gap-[0.75rem] self-stretch">
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
                </div>
              )
              : (
                  <div className="flex flex-col justify-center items-center self-stretch gap-[1rem] pt-[4rem] pb-[4rem] pl-[1.5rem] pr-[1.5rem] rounded-lg border-t-1 border-solid border-[var(--gray-400)]">
                    <img 
                      className="w-[3.5rem] h-[3.5rem]" 
                      src={iconeListaVazia} 
                      alt="Icone de lista vazia" 
                    />
                    <p className="text-[var(--gray-300)] font-[var(--fonte-negrita)] text-center">
                      Você ainda não tem tarefas 🥲
                    </p>
                    <span className="text-[var(--gray-300)] text-center font-[var(fonte-normal)]">Adicione tarefas e organize seus itens a fazer</span>
                  </div>
              )
        }
        {modalAtivo 
          ? <ModalShare 
              lista={listaDeTarefas} 
              ativado={modalAtivo} 
              setAtivado={setModalAtivo} 
            /> 
          : <></>}
      </main>
  )
}