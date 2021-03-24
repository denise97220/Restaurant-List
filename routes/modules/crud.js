const express = require("express")
const router = express.Router()
const Rest = require("../../models/rest")

// 設定新增餐廳頁面路由
router.get("/new", (req,res) => {
  return res.render("new")
})

router.post("/new", (req,res) => {
  const newRest = req.body
  Rest.create(newRest)
      .then(() => res.redirect("/"))
      .catch(error => console.log(error))
})

// 設定 show 頁面路由
router.get("/:id", (req,res) => {
  const id = req.params.id
  Rest.findById(id)
      .lean()
      .then(rest => res.render("show", { rest } ))
      .catch(error => console.log(error))
})


// 設定 delete 路由
router.post("/:id/delete", (req,res) => {
  const id = req.params.id
  Rest.findById(id)
      .then(rest => rest.remove())
      .then(() => res.redirect("/"))
      .catch(error => console.log(error))
})

// 設定 edit 路由
router.get("/:id/edit", (req,res) => {
  const id = req.params.id
  Rest.findById(id)
      .lean()
      .then(rest => res.render("edit", { rest }))
      .catch(error => console.log(error))
})

router.post("/:id/edit", (req,res) => {
  const id = req.params.id
  const editedRest = req.body
  Rest.findById(id)
      .then(rest => {
        rest.name = editedRest.name
        rest.category = editedRest.category
        rest.phone = editedRest.phone
        rest.rating = editedRest.rating
        rest.location = editedRest.location
        rest.description = editedRest.description
        rest.image = editedRest.image
        return rest.save()
      })
      .then(() => res.redirect("/"))
      .catch(error => console.log(error))
})


module.exports = router