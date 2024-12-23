const request = require("supertest");
const server = require("../server");
const jwt = require("jsonwebtoken");
const Workspace = require("../model/workspace.model");
const Channel = require("../model/channel.model");
const User = require("../model/user.model");


beforeAll(()=>
{
    jest.spyOn(console, 'log').mockImplementation(() => {});
})

afterAll(()=>
{
    console.log.mockRestore();
})

describe("get messages API tests", () => {
  test("if valid token and channel list is given and channel exists", async () => {
    const testUser = new User({
      email: "test@sajan.com",
      workspaces: [],
      name: "sajan",
      channels: [],
      doc: new Date(),
    });
    const userData = await testUser.save();
    const testWorkspace = new Workspace({
      name: "test",
      channels: [],
      author: userData._id,
      doc: new Date(),
      users: [userData._id],
    });

    const workspaceData = await testWorkspace.save();
    const testChannel = new Channel({
      name: "test",
      messages: [],
      doc: new Date(),
      author: userData._id,
      workspaceId: workspaceData._id,
    });
    const channelData = await testChannel.save();
    const token = jwt.sign(
      { userId: userData._id, email: userData.email },
      process.env.SECRET_KEY
    );

    const response = await request(server)
      .post("/messages")
      .set("Authorization", `Bearer ${token}`)
      .send({ channels: [channelData._id] });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body).toHaveProperty("messages");
    
    Channel.collection.drop();
    User.collection.drop();
    Workspace.collection.drop();
  });
});
