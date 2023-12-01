'use client'
import styles from '../../css/style.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from '@/app/componentes/navbar'

export default function alterar() {
    function alterer (e) {
        e.preventDefault();

        toast.success('formulario registrado com secesso');
    }


    return(
        <div>
            <Navbar />
        <form className={styles.register} onSubmit={alterer} >
            <h1>Alterar</h1>

            <div id="blocos">
            <label id={styles.label}>Nome</label>
            <input className={styles.input} type="name" id="btnInput" placeholder="Insira seu Nome" required/>
            </div>

            <div id="blocos">
                <label id={styles.label}>Email</label>
                <input className={styles.input} type="email" id="btnInput" placeholder="Insira seu Email" required />
            </div>

            <div id="blocos">
                <label id={styles.label}>Senha</label>
                <input  className={styles.input}type="password" id="btnInput" placeholder="Insira sua Senha"  required/>
            </div>

            <button id={styles.btn}> Alterar</button>

        </form>
        <ToastContainer />
        </div>
    )
}