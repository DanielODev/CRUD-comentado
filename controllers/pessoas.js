const pessoas = require('../models/pessoas')

const index = async(connection, req, res) => {
  const results = await pessoas.findAll(connection)
  res.render('pessoas/index', { pessoas: results })
 }

 const deleteOne = async(connection, req, res)=>{
     await pessoas.deleteOne(connection, req.params.id)
     res.redirect('/pessoas')
 }
// create
 const createForm = ( req, res) =>{
    res.render('pessoas/create')
 }

 const createProcess = async(connection, req, res) => {
    await pessoas.create(connection, req.body) 
    res.redirect('/pessoas')
 }
// reproveitando para o update
const updateForm = async(connection, req, res) =>{
    const pessoa = await pessoas.findById(connection, req.params.id);
    //pessoa.nascimento = dataAtualFormatada(pessoa.nascimento);
    res.render('pessoas/update', {pessoa})
 }

 const updateProcess = async(connection, req, res) => {
    await pessoas.update(connection, req.params.id, req.body) 
    res.redirect('/pessoas')
 }
//função para formatar a data. pode se usar a função no EJS == value="<%= pessoa.nascimento.toLocaleString('en-us') %>"
 /*function dataAtualFormatada(nascimento){
   var data = new Date(nascimento),
       dia  = data.getDate().toString(),
       diaF = (dia.length == 1) ? '0'+dia : dia,
       mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
       mesF = (mes.length == 1) ? '0'+mes : mes,
       anoF = data.getFullYear();
   return anoF+"-"+diaF+"-"+mesF;
}*/
module.exports = {
    index,
    deleteOne, 
    createForm,
    createProcess,
    updateForm,
    updateProcess
}