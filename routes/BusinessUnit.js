const express = require("express");
const {
  handleReadBusinessUnit,
  handleCreateBusinessUnit,
  handleUpdateBusinessUnit,
} = require("../controllers/BusinessUnitController");
const router = express.Router();

router.get("/", handleReadBusinessUnit);
router.post("/", handleCreateBusinessUnit);
router.patch("/:id_business_unit", handleUpdateBusinessUnit);

module.exports = router;
