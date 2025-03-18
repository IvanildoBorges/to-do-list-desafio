import { useState } from "react";
import { Link } from "react-router-dom";
import iconeClose from "../../../assets/close.svg";
import iconeMenu from "../../../assets/menu.svg";
import style from "./index.module.css";

function NavBar() {
    const [clicou, setClicou] = useState(false);

    function toogleMenu() {
        if (clicou) {
            setClicou(false);
        } else {
            setClicou(true);
        }
    }

    return (
        <nav className={style.navbar}>
            <button type="button" onClick={toogleMenu}>
                <img 
                    className={style.menu}
                    src={clicou ? iconeClose : iconeMenu} 
                    alt={clicou ? "Fechar menu" : "Abrir menu"} 
                    title={clicou ? "Fechar menu" : "Abrir menu"} 
                />
            </button>
            <ul role="list" className={`${style.lista} ${clicou ? style.ativa : ""}`}>
                <li>
                    <Link 
                        className={`${style.item} ativo`} 
                        to='/' 
                        title="Inicio"
                        onClick={toogleMenu}
                    >
                        Inicio
                    </Link>
                </li>
                <li>
                    <a 
                        className={style.item}
                        title="Contato"
                        href="https://www.linkedin.com/in/IvanildoBorges/"
                        referrerPolicy="no-referrer"
                        target="_blank"
                    >Contato</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;