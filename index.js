const express = require("express");
const app = express();
const cors = require("cors");


const dir = path.join(__dirname, "public");
app.use(express.static(dir));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (_, res) => {
    return res.sendFile(path.join(dir, './index.html'));
});