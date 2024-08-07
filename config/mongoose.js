const mongoose = require('mongoose');


module.exports = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/cubicle')


    .then(() => console.log('DB Connected'))
    .catch(err => console.log('DB Error,', err.message));



    mongoose.set('userNewUrlParser', true)
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
}


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/cubicle');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}