const { User } = require("../DataBase/Schema/userschema");
const axios = require("axios")
const {Buffer} = require("buffer")
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

const setAvatar = async (req,res)=>{
  // set avataer
  const id = req.params.id;
  const image = req.body.image;
  const isUser = await User.findOne({username : id})
  const update = await User.findByIdAndUpdate(isUser._id,{
    avatarImage : image,
    isAvatarImageSet : true
  },{new:true});

  return res.json({
    isSet : update.isAvatarImageSet,
    image
  })


}




const send_Avatar_controller = async (req,res)=>{
    const arr = [];
    const api = "https://api.multiavatar.com/45678945";
    try {
      for(let i = 0;i<4;i++){
        const image = await axios.get(`${api}/${Math.random() * 1000}`)
        const buffer = new Buffer(image.data);
        arr.push(buffer.toString("base64"));
      }

      res.json({
        status : true,
        data : arr
      })
      
    } catch (error) {
      res.json({
        status : false,
        data : error
      })
      
    }



}

module.exports = {setAvatar, basic_controller, register_controller,login_controller,send_Avatar_controller };
