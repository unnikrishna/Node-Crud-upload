const path = require("path");
const express = require('express')
const multer = require("multer");
const { log } = require("console");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const app = express()
const port = 8800


app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/', (req, res) => res.render("homepage"))

app.post('/upload',upload.single('profileimg'), (req, res) => {
    log(req.body)
    log(req.file)
    return res.redirect("/");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))