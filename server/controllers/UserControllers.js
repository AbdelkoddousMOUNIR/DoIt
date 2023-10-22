const User = require("../models/UserModel");
const Task = require("../models/TaskModel")
const bcrypt = require("bcrypt")
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

//Get User
module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }
        // Do not return the password field in the response
        const { _id, UserName, Gmail , ProfileImg} = user;
        res.status(200).json({ user : { _id , UserName , Gmail , ProfileImg} });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

//Update User
module.exports.updateUser = async (req, res) => {
  try {
    const { UserName, Gmail, Password, NewPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ msg: 'User not found!' });
    }

    // Check if the provided password is correct
    const isPasswordCorrect = await bcrypt.compare(Password, user.Password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: 'Incorrect password!' });
    }

    let updateFields = {
      UserName: UserName || user.UserName,
      Gmail: Gmail || user.Gmail,
    };

    // Upload new image to Cloudinary if a file is provided in the request
    if (req.file) {
      // Delete existing Cloudinary image if it exists
      if (user.Cloudinary_id) {
        await cloudinary.uploader.destroy(user.Cloudinary_id);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      updateFields.ProfileImg = result.secure_url;
      updateFields.Cloudinary_id = result.public_id;
    }

    // Update the password if a new password is provided
    if (NewPassword && NewPassword.length >= 8) {
      const hashedPassword = await bcrypt.hash(NewPassword, 10);
      updateFields.Password = hashedPassword;
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(400).json({ msg: 'Failed to update user!' });
    }

    return res.status(200).json({ updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

//Delete User
module.exports.deleteUser = async (req, res) => {
    let user = await User.findByIdAndDelete(req.params.id)
    await Task.deleteMany({userId:req.params.id})
    if (!user) {
        res.status(400).json({msg : "User not found !"})
    }
    res.status(200).json({msg : "user deleted"})
}