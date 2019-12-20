const { Transaction } = require('../../models')
let controller = {
    index :async(req, res, next) => {
        const trans = await Transaction.find({ });
        const completed =0, pending=0, cancelled=0
        response ={
            title:'Transactions',
            trans, completed, pending, cancelled, 
        }
        res.render('pages/transaction', response);
    }
}
module.exports = controller