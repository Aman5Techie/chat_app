const { User } = require("../DataBase/Schema/userschema");

const basic_controller = (req, res) => {
  res.send("Hi Your Peroject Setup Successfully");
};
// Registration 
const register_controller = async (req, res) => {
  const data = req.body;

  try {
    const user_created = await User.create(data);
    res.json({
      msg: "Created Successfully",
      status: true,
      user_created,
    });
  } catch (error) {
    res.json({
      msg: "Not Created Successfully",
      status: false,
      error,
    });
  }
};

// Login 

const login_controller = (req,res)=>{
  res.json({
    msg : "Login Successfull",
    status : true
  })
}
module.exports = { basic_controller, register_controller,login_controller };
