const { Router } = require("express");
const msg_router = Router();
const controllers = require("../controllers/msgcontrollers")

msg_router.post("/addmsg",controllers.addMessages);
msg_router.post("/getmsg",controllers.getAllmessages);


module.exports = msg_router;