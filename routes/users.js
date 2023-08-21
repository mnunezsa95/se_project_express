const router = require("express").Router(); // import and create the router
const { getUsers, getUser, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;