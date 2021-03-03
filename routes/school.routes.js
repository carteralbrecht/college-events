module.exports = router => {
    const school = require("../controllers/university.controller.js");

    // Create a new school
    router.post("/school", school.create);

    // Retrieve a single school
    router.get("/school/:schoolId", school.findOne);

    router.get("/school", school.findAll);

    // Update a single school
    router.put("/school/:schoolId", school.update);

    // Delete a single school
    router.delete("/school/:schoolId", school.delete);
};