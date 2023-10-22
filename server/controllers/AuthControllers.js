const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { UserName, Gmail, Password } = req.body;

    const userNameExists = await User.exists({ UserName });
    if (userNameExists) {
      return res.status(400).json({ msg: "Username already exists!" });
    }

    const gmailExists = await User.exists({ Gmail });
    if (gmailExists) {
      return res.status(400).json({ msg: "Gmail already used!" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = new User({
      UserName,
      Gmail,
      Password: hashedPassword,
    });

    await user.save();
    let { _id } = user;
    // Create and sign the JWT token
    const token = jwt.sign({ userId: user._id }, process.env.AccessToken, { expiresIn: "7d" });
    
    return res.status(200).json({ id : _id , token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Login
module.exports.login = async (req, res) => {
  try {
    const { Gmail, Password } = req.body;

    const user = await User.findOne({ Gmail });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create and sign the JWT token
    const token = jwt.sign({ userId: user._id }, process.env.AccessToken , { expiresIn:  "7d"});
    let { _id } = user;
    
    return res.status(200).json({ id : _id , token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

  
  
  
  
  
  