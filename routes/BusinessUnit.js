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
router.patch("/:id", handleUpdateBusinessUnit);
router.delete("/:id", handleDeleteBusinessUnit);

module.exports = router;
