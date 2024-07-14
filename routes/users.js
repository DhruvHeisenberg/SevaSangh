const express=require("express")
const router=express.Router();

const {registerUser,loginUser,getUserDetails}=require("../controllers/users");
const { authenticateToken } = require("../middleware/auth");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/details",authenticateToken,getUserDetails)

module.exports=router;