const express = require('express')
const app = express()
const port = 5500

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))


// app.get('/', (req,res) => {
//     // res.send("O servidor está funcionando.")
//     res.sendFile(__dirname + '/index.html')
// })




app.post('/login', (req, res) =>{
    const {email, password} = req.body

    if(email === "kanekozbr@gmail.com" && password === "123321"){
        res.send(`Login bem-sucedido! Bem vindo, ${email}.`)
    }
    else{
        res.send("Email ou senha inválidos, por favor tente novamente.")
    }
     

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})