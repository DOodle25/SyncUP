const request = require("supertest");
const server = require("../server");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const Workspace = require("../model/workspace.model");

beforeAll(()=>
{
    jest.spyOn(console, 'log').mockImplementation(() => {});
})

afterAll(()=>
{
    console.log.mockRestore();
})

describe("get workspaces API tests", () => {
  test("if valid token is given and the user exist", async () => {
    const testUser = new User({
      email: "test@sajan.com",
      workspaces: [],
      name: "sajan",
      channels: [],
      doc: new Date(),
    });
    const userData = await testUser.save();
    const token = jwt.sign(
      { userId: userData._id, email: userData.email },
      process.env.SECRET_KEY
    );
    const response = await request(server)
      .get("/workspaces")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body).toHaveProperty("workspaces");
    await User.collection.drop();
  }, 15000);

  test("if valid token is given and the user doesn't exist", async () => {
    const testUser = new User({
      email: "test@sajan.com",
      workspaces: [],
      name: "sajan",
      channels: [],
      doc: new Date(),
    });
    const userData = await testUser.save();
    const token = jwt.sign(
      {
        userId: userData._id,
        email: userData.email,
      },
      process.env.SECRET_KEY
    );
    await User.collection.drop();
    const response = await request(server)
      .get("/workspaces")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("user not found");
    expect(response.body).not.toHaveProperty("workspaces");
  });

  test("if invalid token is given", async () => {
    const token = "somerandomtextfortokenthatisnotvalid";
    const response = await request(server)
      .get("/workspaces")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("invalid token");
    expect(response.body).not.toHaveProperty("workspaces");
  });

  test("if token doesn't contain userId or email", async () => {
    const token = jwt.sign({ name: "test" }, process.env.SECRET_KEY);
    const response = await request(server)
      .get("/workspaces")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe(
      "token doesn't contain sufficient information"
    );
    expect(response.body).not.toHaveProperty("workspaces");
  });

  test("if no token is provided", async () => {
    const response = await request(server)
      .get("/workspaces")
      .set("Authorization", "Bearer");
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("header is missing token");
    expect(response.body).not.toHaveProperty("workspaces");
  });

  test("if no header is provided", async () => {
    const response = await request(server).get("/workspaces");
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("header is missing token");
    expect(response.body).not.toHaveProperty("workspaces");
  });
});

describe("get coworkers API tests", () => {
  test("if valid token and valid workspaceId is given and user exists", async () => {
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
    const token = jwt.sign(
      { userId: userData._id, email: userData.email },
      process.env.SECRET_KEY
    );
    const response = await request(server)
      .post("/workspaces/coworkers")
      .set("Authorization", `Bearer ${token}`)
      .send({ workspaceId: workspaceData._id });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body).toHaveProperty("users");
    // expect(response.body.users).toContainEqual(userData);
    await User.collection.drop();
    await Workspace.collection.drop();
  });

  test("if valid token and invalid workspaceId is given and user exist", async () => {
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
    const token = jwt.sign(
      { userId: userData._id, email: userData.email },
      process.env.SECRET_KEY
    );
    await Workspace.collection.drop();
    const response = await request(server)
      .post("/workspaces/coworkers")
      .set("Authorization", `Bearer ${token}`)
      .send({ workspaceId: workspaceData._id });
    expect(response.status).toBe(404);
    expect(response.body.status).toBe(false);
    expect(response.body).not.toHaveProperty("users");
    await User.collection.drop();
  });

  test("if valid token and valid workspaceId is given and user doesn't exist", async () => {
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
    const token = jwt.sign(
      { userId: userData._id, email: userData.email },
      process.env.SECRET_KEY
    );
    await User.collection.drop();
    await Workspace.collection.drop();
    const response = await request(server)
      .post("/workspaces/coworkers")
      .set("Authorization", `Bearer ${token}`)
      .send({ workspaceId: workspaceData._id });
    expect(response.status).toBe(404);
    expect(response.body.status).toBe(false);
    expect(response.body).not.toHaveProperty("users");
  });

  test("if valid token is given with no workspaceId", async () => {
    const testUser = new User({
      email: "test@sajan.com",
      workspaces: [],
      name: "sajan",
      channels: [],
      doc: new Date(),
    });
    const userData = await testUser.save();
    const token = jwt.sign(
      { userId: userData._id, email: userData.email },
      process.env.SECRET_KEY
    );
    const response = await request(server)
      .post("/workspaces/coworkers")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("workspace id not provided");
    expect(response.body).not.toHaveProperty("users");
    await User.collection.drop();
  });

  test("if token doesn't contain userId or email", async () => {
    const token = jwt.sign({ name: "test" }, process.env.SECRET_KEY);
    const response = await request(server)
      .post("/workspaces/coworkers")
      .set("Authorization", `Bearer ${token}`)
      .send({ workspaceId: "randomId" });
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe(
      "token doesn't contain sufficient information"
    );
    expect(response.body).not.toHaveProperty("users");
  });

  test("if token is not privided", async () => {
    const token = jwt.sign({ name: "test" }, process.env.SECRET_KEY);
    const response = await request(server)
      .post("/workspaces/coworkers")
      .set("Authorization", "Bearer")
      .send({ workspaceId: "randomId" });
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("header is missing token");
    expect(response.body).not.toHaveProperty("users");
  });

  test("if no header is provided", async () => {
    const token = jwt.sign({ name: "test" }, process.env.SECRET_KEY);
    const response = await request(server)
      .post("/workspaces/coworkers")
      .send({ workspaceId: "randomId" });
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("header is missing token");
    expect(response.body).not.toHaveProperty("users");
  });
});
