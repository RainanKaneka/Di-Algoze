const express = require('express')
const router = express.Router();

router.get("/todos", (req,res) =>{
    
    res.json({lista: ["Projeto A", "Projeto B"]})

})

router.post("/novo", (req,res) => {

     
     const {titulo, ano} = req.body;

     res.json({ mensagem: `Projeto '${titulo}' criado com sucesso!`, status: 201})


   

})

module.exports = router;