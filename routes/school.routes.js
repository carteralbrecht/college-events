module.exports = router => {
    const school = require("../controllers/school.controller.js");

    // Create a new user
    router.post("/school", school.create);

    // Retrieve a single user
    router.get("/school/:schoolId", school.findOne);

    // Update a single user
    router.put("/school/:schoolId", school.update);

    // Delete a single user
    router.delete("/school/:schoolId", school.delete);
};