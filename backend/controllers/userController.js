const userService = require("../services/userService");

const UserController = {
  signupUser: async (req, resp) => {
    try {
      let result = await userService.signup(req.body);
      resp.send(result);
    } catch (error) {
      //error.message is a property of the Error object in JavaScript.

      resp
        .status(400)
        .json({ error: "Failed to signup", details: error.message });
    }
  },
  loginUser: async (req, resp) => {
    try {
      let user = await userService.login(req.body.username, req.body.password);
      if (user) {
        resp.send(user);
      } else {
        resp.send({ result: "No user found" });
      }
    } catch (error) {
      resp
        .status(400)
        .json({ error: "Failed to login", details: error.message });
    }
  },
};

module.exports = UserController;
