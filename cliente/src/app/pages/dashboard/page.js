
import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListaUsers from "@/app/componentes/ListaUsers";
import styles from '../../css/style.module.css'
import Navbar from '@/app/componentes/navbar'

export default async function Dashboard() {
   const users = await getUsers()



    return (
        <div>
            <Navbar />
            <div className={styles.divflex}>
            <Suspense fallback={<div>
                <p>Carregando...</p>
            </div>}>
                <ListaUsers users={users}  />
            </Suspense>
            </div>

            
        </div>
    );
};