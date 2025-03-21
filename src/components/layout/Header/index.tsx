import { Link } from "react-router-dom";
import logo from "../../../assets/checklist.svg";
import NavBar from "../NavBar";
import style from "./index.module.css";

function Header() {
    return (
        <header className={style.header}>
            {/* Container da logo */}
            <Link className={style['box-logo']} to="/">
                <img className={style.logomarca} src={logo} alt="Logo To-Do List" />
                <strong>To<span>Do</span></strong>
            </Link>

            {/* Container de links de navegação */}
            <NavBar />
        </header>
    )
}

export default Header;