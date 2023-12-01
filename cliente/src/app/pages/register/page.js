'use client'
import { ToastContainer, toast } from 'react-toastify'
import styles from '../../css/style.module.css'
import Navbar from '@/app/componentes/navbar'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { postUser } from '@/app/functions/handlerAcessAPI'


export default function register() {
    const [user, setUser] = useState({
        name: "",
        email: '',
        password: '',
    });
    const { push } = useRouter();

    const registrar = async(event) => {
        e.preventDefault();
        try{
            await postUser(user);
            return push('/pages/dashboard');
        }catch{
            return toast.error('Erro')
        }
    }

    return(
        <div className={styles.divflex}>
            <Navbar />
        <form className={styles.register} onSubmit={registrar}>
            <h1>Registro</h1>

            <div id="blocos">
            <label id={styles.label}>Nome</label>
            <input className={styles.input} type="text" id="btnInput" placeholder="Insira seu Nome" onChange={(e) => {
                setUser({ ...user, name: e.target.value})
            }} required/>
            </div>

            <div id="blocos">
                <label id={styles.label}>Email</label>
                <input className={styles.input} type="email" id="btnInput" placeholder="Insira seu Email" onChange={(e) => {
                setUser({ ...user, email: e.target.value})
            }} required/>
            </div>

            <div id="blocos">
                <label id={styles.label}>Senha</label>
                <input className={styles.input} type="password" id="btnInput" placeholder="Insira sua Senha" onChange={(e) => {
                setUser({ ...user, password: e.target.value})
            }} required/>
            </div>

            <button id={styles.btn} >Cadastrar</button>

        </form>
        <ToastContainer />
        </div>
    )
}