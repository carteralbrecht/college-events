module.exports = router => {
    const users = require("../controllers/user.controller.js");

    // Create a new user
    router.post("/user", users.create);

    // Retrieve a single user
    router.get("/user/:userId", users.findOne);

    // Update a single user
    router.put("/user/:userId", users.update);

    // Delete a single user
    // router.delete("/user/:userId", users.delete);
};