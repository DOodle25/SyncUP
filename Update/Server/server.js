const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
app.use(express.json());
const authRouter = require("./routes/auth.routes");
const Channel = require("./model/channel.model");
const Message = require("./model/message.model");
const User = require("./model/user.model");
const Workspace = require("./model/workspace.model");
const dotenv=require("dotenv");
const channelRouter = require("./routes/channel.routes");
const messageRouter = require("./routes/message.routes");
const workspaceRouter = require("./routes/workspace.routes");
const userRouter = require("./routes/user.routes");
const jwt = require("jsonwebtoken");

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/workspaces", workspaceRouter);
app.use("/channels", channelRouter);
app.use("/messages", messageRouter);

if(process.env.NODE_ENV==="test")
{
  dotenv.config({path:".env.test"});
}
else
{
  dotenv.config();
}


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (text, channelId, token, userName) => {
    const userData = jwt.verify(
      token,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          console.log(
            "error occured while verifying token in send-message event" + err
          );
          return {};
        }
        return { userId: decoded.userId, email: decoded.email };
      }
    );
    console.log(text + "to" + channelId);
    const newMessage = {
      text: text,
      doc: new Date(),
      author: userData.userId,
      name: userName,
      channelId: channelId,
    };
    io.to(channelId).emit("receive-message", newMessage);
    saveMessage(newMessage, channelId);
  });

  socket.emit("connected", { status: true });

  socket.on("join-old-channels", (channelArray) => {
    socket.join(channelArray);
    console.log(channelArray);
    socket.emit("channels-joined", true);
  });

  socket.on("join-new-channel",async (token, workspaceId,channelId) => {
   try{ socket.join(channelId);
    const userData = jwt.verify(
      token,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          console.log(
            "error occured while verifying token in send-message event" + err
          );
          return {};
        }
        return { userId: decoded.userId, email: decoded.email };
      }
    );
    const joiningChannel=await Channel.findOne({_id:channelId});
    await addChannelToUser(userData.userId, channelId);
    socket.emit("channel-joined",joiningChannel);}
    catch(err)
    {
      console.log(err);
      socket.emit("channel-joining-failed",{err:err});
    }
  });

  socket.on("create-new-channel", async (token, channelName, workspaceId) => {
    const userData = jwt.verify(
      token,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          console.log(
            "error occured while verifying token in send-message event" + err
          );
          return {};
        }
        return { userId: decoded.userId, email: decoded.email };
      }
    );
    const newChannelStatus = await addNewChannel(
      userData.userId,
      channelName,
      workspaceId
    );
    if (newChannelStatus.status) {
      socket.emit("new-channel-created", newChannelStatus.newChannel);
      console.log(newChannelStatus.newChannel._id);
      socket.join(newChannelStatus.newChannel._id.toString());
    } else {
      socket.emit("new-channel-creation-failed", newChannelStatus);
    }
  });

  socket.on("add-coworker", async (token, workspaceId, coworkerEmail) => {
    const userData = jwt.verify(
      token,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          console.log(
            "error occured while verifying token in send-message event" + err
          );
          return {};
        }
        return { userId: decoded.userId, email: decoded.email };
      }
    );
    const newCoworker = await User.findOne({ email: coworkerEmail });
    if (newCoworker) {
      await User.findOneAndUpdate(
        { _id: newCoworker._id },
        { $push: { workspaces: workspaceId } }
      );
      await Workspace.findOneAndUpdate(
        { _id: workspaceId },
        { $push: { users: newCoworker._id } }
      );
      const generalChannelsOfJoiningWorkspace = await Channel.find({
        $or: [{ name: "all-new-workspace" }, { name: "social" }],
        workspaceId: workspaceId,
      });
      await User.findOneAndUpdate(
        { _id: newCoworker._id },
        {
          $push: {
            channels: {$each:generalChannelsOfJoiningWorkspace.map(
              (item) => item._id
            )}
          },
        }
      );
      socket.emit("add-coworker-success", newCoworker);
    } else {
      socket.emit("add-coworker-failed", {
        status: false,
        message: "user doesn't exist",
      });
    }
  });
});

async function addNewChannel(userId, channelName, workspaceId) {
  const isChannelArreadyCreated = await Workspace.findOne({
    _id: workspaceId,
    channels: { $elemMatch: { name: channelName } },
  });
  if (isChannelArreadyCreated) {
    console.log("channel already exist");
    return { status: false, message: "channel already exist" };
  }
  const channel = new Channel({
    name: channelName,
    messages: [],
    doc: new Date(),
    creator: userId,
    workspaceId: workspaceId,
  });
  try {
    const channelMetaData = await channel.save();
    try {
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { channels: channelMetaData._id } }
      );
      await Workspace.findOneAndUpdate(
        { _id: workspaceId },
        { $push: { channels: channelMetaData._id } }
      );
      console.log("channel saved to user");
      return {
        status: true,
        messsage: "channnel saved to user",
        newChannel: channelMetaData,
      };
    } catch (err) {
      console.log("user not updated with channel");
      return { status: false, message: "user not updated with channel" };
    }
  } catch (err) {
    console.log("channel not added");
    return { status: false, message: "channel not added" };
  }
}

async function addChannelToUser(userId, channelId) {
  const isChannelArreadyCreated = await Channel.findOne({ _id: channelId });
  if (isChannelArreadyCreated) {
    const userHasThatChannel = await User.findOne({
      channels: channelId,
      _id: userId,
    });
    if (userHasThatChannel) {
      console.log("you have already joined that channel");
      return { status: false, message: "you have already joined that channel" };
    }
    User.findOneAndUpdate(
      { _id: userId },
      { $push: { channels: isChannelArreadyCreated._id } }
    )
      .then(() => {
        console.log("channel saved to user");
        return { status: true, messsage: "channnel saved to user" };
      })
      .catch(() => {
        console.log("user not updated with channel");
        return { status: false, message: "user not updated with channel" };
      });
  } else {
    console.log("channel with that name doesn't exist");
    return { status: false, message: "channel with that name doesn't exist" };
  }
}

function saveMessage(newMessage, channelId) {
  const message = new Message(newMessage);
  message
    .save()
    .then((messageMetaDate) => {
      Channel.findOneAndUpdate(
        { _id: channelId },
        { $push: { messages: messageMetaDate._id } }
      )
        .then(() => {
          console.log("message saved in channel");
        })
        .catch(() => {
          console.log("channel not updated with message");
        });
    })
    .catch(() => {
      console.log("message not saved");
    });
}

module.exports = server;
