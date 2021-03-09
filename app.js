// 使用 require 關鍵字把 express 載入
// 把載入的 express 套件在執行後存成一個名為 app 的變數
const express = require("express")
const app = express()


// 載入 handlebars 及 JSON 檔案
const exphbs = require("express-handlebars")
const restList = require("./restaurant.json")


// 定義要使用的連接埠號 (port number) 
const port = 3000


// 將 template engine 設定為 handlerbars
// 第一個參數是樣板引擎的名稱，第二個參數是樣板引擎相關的設定
// 設定了預設的佈局（default layout）需使用名為 main 的檔案
app.engine("handlebars", exphbs({ defaultLayout: "main" }))


// 告訴 Express 要設定的 view engine 是 handlebars
app.set("view engine", "handlebars")


// 告訴 Express：靜態檔案是放在名為 public 的資料夾中
app.use(express.static("public"))


// 設定 index 頁面路由
app.get("/", (req,res) => {
    res.render("index", { restaurants: restList.results })
})


// 設定 show 頁面路由
app.get("/restaurants/:id", (req,res) => {
    const filterRest = restList.results.filter( rest => rest.id.toString() === req.params.id)
    res.render("show", { rest: filterRest[0] } )
})


// 設定 search 頁面路由
app.get("/search", (req,res) => {
    const keyword = req.query.keyword
    const searchRest = restList.results.filter( rest => rest.name.toLowerCase().includes(keyword.toLowerCase()))   
    res.render("index", { restaurants: searchRest, keyword: keyword })
})


// 監聽並啟動伺服器
app.listen(port, () => {
    console.log("It's work!")
})
