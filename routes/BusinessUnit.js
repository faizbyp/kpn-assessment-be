const express = require("express");
const {
  handleReadBusinessUnit,
  handleCreateBusinessUnit,
} = require("../controllers/BusinessUnitController");
const router = express.Router();

router.get("/", handleReadBusinessUnit);
router.post("/", handleCreateBusinessUnit);

module.exports = router;
