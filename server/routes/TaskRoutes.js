const { authVerification } = require("../Middlewares/autorisationVerification");
const { getTasks, postTask, updateTask, deleteTask } = require("../controllers/TasksControllers");

const router = require("express").Router();

router.get("/getTasks/:id", authVerification, getTasks)
router.post("/postTask/:id", authVerification, postTask)
router.put("/updateTask/:id", authVerification, updateTask)
router.delete("/deleteTask/:id" , authVerification , deleteTask)

module.exports = router;