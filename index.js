const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const mysql =require('mysql')
const bodyParser = require ('body-parser')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'daniel',
    password: '12345',
    database: 'cadastro'
})

//objeto dependencias: para usar nos demais Ex: pessoas...
const dependencies = {
    connection
}

//importar as rotas
const pessoas = require('./routes/pessoas')
//middleware do body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

app.get('/', (req, res) => res.render('home'))
app.use('/pessoas', pessoas(dependencies))

//view engine
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
//abrir a conecção com o banco, antes de a aplicação subir 
connection.connect(()=>{
    app.listen(port,()=>console.log('CRUD listening on port: '+port))
})



