const express = require("express")
const routerLabel = require("route-label")
const memberController = require("../../module/members/controller/memberController")
const ImageUpload = require('../../helper/imageUpload')
const { AuthAdmin } = require("../../middleware/auth")


const router = express.Router()
const namedRouter = routerLabel(router)

namedRouter.get("member-add-page", "/member-add", memberController.memberAdd)
namedRouter.get('member-list', '/member-list', memberController.memberList)

namedRouter.post("add-member", "/member-registration", ImageUpload.single('image'), AuthAdmin("admin"),  memberController.memberRegister)
namedRouter.post("delete-member", "/member-delete/:id", memberController.memberDelete)

module.exports = router