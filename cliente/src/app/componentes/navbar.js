'use client'
import styles from '../css/style.module.css'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar () {
    const { push, refresh } = useRouter();

    function sair (e) {
        e.preventDefault();
        Cookies.remove('token')
        localStorage.clear('nome')
        push('/')
        refresh()
    }

    return (
            <div id="minhadiv" className={styles.navbar}>
              <a  href='/pages/dashboard'><button id={styles.button}>home</button></a>
              <a  href='/pages/register'><button id={styles.button}>register </button></a>
              <button onClick={sair} id={styles.button}>Sair</button>
            </div>
)
}