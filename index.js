const express = require('express')
const app= express()
const characters= require('./characters.json')

app.use(express.json())

app.get('/characters',(req,res)=>{
    res.status(200).json(characters)
})

app.get('/characters/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const character = characters.find(character=>character.id ===id)
    res.status(200).json(character)
})

app.post('/characters', (req,res)=>{
    characters.push(req.body)
    res.status(200).json(characters)
})

app.put('/characters/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    let character = characters.find(character=>character.id ===id)
    character.name = req.body.name
    character.shortDescription = req.body.shortDescription
    character.description = req.body.description
    character.image = req.body.image
    res.status(200).json(character)
})

app.delete('/characters/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    let character = characters.find(character=>character.id ===id)
    character.splice(characters.indexOf(character),1)
    res.status(200).json(character)
})

app.listen(8080,() =>{
    console.log('I am ready!')
})

