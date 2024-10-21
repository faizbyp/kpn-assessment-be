const express = require("express");
const router = express.Router();
//import controllers here
const Example = require("../controllers/ExampleController");
const BusinessUnit = require("./BusinessUnit");

//@using router
// router.use('/api/<endpoint>', <controller>)
router.use("/api/bu", BusinessUnit);

router.use("/api", (req, res) => {
  res.status(200).send({
    message: "Connected",
  });
});

router.get("/api/example", Example.exampleMethod);

module.exports = router;
