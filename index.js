require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const persons = [{
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

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.listen(port, () => {
  console.log(`Phonebook server running on port ${port}.`);
});