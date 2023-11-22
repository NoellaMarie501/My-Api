const db = require("../models/connection");
const userModel = require("../models/user.model");
const redis = require("redis");

//creating redis client for caching
const redisClient = redis.createClient({ host: "localhost", port: 6379 });

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
    return new Promise((resolve, reject) => {
      // Check if client connection has an error
      redisClient.on("error", (error) => {
        console.log("Redis client error:", error);
        reject(error);
      });

      redisClient.get("AnimalData", async (err, data) => {
        if (err) {
          console.error("Error fetching data from Redis:", err);
          reject(err);
        }

        // Check if the data is already cached
        if (data) {
          resolve(JSON.parse(data));
        } else {
          // Data not cached, fetch from the database
          try {
            const allAnimals = await db.animals.findAndCountAll({
              offset:10,
              limit: 5,
            });

            // Set or cache the data in Redis
            redisClient.setex("AnimalData", 180, JSON.stringify(allAnimals));

            resolve(allAnimals);
          } catch (error) {
            console.error("Error fetching data from the database:", error);
            reject(error);
          }
        }
      });
    });
  
    // allAnimals.numberOfPages = Math.ceil(allAnimals.count / size);
    // allAnimals.currentPage = page;
    // console.log("number of rows", allAnimals);
  }

  //getting an animal by name
  static async getAnimalByName(name) {
    const animal = await db.animals.findOne({ where: { name: name } });
    if (!animal) {
      return null;
    }

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
