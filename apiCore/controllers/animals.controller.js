const express = require("express");
const app = express();
const AnimalService = require("../services/animals.service");
const { responseHandler } = require("../utils/responseHandler");
const { verifyToken } = require("../middleware/control");

//Getting all Animals
app.get("/all", async function (req, res) {
  const page = req.query.page || 1
  const size = req.query.size || 10
  const animals = await AnimalService.Animals(page, size);
  console.log("Controller");
  responseHandler({...animals, res})
});

//getting animal with name
app.get("/animal", async function (req, res) {
  let name = req.query.name;
  console.log("Controller");
  const animal = await AnimalService.getAnimalWithName(name);
  responseHandler({...animal, res})
});

//getting a Animal with id
app.get("/:id", async function (req, res) {
  let id = req.params.id;
  const animal = await AnimalService.GetAnimal(id);
  responseHandler({...animal, res})
});




//Posting or creating a Animal
app.post("/new_Animal", verifyToken, async function (req, res) {
  //console.log(req.body);
  let name = req.body.name;
  let description = req.body.description;
  let userId = req.body.userId;
  
  //console.log("req.body",req.body)
  const animal = await AnimalService.createAnimal(name, description, userId);
  responseHandler({...animal, res})
});

//updating an Animal
app.put("/update/:id", verifyToken, async function (req, res) {
  let id = req.params.id;
  let options = req.body;
  const animal = await AnimalService.UpdateAnimal(id, options);
  responseHandler({...animal, res})
});

//deleting a Animal
app.delete("/delete/:id", verifyToken, async function (req, res) {
  let id = req.params.id;
  const animal = await AnimalService.DeleteAnimal(id);
  responseHandler({...animal, res})
});

module.exports = app;
