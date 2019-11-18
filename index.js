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

const errorHandler = (err, req, res, next) => {
  console.error('error:', err.message);

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res
      .status(400)
      .json({ error: `${err.name}: malformatted id` });
  } else if (err.name === 'ValidationError') {
    console.log('validation error!');
    return res
      .status(400)
      .json({ error: `${err.name}: ${err.message}` });
  }

  next(err);
};

// eslint-disable-next-line no-unused-vars
morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(morgan('tiny', {
  // eslint-disable-next-line no-unused-vars
  skip: (req, res) => {
    return req.method === 'POST';
  }
}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data', {
  // eslint-disable-next-line no-unused-vars
  skip: (req, res) => {
    return req.method !== 'POST';
  }
}));

app.get('/info', (req, res, next) => {
  const timestamp = new Date(Date.now()).toString();
  let message = '';
  Person.find({})
    .then((persons) => {
      console.log('get info result:', persons);
      if (persons.length > 0) {
        message = `<p>Phonebook has info for ${persons.length} people.</p>`;
      } else {
        message = '<p>Phonebook is empty.</p>';
      }
      message += `<p>${timestamp}</p>`;
      res.send(message);
    })
    .catch((err) => next(err));
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      console.log('get persons result:', persons);
      res.json(persons.map((person) => {
        return person.toJSON();
      }));
    })
    .catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      console.log('get person result:', person);
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.phone) {
    return res
      .status(400)
      .json({ error: 'name or number missing' });
  }

  const person = new Person({
    name: body.name.trim(),
    phone: body.phone.trim()
  });

  person.save()
    .then((savedPerson) => {
      console.log('save person result:', savedPerson);
      res.json(savedPerson.toJSON());
    })
    .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.name || !body.phone) {
    return res
      .status(400)
      .json({ error: 'name or number missing' });
  }

  const person = {
    name: body.name.trim(),
    phone: body.phone.trim()
  };

  Person.findByIdAndUpdate(
    id,
    person,
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      console.log('update person result:', updatedPerson);
      if (updatedPerson) {
        res.json(updatedPerson.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  Person.findByIdAndRemove(id)
    .then((result) => {
      console.log('delete person result:', result);
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Phonebook server running on port ${port}.`);
});