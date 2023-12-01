import styles from '../css/style.module.css'


export default async function ListaUsers({users}){
    await new Promise((resolve) => setTimeout(resolve, 2000))
        return(
        <div>     
            <div className={styles.cardconteiner}>     

                {users?.map((user, index) =>

                <div key={index} className={styles.card}>
                <h1>{user.name}</h1>
                <h1>{user.email}</h1>
                <h1>{user.password}</h1>
                </div>

            )}
            
        </div>
        </div>
        )
        

}