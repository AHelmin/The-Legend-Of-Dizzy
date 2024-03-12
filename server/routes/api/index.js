const router = require("express").Router()
const userRoutes = require("./user.routes");
const highScores = require('./highscores.routes.js')
const messageRoutes = require('./message.routes.js')

router.use("/user", userRoutes);
router.use('/highscores', highScores)
router.use('/message', messageRoutes)

module.exports = router;