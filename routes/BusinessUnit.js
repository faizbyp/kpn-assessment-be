const express = require("express");
const { handleReadBusinessUnit } = require("../controllers/BusinessUnitController");
const router = express.Router();

router.get("/", handleReadBusinessUnit);

module.exports = router;
