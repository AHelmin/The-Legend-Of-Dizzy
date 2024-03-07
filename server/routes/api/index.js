const router = require("express").Router()
const userRoutes = require("./user.routes");
const highScores = require('./highscores.routes.js')

router.use("/user", userRoutes);
router.use('/highscores', highScores)

module.exports = router;