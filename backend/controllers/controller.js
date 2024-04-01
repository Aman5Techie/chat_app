const { User } = require("../DataBase/Schema/userschema");
const axios = require("axios");
const { Buffer } = require("buffer");
const basic_controller = (req, res) => {
  res.send("Hi Your Peroject Setup Successfully");
};
// Registration
const register_controller = async (req, res) => {
  const data = req.body;
  const api = "https://api.multiavatar.com/45678945";
  const image = await axios.get(api);
  const buffer = new Buffer(image.data);
  const updatedata = {
    ...data,
    avatarImage : buffer.toString("base64")
  }

  try {
    const user_created = await User.create(updatedata);
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

const login_controller = (req, res) => {
  res.json({
    msg: "Login Successfull",
    status: true,
  });
};

const setAvatar = async (req, res) => {
  // set avataer
  const id = req.params.id;
  const image = req.body.image;
  const isUser = await User.findOne({ username: id });
  const update = await User.findByIdAndUpdate(
    isUser._id,
    {
      avatarImage: image,
      isAvatarImageSet: true,
    },
    { new: true }
  );

  return res.json({
    isSet: update.isAvatarImageSet,
    image,
  });
};

const send_Avatar_controller = async (req, res) => {
  const arr = [];
  const api = "https://api.multiavatar.com/45678945";
  try {
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(`${api}/${Math.random() * 1000}`);
      const buffer = new Buffer(image.data);
      arr.push(buffer.toString("base64"));
    }

    res.json({
      status: true,
      data: arr,
    });
  } catch (error) {
    res.json({
      status: false,
      data: error,
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const current_user = req.params.id;
    const users = await User.find({ username: { $ne: current_user } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    res.json({ status: true, users });
  } catch (error) {
    res.json({
      status: false,
      error,
    });
  }
};

const curr_user = async(req,res)=>{
  const current_user = req.params.id;
  const user = await User.find({username:current_user});
  res.send({
    status : true,
    user
  })
}

module.exports = {
  curr_user,
  allUsers,
  setAvatar,
  basic_controller,
  register_controller,
  login_controller,
  send_Avatar_controller,
};
