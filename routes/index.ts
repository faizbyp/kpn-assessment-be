import { Router } from "express";
const router = Router();
//import controllers here
import BusinessUnit from "./BusinessUnit";
import Auth from "./Auth";
import TermsPP, { ShortBrief } from "./TermsPP";
import { hashPassword } from "#dep/helper/auth/password";
import AdminWeb from "./AdminWeb";
import Series from "./Series";

//#depusing router
// router.use('/api/<endpoint>', <controller>)
router.use("/api/bu", BusinessUnit);
router.use("/api/terms-pp", TermsPP);
router.use("/api/short-brief", ShortBrief);
router.use("/api/admin", AdminWeb);
router.use("/api/auth", Auth);
router.use("/api/series", Series);

router.use("/api/check", (req, res) => {
  res.status(200).send({
    message: "Connected",
  });
});

// router.post("/api/hash", async (req, res) => {
//   const password = req.body.password;
//   const hashed = await hashPassword(password);
//   res.status(200).send({
//     hashed: hashed,
//   });
// });

// router.get("/api/example", Example.exampleMethod);

export default router;
