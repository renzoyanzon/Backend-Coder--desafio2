require('dotenv').config();
const express = require("express");
const {Contenedor}= require("./desafio2");

const PORT = process.env.PORT || 8000;
const app = express();

let products = [];

async function creationFile (){
    const newFile = await new Contenedor('productos');

    await newFile.save ({name:"Vela",stock:10,price:"1500"});
    await newFile.save({name:"Tabla",stock:2,price:"2000"});
    await newFile.save({name:"Botabara",stock:19,price:"150"});

    products = await newFile.getAll();
}

creationFile();

const server= app.listen(PORT, ()=>{
    console.log(`Server up and running on port ${PORT}`);
})

app.get('/',(_req,res)=>{
    res.status(200).send(`<h1> Ingrese la url "/productos" para obtener todos los productos guardados </h1> \n 
                           <h1> O ingrese la url "/productosRandom" para obtener un producto aleatorio`)
})

app.get('/productos',(_req,res)=>{
    res.status(200).send(`<p> ${JSON.stringify(products)} <p/>`)
})

app.get('/productosRandom',(_req,res)=>{
    const randomId = Math.floor(Math.random()* products.length) ;
    res.status(200).send(`El id seleccionado al azar es el: ${randomId} y el producto seleccionado fue ${products[randomId].name}`)
})

