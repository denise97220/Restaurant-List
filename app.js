// 使用 require 關鍵字把 express 載入
// 把載入的 express 套件在執行後存成一個名為 app 的變數
const express = require("express")
const app = express()

// 載入 method override
const methodOverride = require("method-override")

// 載入 Rest model
const Rest = require("./models/rest")

// 載入及設定 mongoose
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/rest-list", { useNewUrlParser: true, 
useUnifiedTopology: true })

// 載入路由
const routes = require("./routes")

// 設定 db
const db = mongoose.connection
db.on("error", () => {
  console.log("mongodb error!")
})
db.once("open", () => {
  console.log("mongodb connected!")
})

// 載入 handlebars 及 JSON 檔案
const exphbs = require("express-handlebars")
const restList = require("./restaurant.json")

// 載入及設定 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))


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

// 將 request 導入路由器
app.use(routes)

app.use(methodOverride("_method"))


// 監聽並啟動伺服器
app.listen(port, () => {
    console.log("It's work!")
})
