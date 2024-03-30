const { Router } = require("express");
const controllers  = require("../controllers/controller");


const { temp_middleware ,register_middleware,login_middleware } = require("../middlewares/middleware");


const router = Router();

router.route("/").get(temp_middleware, controllers.basic_controller);

router.post("/register",register_middleware,controllers.register_controller)

router.post("/login",login_middleware,controllers.login_controller);

module.exports = router;