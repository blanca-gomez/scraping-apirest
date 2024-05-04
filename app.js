const express = require('express');
const app = express();
const fs=require('fs')
const scraping = require ('./scraping.js')

const port = 3000;

function guardarDatos() {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
}

function leerDatos() {
    try {
      const data = fs.readFileSync('noticias.json', 'utf-8');
      noticias = JSON.parse(data);
      return noticias

    } catch (error) {
      console.error('Error al leer el archivo noticias.json:', error.message);
    }
}

app.get('/noticias', (req,res) => {
    leerDatos()
    res.send(noticias)

})
function getIndex (index) {
    const noticias = leerDatos();
    for(let i=0; i<noticias.length;i++){
        if(i === index){
            return noticias[i]
        }
    }
}

app.get('/noticias/:indice', (req,res) => {
    const indice = parseInt(req.params.indice)
    const noticia = getIndex(indice)
    if (noticia) {
        res.send(noticia)
    }
    else {res.status(404).send("Noticia no encontrada")}

})


app.post('/noticias', (req,res)=>{
    
    const nuevaNoticia = req.body;
    const noticias = leerDatos()

    noticias.push(nuevaNoticia);
    guardarDatos(noticias)
    res.status(200).send('Noticia creada correctamente')
})

app.put('/noticias/:indice', (req,res) => {
    const noticias = leerDatos()
    const noticiaActualizada = req.body
    const indice = req.params.indice

    noticias[indice] = noticiaActualizada

    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
    res.send('Noticia actualizada correctamente')
})

app.delete('/noticias/:indice', (req,res) => {
    leerDatos()
    const indice = req.params.indice
})

app.listen(port, () => {
    console.log(`express is listen on server http://localhost:${port}/noticias`)
})