const db = require("../models/connection");

class UserRepository {
  //creating new user
  static async CreateUser(username, password, email) {
    const user = await db.users.create({
      username,
      password,
      email
    });
    return user;
  }

  //Finding user with id
  static async findUserById(id) {
    const user = await db.users.findByPk(id);
    
    return user;
  }

  //Finding user with id and not returning password
  static async findUserByIdNoPwd(id) {
    const user = await db.users.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    return user;
  }

  //finding user with email
  static async findUserByEmail(email) {
    const user = await db.users.findOne({
      where: {
        email: email,
      },
    });
    //console.log(user);
    return user;
  }

  //updating user using email
  static async updateUser(id, options) {
    //checking if user exist first before updating
    const user = await this.findUserById(id);
    if (!user) {
      return null;
    }

    //updating user with the options
    await db.users.update(options, {
      where: { id: user.id },
    });

    //getting back the updated user to be sure it was updated
    const updatedUser = await this.findUserById(user.id);

    return updatedUser;
  }

  //getting all Users
  static async allUsers() {
    //getting all pojects
    const allUsers = await db.users.findAll({
      attributes: { exclude: ["password"] }, // Exclude the 'password' field
    });
    //console.log('users:', allUsers);
    return allUsers;
  }

  //deleting a User with id
  static async deleteUser(id) {
    const user = await db.users.findByPk(id);
    if (!user) {
      return null;
    }
    //getting all pojects
    const deletedNUm = await db.users.destroy({
      where: {
        id: user.id,
      },
    });
    //console.log("del",deletedNUm);
    if (!deletedNUm) {
      return null;
    }
    return deletedNUm;
  }
}

module.exports = UserRepository;
