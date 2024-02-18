import { Router } from "express";
import Queue from "../model/Queue.js";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Barbershop",
  });
});

router.get("/admin", async (req, res) => {
  const queues = await Queue.find().lean();
  res.render("admin", {
    title: "Admin panel",
    isAdmin: "true",
    queues: queues,
    userId: "65635156920ab86670819b93" || null,
  });
});

router.get("/add", authMiddleware, (req, res) => {
  res.render("add", {
    title: "Add",
    isAdd: "true",
    errorAddQueues: req.flash("errorAddQueues"),
  });
});

router.post("/add-queue", userMiddleware, async (req, res) => {
  const { firstname, lastname, time } = req.body;
  if (!firstname || !lastname || !time) {
    req.flash("errorAddQueues", "Bo'sh joylarni to'ldiring!");
    res.redirect("/add");
    return;
  }

  const candidateTime = await Queue.findOne({ time });

  if (candidateTime) {
    req.flash("errorAddQueues", "Bu vaqt band !");
    res.redirect("/add");
    return;
  }

  await Queue.create({ ...req.body, user: req.userId });
  res.redirect("/");
});

export default router;
