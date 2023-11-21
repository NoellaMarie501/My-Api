const db = require("../models/connection");
const userModel = require("../models/user.model");
class AnimalRepository {
  //cresting new Animal
  static async createAnimal(name, description, userId) {
    // console.log("AnimalAdmin", AnimalAdmin);
    const user = await db.users.findByPk(animalAdmin);
    if (!user) return "User cannot create Animal because User does't exists";
    //console.log("AnimalAdmin", AnimalAdmin);
    const animal = await db.animals.create({
      name,
      description,
      userId,
    });

    if (!animal) {
      // console.log("REPOSITORY no Animal");
      return null;
    }
    return animal;
  }

  //finding Animal by id
  static async findAnimalById(id) {
    const animal = await db.animals.findByPk(id);

    if (!animal) {
      return null;
    }
    return animal;
  }

  //updating Animal
  static async updateAnimal(id, options) {
    //checking if Animal exist first before updating
    const animal = await this.findAnimalById(id);
    if (!animal) {
      return "Animal Not found";
    }

    //updating Animal with the options
    await db.animals.update(options, {
      where: { id: animal.id },
    });

    //getting back the updated Animal to be sure it was updated
    const updatedAnimal = await this.findAnimalById(animal.id);

    return updatedAnimal;
  }

  //getting all Animals
  static async allAnimals(page, size) {
    //getting all pojects
   
    const validatedPage = parseInt(page, 10);
    const validatedSize = parseInt(size, 10);
    console.log("page, size: " + validatedPage, validatedSize);
    // Calculate offset based on page and size
    const offset = (validatedPage - 1) * validatedSize;

    const allAnimals = await db.animals.findAndCountAll({
      limit: validatedSize,
      offset: offset
    });

    allAnimals.numberOfPages = Math.ceil(allAnimals.count/size)
    allAnimals.currentPage = page
    console.log("number of rows", allAnimals);

    return allAnimals;
  }

  //getting an animal by name
  static async getAnimalByName(name) {

    const animal = await db.animals.findOne({where: { name: name}})
    if(!animal) {return null;}
    
    return animal;
  }

  //deleting a Animal with id
  static async deleteAnimal(id) {
    const animal = await db.animals.findByPk(id);
    if (!animal) {
      return null;
    }
    //getting all pojects
    const deletedNUm = await db.animals.destroy({
      where: {
        id: animal.id,
      },
    });
    //console.log("del",deletedNUm);
    if (!deletedNUm) {
      return null;
    }
    return deletedNUm;
  }
}

// let noel = AnimalRepository.findAnimalById(1);
// console.log(noel);
module.exports = AnimalRepository;
