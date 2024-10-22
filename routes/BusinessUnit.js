const express = require("express");
const {
  handleReadBusinessUnit,
  handleCreateBusinessUnit,
  handleUpdateBusinessUnit,
  handleDeleteBusinessUnit,
} = require("../controllers/BusinessUnitController");
const router = express.Router();

router.get("/", handleReadBusinessUnit);
router.post("/", handleCreateBusinessUnit);
router.patch("/:id_business_unit", handleUpdateBusinessUnit);
router.delete("/:id_business_unit", handleDeleteBusinessUnit);

module.exports = router;
