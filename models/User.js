const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', function (next) {
    bcrypt.genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(this.password, salt)
        })
        .then(hash => {
            this.password = hash;
            next()
        })
        .catch(err => {
            // todo
            console.log(err);
        })
})

module.exports = mongoose.model('User', userSchema)