// const { User } = require('../../models')
const Admin = require('../../models/admin')

let controller = {
    index :async(req, res, next) => {
        const trans = await Admin.find({ });
        const active = (await Admin.find({active:true})).length, 
        deleted=(await Admin.find({isDeleted:true})).length, 
        suspended=(await Admin.find({active:false})).length
        let response ={
            title:'All Admins',
            trans, active, suspended, deleted 
        }
        res.render('pages/user', response);
    }
}
module.exports = controller