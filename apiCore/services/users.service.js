const { UserRepository } = require("../../database/export_classes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, HTTP_STATUS } = require("../../constants");
class UserService {
  //Create new user
  static async createUser(username, password, email) {
    const user = await UserRepository.findUserByEmail(email);
    if (user) {
      return {
        message: "User Already Exists",
        status: HTTP_STATUS.BAD_REQUEST,
        error: "User already exists"
      };
    } else {
      const salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);
      //console.log(hashedPassword, salt);
      const newuser = await UserRepository.CreateUser(
        username,
        hashedPassword,
        email
      );
      return { data: newuser, status: HTTP_STATUS.OK };
    }
  }

  //Update user
  static async UpdateUser(id, options) {
    const user = await UserRepository.updateUser(id, options);
    if (!user) {
      return {
        error: "Could Not Update User",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "User Not Found"
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "User Updated successfully!!",
      data: user,
    };
  }

  //Get User
  static async getUser(id) {
    const user = await UserRepository.findUserByIdNoPwd(id);
    if (!user) {
      return {
        error: "Could Not get User",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "User Not Found",
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "User Found!!",
      data: user,
    };
  }

  //Getting all users
  static async AllUsers(id) {
    const users = await UserRepository.allUsers(id);
    if (!users) {
      return {
        error: "Could Not get users",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Users not found",
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "users!!",
      data: users
    };
  }

  //Delete User
  static async DeleteUser(id) {
    const user = await UserRepository.deleteUser(id);
    if (!user) {
      return {
        error: "Could Not delete user",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "User possibly not found",
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "User Deleted !!",
      data: user,
    };
  }

  //Sign in
  static async SignIn(email, password) {
    const user = await UserRepository.findUserByEmail(email);

    //check if user email exist
    if (!user) {
      return {
        message: "Wrong Email or password",
        status: HTTP_STATUS.BAD_REQUEST,
        error: "Could Not Sign In"
      };
    }
    //checking if passwords match
    let matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return {
        message: "Wrong Email or password",
        status: HTTP_STATUS.BAD_REQUEST,
        error: "Could Not Sign In"
      };
    }

    //Generate a token for the user loging in using user id
    var token = jwt.sign({ id: user.id}, secret);

    user.dataValues.token = token;

    return { data: user, status: HTTP_STATUS.OK, message : "User Signed In!!!" };
  }
}
module.exports = UserService;
