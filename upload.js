const mongoose = require('mongoose');
const data_users = require('./module_Schema/module')


const db = [
    {
      username: 'junior',
      password: 'tejeira'
    }
  ]

mongoose.connect('mongodb://localhost/18-11-22')
  .then(async () => {
  // ejecutar upload.js para cargar los archivos
    await data_users.insertMany(db)
    console.log('data upload')
}) 
  .catch(err => console.log(err));

  