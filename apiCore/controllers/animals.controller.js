const express = require("express");
const app = express();
const AnimalService = require("../services/animals.service");
const { responseHandler } = require("../utils/responseHandler");
const { verifyToken } = require("../middleware/control");

//Getting all Animals
app.get("/all", async function (req, res) {
  const page = req.query.page
  const size = req.query.size
  const animals = await AnimalService.Animals(page, size);

  responseHandler({...animals, res})
});

//getting a Animal with id
app.get("/:id", async function (req, res) {
  let id = req.params.id;
  const animal = await AnimalService.GetAnimal(id);
  responseHandler({...animal, res})
});

//getting animal with name
app.get("/:name", async function (req, res) {
  let name = req.params.name;
  const animal = await AnimalService.getAnimalWithName(id);
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
