import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "alon1525";
const yourPassword = "alon1212";
const yourAPIKey = "3de86959-1066-4f72-a851-8822e31261b2";
const yourBearerToken = "829a2680-6965-4015-99e0-b48516b069df";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    var response = await axios.get(`${API_URL}random`);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    var response = await axios.get(`${API_URL}all?page=2`, {
      auth: { username: yourUsername, password: yourPassword },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    var response = await axios.get(`${API_URL}filter`,{params:{
      score: 5,
      apiKey: yourAPIKey
    },});
    res.render("index.ejs",{content: JSON.stringify(response.data)});
  } catch (error) {
    res.status(404).send(e.message);
  }
});

app.get("/bearerToken",async (req, res) => {

  try {
    var response = await axios.get(`${API_URL}secrets/42`,{headers:{
      Authorization: `bearer ${yourBearerToken}`,
    },});
    res.render("index.ejs",{content: JSON.stringify(response.data)});
  } catch (error) {
    res.status(404).send(e.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
