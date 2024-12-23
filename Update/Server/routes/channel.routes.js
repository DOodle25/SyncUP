const express = require("express");
const channelRouter = express.Router();
const verifyToken=require("../scripts/verifyToken");
const {
  getChannels,
  getAllChannels,
} = require("../controllers/channel.controller");

channelRouter.post("/channels",verifyToken,getAllChannels);
channelRouter.get("/",verifyToken, getChannels);

// getting all the channels of the workspace require workspace id
// getting channels require userId of the Mongodb db

module.exports = channelRouter;
