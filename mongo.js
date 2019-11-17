const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('missing arguments for database password, phonebook name, and phonebook number');
  process.exit(1);
} else if (process.argv.length === 4) {
  console.log('missing argument for phone number');
  process.exit(1);
}

const dbName = 'phonebook-app';
const dbPassword = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];


const url =
  `mongodb+srv://fullstackopen_rw:${dbPassword}@cluster0-6rw1t.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  const personSchema = new mongoose.Schema({
    name: String,
    phone: String
  }, { collection: 'persons' });
  
const Person = mongoose.model('Person', personSchema);

if (name && phone) {
  const person = new Person({
    name: name,
    phone: phone
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${result.name} ${result.phone} to phonebook`);
      mongoose.connection.close();
  });
} else {
  Person
  .find({})
  .then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.phone}`);
    });
    mongoose.connection.close();
  });
}