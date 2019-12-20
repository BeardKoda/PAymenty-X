// const { User } = require('../../models')
const User = require('../../models/user')
let controller = {
    index :async(req, res, next) => {
        const trans = await User.find({ });
        const active =(await User.find({active:true})).length, deleted=(await User.find({isDeleted:true})).length, suspended=(await User.find({active:false})).length
        let response ={
            title:'All Customers',
            trans, active, suspended, deleted 
        }
        res.render('pages/user', response);
    }
}
module.exports = controller