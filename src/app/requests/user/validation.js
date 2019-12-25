const { body } = require('express-validator')
let validate ={
    valid:(method) => {
    switch (method) {
        case 'register': {
        return [ 
            body('username', 'userName doesn\'t exists').exists(),
            body('email', 'Invalid email').exists().isEmail(),
            body('password', 'Invalid Password').exists()
        ]   
        }
    }
    }
}
module.exports=validate