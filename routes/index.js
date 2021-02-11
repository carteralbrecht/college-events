const express = require('express');
const router = express.Router();

require("./user.routes")(router);
require("./school.routes")(router);

module.exports = router;