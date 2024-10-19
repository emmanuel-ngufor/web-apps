import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// PostgreSQL setup
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "Emma-Nuel65",
  port: 5432,
});
db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Fetch all leagues from the database
async function getItems() {
  const result = await db.query("SELECT * FROM leagues ORDER BY id ASC;");
  return result.rows;
}

// GET: Render Home Page with Leagues
app.get("/", async (req, res) => {
  const content = await getItems();
  res.render("home", { content: content });
});

// POST: Add New League
app.post("/new-league", async (req, res) => {
  const { logo, name, type, country, seasons } = req.body;
  try {
    await db.query(
      "INSERT INTO leagues (logo, leaguename, leaguetype, country, seasons) VALUES ($1, $2, $3, $4, $5);",
      [logo, name, type, country, seasons]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

// GET: Edit League Form
app.get("/edit-league/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("SELECT * FROM leagues WHERE id = $1;", [id]);
  const league = result.rows[0];
  res.render("edit", { league: league });
});

// POST: Update League
app.post("/edit-league/:id", async (req, res) => {
  const { id } = req.params;
  const { logo, name, type, country, seasons } = req.body;
  try {
    await db.query(
      "UPDATE leagues SET logo = $1, leaguename = $2, leaguetype = $3, country = $4, seasons = $5 WHERE id = $6;",
      [logo, name, type, country, seasons, id]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

// POST: Delete League
app.post("/delete-league/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM leagues WHERE id = $1;", [id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
