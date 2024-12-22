const UserModel = require("../../auth/model/user")
const express = require('express')
const router = express.Router()
const routerLabel = require('route-label')
const { hashPassword } = require("../../../helper/commonHelper")
const UserRepositories = require("../../auth/repositories/UserRepositories")
const { generateRandomPassword, sendEmailVerification } = require("../../../helper/sendEmailVarification")
const namedRouter = routerLabel(router)


class MemberController {
    // Member Add
    async memberAdd(req, res){
        try{
           return res.render('members/add')
        }catch(err){
            console.log(err)
        }
    }

    // Member List
    async memberList(req, res){
        try{
            const data = await UserModel.find()
            return res.render('members/list', {
                data: data
            })
        }catch(err){
            console.log(err)
        }
    }

    // Members Add Api
    async memberRegister(req, res){
        try{
            const {name, email} = req.body
            if(!name || !email){
                return res.redirect(namedRouter.urlFor("member-add-page"))
            }
            const existingUser = await UserModel.findOne({email})
            if(existingUser){
                return res.redirect(namedRouter.urlFor("member-add-page"))
            }
            const password = generateRandomPassword(12)
            const hashedPassword = await hashPassword(password)
            // Prepare Data 
            const data = {
                name: name, 
                email: email, 
                role: "author",
                password: hashedPassword,
                image: req.file ? req.file.path : null
            }
            // save user 
            const user = await UserRepositories.userRegistration(data)
            if(!user){
                return res.redirect(namedRouter.urlFor("member-add-page"))
            }
            sendEmailVerification(user, password)
            return res.redirect(namedRouter.urlFor("member-list"))
        }catch(err){
            console.log(err)
        }
    }

    // Member Delete 
    async memberDelete(req, res){
        try{
            const id = req.params.id;
            const user = await UserRepositories.userDelete(id)
            if(user){
                return res.redirect(namedRouter.urlFor("member-list"))
            }
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new MemberController()