const { Wallet, Udata } = require('../../models')

let controller = {
    index:async (req,res,next)=>{
        // authuser = res.locals.user
        // Wallet.remove().then((res)=>console.log(res))
        // const wallet = await Wallet.find({userId: authuser._id });
        // console.log(wallet)
        console.log(res.locals)
        res.render('pages/profile', { title: 'Profile'});
    },
    blank:(req,res,next)=>{
        res.render('pages/blank', { title: 'Dashboard' });
    },
    setting:async(req,res,next)=>{
        // try{
            id =res.locals.user._id
            profile = await Udata.findOne({_uid:id}),

            response={
                title:"Settings",
                profile
            }
            res.render('pages/setting', response)
        // }catch(err){
        //     console.log(err)
        // }
    },
    update:(req,res,next)=>{
        id =res.locals.user._id
        var {fname,lname,telNo,location,company,c_des, address} = req.body
        console.log(req.body)
        Udata.findOne({_uid:id}).then((data)=>{
            // console.log(data)
            data.firstName = fname,
            data.lastName = lname,
            data.telNo = telNo,
            data.location = location
            data.company = company
            data.c_description = c_des
            data.address=address
            data.save()
            //  return view
            req.flash('success', "Profile Successfully Updated")
            res.locals.tab = res.locals.tab?res.locals.tab: "profile"
            res.redirect('/'+res.locals.url+'/settings')
        })
        // res.send(req.body)
    },
    bank:(req,res,next)=>{
        id =res.locals.user._id
        var {bName, bAddress, aName, aNo} = req.body
        Udata.findOne({_uid:id}).then((data)=>{
            value={
                bankName:bName,
                bankAddress:bAddress,
                accountName:aName,
                accountNo:aNo
            }
            data.Account_Details = JSON.stringify(value),
            data.save()
            //  return view
            req.flash('success', "Account Successfully Updated")
            
            res.locals.tab = "account"
            res.redirect('/'+res.locals.url+'/settings?tab='+tab)
        })
    },
    
    changePassword:(req,res,next)=>{
        res.send("change")
    }
}
module.exports = controller