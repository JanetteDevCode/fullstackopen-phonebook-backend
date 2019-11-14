require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

let persons = [{
    id: 1,
    name: 'Arto Hellas', 
    phone: '040-123456' 
  }, {
    id: 2,
    name: 'Ada Lovelace', 
    phone: '39-44-5323523' 
  }, { 
    id: 3,
    name: 'Dan Abramov', 
    phone: '12-43-234345' 
  }, {
    id: 4,
    name: 'Mary Poppendieck', 
    phone: '39-23-6423122' 
  }
];

app.get('/info', (req, res) => {
  const timestamp = new Date(Date.now()).toString();
  let message = `<p>Phonebook has info for ${persons.length} people.</p>`;
  message += `<p>${timestamp}</p>`;
  res.send(message);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => {
    return person.id === id;
  });

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  persons = persons.filter((person) => {
    return person.id !== id;
  });
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Phonebook server running on port ${port}.`);
});