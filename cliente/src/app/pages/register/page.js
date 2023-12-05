'use client'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { postUser } from '@/app/functions/handlerAcessAPI';
import { ToastContainer, toast } from 'react-toastify';
import styles from './register.css'
import Navbar from '@/app/componentes/navbar';

export default function Register() {
  const [registro, setRegistro] = useState({
    nome: '', senha: ''
  });

  const { push, refresh } = useRouter();

  const handlerFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await postUser(registro);
      push('/pages/dashboard');
    } catch {
      return toast.error('Error');
  }

  const success = true;
   if (success) {
      toast.success('Usuário cadastrado com sucesso!');
    } else {
      toast.error('Ocorreu um erro ao cadastrar o usuário.');
    }
  };
    return (
        <body>
        <Navbar />


       <form onSubmit={handlerFormSubmit} class='form'>
        <h1>Cadastrar</h1>
    
      <div class="input">
        <input id="nome" class="input" type="text" name="nome" placeholder="e-mail"  onChange={(e) => { setRegistro({ ...registro, nome: e.target.value }) }}/>
      </div>


      <div class="input">
        <input id="password" class="input" type="password" name="senha"placeholder="Senha"  onChange={(e) => { setRegistro({ ...registro, senha: e.target.value }) }}/>
      </div>


      <div class="input">
        <input id="password" class="input" type="password" name="senhacf" placeholder="Senha de confirmação"  onChange={(e) => { setRegistro({ ...registro,senhacf: e.target.value }) }}/>
      </div>

      <button id='btn'>Cadastrar</button>

      </form>
      <ToastContainer />

        </body>
        )
    };