import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var API_URL = "https://v2.jokeapi.dev";
var categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
var params = [
    "blacklistFlags=nsfw,religious,racist",
    "idRange=0-100"
];



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/get-joke", async (req, res) => {
    try {
        console.log(req.body);
        const result = await axios.get(API_URL + "/joke/" + categories.join(",") + "?" + params.join("&"));
        console.log(result.data);
        res.render("index.ejs", { content: result.data });
      } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
