const express = require("express")
const router = express.Router()
const Rest = require("../../models/rest")

router.get("/", (req,res) => {
  Rest.find()
      .lean()
      .then(rests => res.render("index", { restaurants: rests }))
      .catch(error => console.log(error))
})

module.exports = router