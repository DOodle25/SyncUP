const db = require("../database");
const Workspace = require("../model/workspace.model");
const User = require("../model/user.model");

function getChannels(req, res) {
  console.log("get channels api hit", req.userId);
  if (!req.userId || !req.email) {
    return res
      .status(403)
      .send({
        status: false,
        message: "token doesn't contain sufficient information",
      });
  }
  User.findOne({ _id: req.userId })
    .populate("channels")
    .then((data) => {
      if (data) {
        return res.status(200).send({ channels: data.channels, status: true });
      } else {
        return res
          .status(404)
          .send({ status: false, message: "user not found" });
      }
    })
    .catch(() => {
      res
        .status(500)
        .send({ status: false, message: "get Channels api did not work" });
    });
}

function getAllChannels(req, res) {
  console.log("get all channels hit");
  Workspace.findOne({ _id: req.body.workspaceId })
    .populate("channels")
    .then((data) => {
      res.status(200).send({ status: true, channels: data.channels });
    })
    .catch(() => {
      res
        .status(500)
        .send({ status: false, message: "get all channels api did not work" });
    });
}

module.exports = { getChannels, getAllChannels };
