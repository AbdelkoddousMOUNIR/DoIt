const { authVerification } = require("../Middlewares/autorisationVerification");
const { getUser, updateUser, deleteUser} = require("../controllers/UserControllers");
const upload = require("../utils/multer");

const router = require("express").Router()

router.get("/:id", authVerification, getUser)
router.put("/:id" , authVerification , upload.single('image') , updateUser)
router.delete("/:id", authVerification, deleteUser)

module.exports = router
