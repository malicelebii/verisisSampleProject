const User = require("../models/User");


module.exports = {
  async getUsers(req, res) {
    let users = await User.find()
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  },

  async postUser(req, res) {
    let newUser = new User(req.body);

    await newUser
      .save()
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  async updateUser(req, res) {
    let newData = req.body;
    await User.findByIdAndUpdate(req.params.id, newData)
      .then((newData) => res.json(newData))
      .catch((err) => console.log(err));
  },

  async getUser(req, res) {
    await User.findById(req.params.id)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  async deleteUser(req, res) {
    await User.findByIdAndRemove(req.params.id)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
};
