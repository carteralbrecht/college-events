const express = require('express');
const router = express.Router();

require("./user.routes")(router);

module.exports = router;