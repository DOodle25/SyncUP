const Workspace = require("../model/workspace.model");
const User = require("../model/user.model");

function getWorkspaces(req, res) {
  console.log("get workspaces api fired");
  console.log(req.userId);
  if (!req.userId) {
    return res.status(401).send({
      status: false,
      message: "token doesn't contain sufficient information",
    });
  }
  User.findOne({ _id: req.userId })
    .populate("workspaces")
    .then((data) => {
      if (data) {
        res.status(200).send({ status: true, workspaces: data.workspaces });
      } else {
        res.status(404).send({ status: false, message: "user not found" });
      }
    })
    .catch((err) => {
      console.log("error occured in getworkspaces api" + err);
      res.status(500).send({
        status: false,
        message: "some internal server error occured while fetching workspaces",
      });
    });
}

function getCoworkers(req, res) {
  console.log("get coworker api fired");
  if(!req.userId || !req.email)
  {
    return res.status(403).send({status:false,message:"token doesn't contain sufficient information"})
  }
  if(!req.body.workspaceId)
  {
    return res.status(403).send({status:false,message:"workspace id not provided"});
  }
  Workspace.findOne({ _id: req.body.workspaceId })
    .populate("users")
    .then((data) => {
      if (data) {
        return res.status(200).send({ status: true, users: data.users });
      } else {
        return res
          .status(404)
          .send({ status: false, message: "workspace not found" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: false, message: "some internal server error occured" });
    });
}

module.exports = { getWorkspaces, getCoworkers };
