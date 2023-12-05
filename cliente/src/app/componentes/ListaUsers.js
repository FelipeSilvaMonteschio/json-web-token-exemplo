export default async function ListaUsers({users}) {
   await new Promise((resolve) => setTimeout(resolve, 1000));
   return (
     <div>
       <center>
       {users?.map((user,index) =>
        <p key={index}>
           {user.nome}
           <br/>
           {user.senha}
        </p>
       )}
       </center>
    </div>
   )
}

          