const { Message } = require("../DataBase/Schema/messageschema");

const addMessages = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({
        status: true,
        message: "Added Successfully",
      });
    }

    return res.json({
      status: false,
      message: "Not able to added",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllmessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    const message = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectmessages = message.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json({
      projectmessages,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addMessages, getAllmessages };
