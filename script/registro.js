const form = document.getElementById("formulary")
const Alldatos = (event ) => {
    event.preventDefault();

    const datos = new FormData(event.target);
    const usuarios = Object.fromEntries(datos.entries());
    form.reset();
    console.log(usuarios)
    return usuarios;
  }

const postData = async (nuevoUsuario) => {
try{
    const response = await fetch ("http://localhost:3000/usuarios", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(nuevoUsuario)
    });
    if(response.ok){
        const jsonResponse = await response.json();
        const {email, nombre, password,nombreUsu } = jsonResponse 
        console.log("Usuario guardado", jsonResponse)
        
        window.location.href = "/index.html";
    }


} catch(Error){
    console.log(Error)
}
}
form.addEventListener("submit", (event)=>{
const nuevoUsuario = Alldatos(event);
if (nuevoUsuario){
    postData(nuevoUsuario)
    alert("¡Registro exitoso! Ahora serás redirigido a tu cuenta.");
}
});