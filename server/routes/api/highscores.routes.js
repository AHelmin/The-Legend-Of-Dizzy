
const router = require("express").Router()
require("dotenv").config()

//const Highscores = require("../../controllers/Highscores.controller")

const {
    getAllHighscores,
    getHighscoresById,
    createHighscores,
    updateHighscoresById,
    deleteHighscoresById,
} = require("../../controllers/highscores.controller")


router.get("/", async (req, res) => {
  try {
    const payload = await getAllHighscores()
    res.status(200).json({ status: "success", payload })
  }catch(err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const payload = await getHighscoresById(req.params.id)
    res.status(200).json({ status: "success", payload })
  }catch(err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await createHighscores(req.body)
    
    // const token = createToken(payload._id)
    // res.status(200).cookie("auth_cookie", token).json({ status: "success", payload })
  }catch(err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})


router.put("/:id", async (req, res) => {
  try {
    const payload = await updateHighscoresById(req.params.id, req.body)
    res.status(200).json({ status: "success", payload })
  }catch(err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteHighscoresById(req.params.id)
    res.status(200).json({ status: "success", payload })
  }catch(err){
    console.log(err.message)
    res.status(500).json({ status: "error", payload: err.message })
  }
})

module.exports = router;