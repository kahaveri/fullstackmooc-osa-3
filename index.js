const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }

})

app.get('/info', (request, response) => {
    const date = new Date()
    console.log(persons.length)
    response.send('<p>The phonebook has info for ' + persons.length + ' people.</p><p>It is currently ' + date + '</p>')
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random()*5000)

    const person = request.body
    person.id = id

    if (!person.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!person.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    const samename = persons.find(p => p.name === person.name)
    if (samename) {
        return response.status(400).json({
            error: 'a person with the same name is already in the phonebook'
        })
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})