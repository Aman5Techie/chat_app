const { User } = require("../DataBase/Schema/userschema");
const { user_schema } = require("../Data_parser/data_parser");

// Make your Middlewares Here
const temp_middleware = (req,res,next)=>{
    console.log("Hi from Middleware");
    next();
}

// Registration 
const register_middleware = async function(req,res,next){

        const data = user_schema.safeParse(req.body);
        if(!data.success){
            res.json({
                msg : data.error
            })
            return ;
        }
        const {username} = data.data;
        const isUser = await User.findOne({username});
        if(isUser){
            res.json({msg: "User Already Exist",status : false}, )
            return;
        } 
   
    next();
}

// Login

const login_middleware = async (req,res,next)=>{
    const {username,password} = req.body;
    const isUser = await User.findOne({username});
    if(!isUser){
        res.json({
            status : false,
            msg : "No user with this userID"
        })
        return ;
    }

    const checkpass = await isUser.checkpassword(password);
    if(!checkpass){
        res.json({
            status : false,
            msg : "Password is Incorrect"
        })
        return ;
    }
    next();


}




module.exports = {temp_middleware,register_middleware,login_middleware}