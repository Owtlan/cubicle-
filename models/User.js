const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

const ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/


const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        uniq: true,
        minlength: 5,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value)
            },
            message: (props) => {
                return `${props.value} is invalid username. Username should consist only english letters and digits!`
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value)
            },
            message: (props) => {
                return `Password should consist only english letters and digits!`
            }
        }
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