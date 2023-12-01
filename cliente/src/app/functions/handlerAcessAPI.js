'use server'
const url = 'localhost:4000'


// autenticação
const getUserAuthenticated = async (user) => {
    console.log(user)
try{
    const resposeOfApi = await fetch(url + "/logar", 
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

//lista de usuarios
const getUsers = async () => {
    try {
        const resposeOfApi = await fetch(url + "/users",{
            next: { revalidate: 10}
        })
        const ListaUsers = resposeOfApi.json()

        return ListaUsers
    }catch {
        return null
    }
}

const postUser = async (user) =>{
    try{
        const resposeOfApi = await fetch(url + "/user", {
            method: "POST",
            headers: { 'Content-Type': 'Aplication/json'},
            body: JSON.stringify(user)
        })
        const userSave = await resposeOfApi.json();
        return userSave
    } catch{
        return null
    }
}

export { getUsers, getUserAuthenticated, postUser };