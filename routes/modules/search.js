const express = require("express")
const router = express.Router()
const Rest = require("../../models/rest")

router.get("/", (req,res) => {
    const keyword = req.query.keyword.toLowerCase()
    Rest.find({name: { $regex: `${keyword}`, $options: "i" }})
        .lean()
        .then(rests => res.render("index", { restaurants: rests }))
        .catch(error => console.log(error))
})

module.exports = router