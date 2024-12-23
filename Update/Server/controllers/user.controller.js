const User = require("../model/user.model");

async function getUser(req, res) {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    return res.status(200).json({
      status: true,
      message: "User fetched Successfully",
      user
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "some internal server error occured while fetching user",
    })
  }
}

module.exports = getUser;
