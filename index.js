const dotenv = require('dotenv');

if (dotenv.config().error) {
  console.log('no .env file detected');
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

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

const personExists = (name) => {
  return persons.find((person) => {
    return person.name.toLowerCase() === name.toLowerCase();
  });
};

const idExists = (id) => {
  const found = persons.find((person) => {
    return person.id === id;
  });

  if (found) {
    console.log(`id ${id} is already in use!`);
  }
  return found;
};

const generateId = () => {
  const minId = 1;
  const maxId = 10000;
  let id = 0;

  do {
    id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    console.log(`checking availability of generated id ${id}...`);
  } while (idExists(id));
  console.log(`id ${id} is available and can be assigned`);
  return id;
};

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(morgan('tiny', {
  skip: (req, res) => {
    return req.method === 'POST';
  }
}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data', {
  skip: (req, res) => {
    return req.method !== 'POST';
  }
}));

app.get('/info', (req, res) => {
  const timestamp = new Date(Date.now()).toString();
  let message = `<p>Phonebook has info for ${persons.length} people.</p>`;

  message += `<p>${timestamp}</p>`;
  res.send(message);
});

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((persons) => {
      res.json(persons.map((person) => {
        return person.toJSON();
      }));
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      res.json(person.toJSON());
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  persons = persons.filter((person) => {
    return person.id !== id;
  });
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  
  if (!body.name || !body.phone) {
    return res
      .status(400)
      .json({error: 'name or number missing'});
  }

  const name = body.name.trim();
  const phone = body.phone.trim();

  if (!name || !phone) {
    return res
      .status(400)
      .json({error: 'name and number cannot be blank'});
  }

  if (personExists(name)) {
    return res
      .status(400)
      .json({error: 'name must be unique'})
  }

  const person = {
    id: generateId(),
    name: name,
    phone: phone
  }

  persons = persons.concat(person);
  res.json(person);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Phonebook server running on port ${port}.`);
});