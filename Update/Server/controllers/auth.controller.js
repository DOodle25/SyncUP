// const db = require("../database");
const User = require("../model/user.model");
const sendMail = require("../scripts/sendMail");
const Otp = require("../model/Otp.model");
const jwt = require("jsonwebtoken");
const Workspace = require("../model/workspace.model");
const Channel = require("../model/channel.model");

async function auth(req, res) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(req.body.email)) {
    return res
      .status(401)
      .send({ status: false, message: "enter a valid email" });
  }
  await sendMail(req.body.email);
  res.status(200).send({ status: true, message: "otp sent to this email id" });
}

function verifyOtp(req, res) {
  console.log(req.body.email, req.body.code);
  if (!req.body.email || !req.body.code) {
    return res.status(401).send({
      status: false,
      message: "request doesn't contain proper payload",
    });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(req.body.email)) {
    return res
      .status(401)
      .send({ status: false, message: "enter a valid email" });
  }
  Otp.findOne({ code: req.body.code, destination: req.body.email })
    .then(async (data) => {
      deleteOtp(req);
      console.log(data);
      if (data) {
        const isOldUser = await User.findOne({ email: req.body.email });
        if (isOldUser) {
          const token = jwt.sign(
            {
              userId: isOldUser._id,
              email: isOldUser.email,
            },
            process.env.SECRET_KEY
          );
          return res.status(200).send({
            status: true,
            message: "otp verified",
            isOldUser: true,
            token: token,
            name: isOldUser.name,
          });
        } else {
          return res.status(200).send({
            status: true,
            message: "otp verified",
            isOldUser: false,
          });
        }
      } else {
        return res
          .status(401)
          .send({ status: false, message: "email or otp did not match" });
      }
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: "server error" });
      deleteOtp(req);
    });
}

function deleteOtp(req) {
  Otp.deleteOne({ code: req.body.code, destination: req.body.email })
    .then((data) => {
      console.log("used otp deleted");
    })
    .catch((err) => {
      console.log("failed to delete used otp");
    });
}

// send username and workspace in the body and email
async function signup(req, res) {
  console.log("signup api is hit");
  if (!req.body.name || !req.body.workspace || !req.body.email) {
    return res
      .status(401)
      .send({
        status: false,
        message: "request doesn't contain proper payload",
      });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(req.body.email)) {
    return res
      .status(401)
      .send({ status: false, message: "enter a valid email" });
  }
  const newUser = new User({
    email: req.body.email,
    workspaces: [],
    channels: [],
    name: req.body.name,
    doc: new Date(),
  });
  const userData = await newUser.save();
  const token = jwt.sign(
    { userId: userData._id, email: userData.email },
    process.env.SECRET_KEY
  );
  const newWorkspace = new Workspace({
    name: req.body.workspace,
    channels: [],
    author: userData._id,
    doc: new Date(),
    users: [],
  });
  const workspaceData = await newWorkspace.save();
  const defaultChannel1 = new Channel({
    name: "all-new-workspace",
    messages: [],
    doc: new Date(),
    author: userData._id,
    workspaceId: workspaceData._id,
  });
  const defaultChannel2 = new Channel({
    name: "social",
    messages: [],
    doc: new Date(),
    author: userData._id,
    workspaceId: workspaceData._id,
  });
  const defaultChannel1Data = await defaultChannel1.save();
  const defaultChannel2Data = await defaultChannel2.save();
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $push: {
        channels: { $each: [defaultChannel1Data._id, defaultChannel2Data._id] },
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  User.findOneAndUpdate(
    { email: req.body.email },
    { $push: { workspaces: workspaceData._id } }
  ).catch((err) => {
    console.log(err);
  });
  Workspace.findOneAndUpdate(
    { _id: workspaceData._id },
    { $push: { users: userData._id } }
  ).catch((err) => {
    console.log(err);
  });
  Workspace.findOneAndUpdate(
    { _id: workspaceData._id },
    {
      $push: {
        channels: { $each: [defaultChannel1Data._id, defaultChannel2Data._id] },
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  try {
    res.status(200).send({
      status: true,
      message: "sign up successfull",
      token: token,
      name: userData.name,
    });
  } catch (err) {
    res.status(500).send({ status: false, message: "sign up failed" });
  }
}

module.exports = { auth, verifyOtp, signup };
