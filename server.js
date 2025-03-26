// Loads the express module
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const path = require("path");

// Creates our express server
const app = express();
const port = 3000;

// Serves static files (we need it to import a CSS file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

// Render the initial page
app.get("/", (req, res) => {
  res.render("index");
});

// Render the "Happy" page
app.get("/happy", (req, res) => {
  res.render("happy");
});

// Handle form submission
app.post("/happy", (req, res) => {
  const name = req.body.name || "Friend";
  const gender = req.body.gender;
  const pronoun = gender === "male" ? "he's" : "she's";

  let invitees = [];
  let i = 1;
  while (req.body[`name${i}`]) {
    if (req.body[`checkbox${i}`] === "on") {
      invitees.push(req.body[`name${i}`]);
    }
    i++;
  }

  if (invitees.length === 0) {
    invitees = ["Someone"]; // Fallback to prevent errors
  }

  // Construct the birthday song
  let birthday = "";
  for (let j = 0; j < 2; j++) {  
    birthday += `${invitees[j % invitees.length]}: Happy\n\n`;
    birthday += `${invitees[(j + 1) % invitees.length]}: birthday\n\n`;
    birthday += `${invitees[(j + 2) % invitees.length]}: to\n\n`;
    birthday += `${invitees[(j + 3) % invitees.length]}: you!\n\n\n`;
  }

  birthday += `${invitees[0]}: Happy\n\n`;
  birthday += `${invitees[1 % invitees.length]}: birthday\n\n`;
  birthday += `${invitees[2 % invitees.length]}: dear ${name}.\n\n`;
  birthday += `${invitees[3 % invitees.length]}: Happy\n\n`;
  birthday += `${invitees[4 % invitees.length]}: birthday\n\n`;
  birthday += `${invitees[5 % invitees.length]}: to you!\n\n`;

  birthday += `\n${invitees[0]}: For ${pronoun} a jolly good fellow,\n\n`;
  birthday += `For ${pronoun} a jolly good fellow,\nFor ${pronoun} a jolly good fellow,\n\n`;
  birthday += `Which nobody can deny!\n\n`;

  res.render("happy", { name, pronoun, invitees, birthday });
});

// Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening on port ${port}`));
