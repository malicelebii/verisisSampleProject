const express = require("express");
const router = express.Router();
const {getUsers,getUser,postUser,updateUser,deleteUser}  = require('../controllers/userController')

router.get("/", getUsers);

router.post("/", postUser);

router.put("/:id", updateUser);

router.get("/:id", getUser);

router.delete("/:id", deleteUser);

module.exports = router;
