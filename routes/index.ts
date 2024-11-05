import { Router } from "express";
const router = Router();
//import controllers here
import BusinessUnit from "./BusinessUnit";
import Auth from "./Auth";
import TermsPP from "./TermsPP";

//@using router
// router.use('/api/<endpoint>', <controller>)
router.use("/api/bu", BusinessUnit);
router.use("/api/terms-pp", TermsPP);
router.use("/api/auth", Auth);

router.use("/api/check", (req, res) => {
  res.status(200).send({
    message: "Connected",
  });
});

// router.get("/api/example", Example.exampleMethod);

export default router;
