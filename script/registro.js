
const formulario=document.getElementById("formulary")
formulario.addEventListener("submit", (event)=>{
    event.preventDefault();
    const formu = document.getElementById("formulary").value;
    console.log(formu)
    if (formu){
        fetch("http://localhost:3000/usuario", {
      method: "POST",
      body: JSON.stringify(formu),
      headers: {
        "Content-Type": "application/json",
      }, 
    }) .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
}
})