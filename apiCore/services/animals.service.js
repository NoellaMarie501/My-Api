const { AnimalRepository } = require("../../database/export_classes");
const { HTTP_STATUS } = require("../../constants");

class Animalservice {
  //Method to create a new Animal
  static async createAnimal(name, description, animalAdmin) {
    const animal = await AnimalRepository.createAnimal(
      name,
      description,
      animalAdmin
    );
    if (!animal) {
      return {
        error: "Animal Not Created",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Animal Could not be created",
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "Animal Created successfully",
      data: animal,
    };
  }

  //Method to get a Animal with id
  static async GetAnimal(id) {
    const animal = await AnimalRepository.findAnimalById(id);
    if (!animal) {
      return {
        error: "Could Not get animal",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Animal not found",
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "Animal!!",
      data: animal,
    };
  }

  //Method to get a Animal with id
  static async getAnimalWithName(name) {
    const animal = await AnimalRepository.getAnimalByName(name);
    if (!animal) {
      return {
        error: "Could Not get animal",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Animal not found",
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "Animal!!",
      data: animal,
    };
  }

  //getting all Animals
  static async Animals() {
    const animals = await AnimalRepository.allAnimals();
    if (!animals) {
      return {
        error: "Could Not get animal",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Animal not found",
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "Animal!!",
      data: animals,
    };
  }

  //deleting a Animal with id
  static async DeleteAnimal(id) {
    const animal = await AnimalRepository.deleteAnimal(id);
    if (!animal) {
      return {
        error: "Could Not delete animal",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Could not delete animal",
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "Animal Deleted!!",
      data: animal,
    };
  }
  //Update animal
  static async UpdateAnimal(id, options) {
    const animal = await AnimalRepository.updateAnimal(id, options);
    if (!animal) {
      return {
        error: "Could Not update animal",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Could not update animal",
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "Animal Updated!!",
      data: animal,
    };
  }
}

module.exports = Animalservice;
