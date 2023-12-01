
import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListaUsers from "@/app/componentes/ListaUsers";

import Navbar from '@/app/componentes/navbar'

export default async function Dashboard() {
   const listando = await getUsers()


    return (
            <div>
                <Navbar />
                <div>
                <Suspense fallback={<p>Carregando...</p>}>
                    <ListaUsers users={listando}/>
                </Suspense>
                </div>
            </div>
    );
};