import {
    ChangeEvent,
    useEffect,
    useState
} from 'react';
import styled from 'styled-components';
import { Tarefa } from '../models/Tarefa';
import ButtonCTA from './ButtonCTA';

interface Props {
    lista: Tarefa[]
    ativado: boolean
    setAtivado: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = styled.div`
    &.modal-share {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100vh;
        background: rgba(13, 13, 13, .8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all .2s ease-in;
        z-index: 21;
    }

    @media screen and (max-width: 768px) {
        &.modal-share {
            padding: 2rem;
        }
    }
`;

const Form = styled.form`
    &.modal-form {
        width: 40rem;
        border-radius: 1rem;
        background: var(--gray-500);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 5rem;

        .modal-content {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .modal-content label {
            color: var(--gray-100);
            font-weight: var(--fonte-negrita);
        }

        .modal-content .phoneInput::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

        .modal-content .phoneInput {
            height: 3rem;
            width: 30rem;
            border-radius: 0.5rem;
            border: 2px solid var(--primaria);
            background: var(--gray-100);
            color: var(--gray-700);
            outline: 0;
            transition: all .2s ease-in;
            padding: 0.5rem;
        }

        .modal-content .phoneInput:hover {
            border-color: var(--secundaria-dark);
        }

        .modal-content .phoneInput:focus {
            border-color: var(--secundaria-dark);
        }

        .modal-content .messageInput {
            outline: none;
            border: 2px solid var(--gray-400);
            padding: 0.5rem 1rem;
            height: 8rem;
            resize: none; /* Impede o redimensionamento da caixa de texto */
        }

        /* Estilizando a barra de rolagem */
        .messageInput::-webkit-scrollbar {
            width: 0.5rem; /* Largura da barra de rolagem */
        }

        .messageInput::-webkit-scrollbar-track {
            background: var(--gray-100); /* Cor do fundo da barra de rolagem */
            border-radius: 0.625rem;
        }

        .messageInput::-webkit-scrollbar-thumb {
            background: var(--primaria); /* Cor do "polegar" da barra de rolagem */
            border-radius: 0.625rem;
        }

        .messageInput::-webkit-scrollbar-thumb:hover {
            cursor: auto;
            background: var(--secundaria); /* Cor do "polegar" quando o usuário passa o mouse sobre a barra */
        }

        .modal-content button {
            width: 100%;
        }
    }

    @media screen and (max-width: 768px) {
        &.modal-form {
            width: 100%;
            padding: 2rem 1.5rem;

            .modal-content .phoneInput {
                width: 100%;
            }
        }
    }
`;

const Close = styled.button`
    &.close-modal {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 0.5rem;
        color: var(--gray-700);
        border-radius: 100%;
        border: 2px solid var(--primaria);
        background-color: var(--gray-100);
        margin-top: 1rem;
        cursor: pointer;
        transition: all .2s ease-in;
    }

    &.close-modal:hover {
        color: var(--atencao);
        border: 2px solid var(--secundaria);
    }
`;

export function ModalShare({ lista, ativado, setAtivado }: Props) {
    const [phone, setPhone] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    function submitListtForWhatsapp(event: React.FormEvent) {
        event.preventDefault(); // Impede o envio do formulário tradicional

        const isMobile = navigator.userAgent.match('/Android/i')
                || navigator.userAgent.match('/webOS/i')
                || navigator.userAgent.match('/iPhone/i')
                || navigator.userAgent.match('/iPad/i')
                || navigator.userAgent.match('/iPod/i')
                || navigator.userAgent.match('/BlackBerry/i')
                || navigator.userAgent.match('/Windows Phone/i')
            ? true
            : false;


        // Remover formatação e adicionar código do Brasil (55)
        const phoneWithoutFormat = formatarTelefoneParaEnvio(phone);
        const phoneWithCountryCode = `55${phoneWithoutFormat}`;

        // Codificando o número e a mensagem corretamente
        const encodedPhone = encodeURIComponent(phoneWithCountryCode);
        const encodedMessage = encodeURIComponent(message);

        // checar
        const target = isMobile
            ? `whatsapp://send?phone=${encodedPhone}&text=${encodedMessage}`
            : `https://api.whatsapp.com/send?phone=${encodedPhone}&text=${encodedMessage}`;

        window.open(target, '_blank'); // Abre o link do WhatsApp em uma nova aba
        setAtivado(false); // Fecha o modal após o envio
    }

    // Função para formatar o telefone para envio no link do WhatsApp (sem caracteres especiais)
    function formatarTelefoneParaEnvio(telefone: string) {
        return telefone.replace(/\D/g, ''); // Remove tudo que não for número
    }

    function handleChangePhoneNumber(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    
        // Se o campo estiver vazio, limpa o estado e retorna
        if (value.length === 0) {
            setPhone('');
            return;
        }
    
        // Limita a 11 dígitos (2 do DDD + 9 do número)
        value = value.slice(0, 11);
    
        // Formata no padrão (88) 9 9999-9999
        let formattedValue = '';
    
        if (value.length > 0) formattedValue += `(${value.slice(0, 2)}`; // (88
        if (value.length >= 3) formattedValue += `) ${value.slice(2, 3)}`; // (88)9
        if (value.length >= 4) formattedValue += ` ${value.slice(3, 7)}`; // (88) 9 9999
        if (value.length >= 8) formattedValue += `-${value.slice(7)}`; // (88) 9 9999-9999
    
        // apagar os espaços e caracteres especiais
        if (value.length <= 2) formattedValue = value; // Mostra apenas DDD se for < 2 dígitos
    
        setPhone(formattedValue);
    }
      
    function handleCloseModal() {
        setAtivado(!ativado);
    }

    useEffect(() => {
        let concatenarStrings: string = '';

        lista.forEach(item => {
            // Verifica se a tarefa está concluída ou não e adiciona o emoji
            const emoji = item.isConcluida() ? '✅' : '⚠️';
            const descricao = item.getDescricao();

            // Concatena o emoji e a descrição
            if (concatenarStrings === '') {
                concatenarStrings = `${emoji} ${descricao}`;
            } else {
                concatenarStrings += `\n${emoji} ${descricao}`;
            }
        });

        // Atualiza o estado da mensagem
        setMessage(concatenarStrings);
    }, [lista]);

    return (
        <Modal className="modal-share">
            <Form
                onSubmit={submitListtForWhatsapp}
                className="modal-form"
            >
                <div className="modal-content">
                    <label htmlFor="number-whatsapp">Meu número do WhatsApp</label>
                    <input
                        type="tel"
                        name="phone"
                        id="number-whatsapp"
                        placeholder='(88) 9 9999-9999'
                        value={phone}
                        onChange={handleChangePhoneNumber}
                        required
                        className="phoneInput"
                    />
                    <textarea 
                        name="text" 
                        id="text-whatsapp"
                        value={message}
                        onChange={() => {}}
                        className="messageInput"
                    />
                </div>
                <ButtonCTA 
                    classe='full-width' 
                    texto='Enviar' 
                    tarefa={phone.replace(/\D/g, '').length === 11 ? phone : ""} 
                />
            </Form>
            <Close className="close-modal" onClick={handleCloseModal}>
                <span className="material-icons icone">close</span>
            </Close>
        </Modal>
    )
}