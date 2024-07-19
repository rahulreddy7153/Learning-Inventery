const User = require("../models/User");

const userServices = {
  signup: async (userData) => {
    let user = new User(userData);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    return result;
  },
  login: async (username, password) => {
    let user = await User.findOne({ username, password }).select("-password");
    return user;
  },
};
module.exports = userServices;
