module.exports = router => {
    const event = require("../controllers/event.controller.js");

    // Create a new event
    router.post("/event", event.create);

    // Retrieve a single event
    router.get("/event/:eventId", event.findOne);

    // Update a single event
    router.put("/event/:eventId", event.update);

    // Delete a single event
    router.delete("/event/:eventId", event.delete);
};