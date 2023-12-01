'use server'

import { cookies } from "next/dist/client/components/headers"
const serverUrl = 'http://localhost:4000'





// autenticação
const getUserAuthenticated = async (user) => {
    console.log(user)
try{
    const resposeOfApi = await fetch(serverUrl + "/logar", 
    {   method:"POST",
        headers:{ "Content-Type":"Application/json"},
        body: JSON.stringify(user)
    }
);
const userAuth = await resposeOfApi.json();
console.log(userAuth)
return userAuth
}catch{
    return null
}
}




// cadastrar
const postUser = async (user) => {
    console.log(user)
    const token = cookies().get("token")?.value;
try{
    const resposeOfApi = await fetch(serverUrl + "/usuarios/cadastrar", 
    {   method:"POST",
        headers:{ "Content-Type":"Application/json",
        Cookie: `token=${token}`},
        body: JSON.stringify(user)
    }
);
const userlist = await resposeOfApi.json();
return userlist
}catch{
    return null
}
}




//lista de usuarios

const getUsers = async () =>{
    const token = cookies().get("token")?.value
    try{
        const responseOfApi = await fetch(serverUrl + "/usuarios/listar",{
            next: { revalidate: 5},
            headers: {'Content-type': 'Application/json',  
            Cookie: `token=${token}`},
        });
        const listaUsers = responseOfApi.json();
console.log(listaUsers);
        return listaUsers;
    } catch{
        return null;
    }

    }

export { getUsers, getUserAuthenticated, postUser };