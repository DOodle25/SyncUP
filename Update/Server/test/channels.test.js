const request = require("supertest");
const server = require("../server");
const User = require("../model/user.model");
const jwt=require("jsonwebtoken");


beforeAll(()=>
{
    jest.spyOn(console, 'log').mockImplementation(() => {});
})

afterAll(()=>
{
    console.log.mockRestore();
})

describe("get channels API tests", () => {
  test("if valid token is given and user exist", async () => {
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
      .get("/channels")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body).toHaveProperty("channels");
    await User.collection.drop();
  });

  test("if valid token is given but user doesn't exist", async () => {
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
    User.collection.drop();
    const response = await request(server)
      .get("/channels")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("user not found");
    expect(response.body).not.toHaveProperty("channels");
  });

  test("if token has other properties but not userid and email", async () => {
    const token = jwt.sign(
      { status: "iamcool", name: "idontknow" },
      process.env.SECRET_KEY
    );
    const response = await request(server)
      .get("/channels")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe(
      "token doesn't contain sufficient information"
    );
    expect(response.body).not.toHaveProperty("channels");
  });


  test("if invalid token is provided", async () => {
    const response = await request(server)
      .get("/channels")
      .set("Authorization", "Bearer abcdefghijklmnipqrstuvwxyz");
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe(
      "invalid token"
    );
    expect(response.body).not.toHaveProperty("channels");
  });

  test("if no token is provided", async () => {
    const response = await request(server)
      .get("/channels")
      .set("Authorization", "Bearer");
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe(
      "header is missing token"
    );
    expect(response.body).not.toHaveProperty("channels");
  });

  test("if no header is provided", async () => {
    const response = await request(server)
      .get("/channels")
      .set("Authorization", "Bearer");
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe(
      "header is missing token"
    );
    expect(response.body).not.toHaveProperty("channels");
  });
});

// describe("get all channels API tests", () => {});
