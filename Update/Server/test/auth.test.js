const request = require("supertest");
const server = require("../server");
const Otp = require("../model/Otp.model");
const User = require("../model/user.model");
const { default: mongoose } = require("mongoose");
const Workspace = require("../model/workspace.model");
const Channel=require("../model/channel.model");

beforeAll(async () => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  // await User.collection.drop();
  // await mongoose.connect(process.env.MONGODB);
  
}, 15000);

afterAll(async () => {
  console.log.mockRestore();
  await Otp.collection.drop();
  await Channel.collection.drop();
  await User.collection.drop();
  await Workspace.collection.drop();
  await mongoose.disconnect();
});

describe("auth API tests", () => {
  beforeAll(async ()=>
  {
    await User.collection.drop();
  })
  afterAll(async ()=>
  {
    await User.collection.drop();
  })
  test("if valid email is given", async () => {
    const response = await request(server)
      .post("/auth")
      .send({ email: "validemail@sajan.com" });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe("otp sent to this email id");
    const dbCheck = await Otp.findOne({ destination: "validemail@sajan.com" });
    expect(Boolean(dbCheck)).toBe(true);
  },15000);

  test("if invalid email is given", async () => {
    const response = await request(server)
      .post("/auth")
      .send({ email: "invalidemail@sajan" });
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("enter a valid email");
    const dbCheck = await Otp.findOne({ destination: "invalidemail@sajan" });
    expect(Boolean(dbCheck)).toBe(false);
  });

  test("if no email is given", async () => {
    const response = await request(server).post("/auth").send({ email: "" });
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("enter a valid email");
    const dbCheck = await Otp.findOne({ destination: "invalidemail@sajan" });
    expect(Boolean(dbCheck)).toBe(false);
  });

  test("if datatype of email is number", async () => {
    const response = await request(server).post("/auth").send({ email: 1234 });
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("enter a valid email");
    const dbCheck = await Otp.findOne({ destination: "invalidemail@sajan" });
    expect(Boolean(dbCheck)).toBe(false);
  });

  test("if other fields are given but not email", async () => {
    const response = await request(server)
      .post("/auth")
      .send({ name: "sajan", status: false });
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("enter a valid email");
    const dbCheck = await Otp.findOne({ destination: "invalidemail@sajan" });
    expect(Boolean(dbCheck)).toBe(false);
  });
});

describe("verify-otp API tests", () => {
  beforeEach(async () => {
    await Otp.collection.drop();
    await User.collection.drop();
    await Workspace.collection.drop();
  });

  test("if valid email and valid code is given and is new user", async () => {
    const testOtp = new Otp({ destination: "test@sajan.com", code: "123456" });
    await testOtp.save();
    const response = await request(server)
      .post("/auth/verify-otp")
      .send({ email: "test@sajan.com", code: "123456" });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe("otp verified");
    expect(response.body.isOldUser).toBe(false);
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).not.toHaveProperty("name");
    // await Otp.collection.drop();
    // await User.collection.drop();
    // await Workspace.collection.drop();
  });

  test("if valid email and invalid code is given", async () => {
    const testOtp = new Otp({ destination: "test@sajan.com", code: "123456" });
    await testOtp.save();
    const response = await request(server)
      .post("/auth/verify-otp")
      .send({ email: "test@sajan.com", code: "000000" });
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("email or otp did not match");
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).not.toHaveProperty("name");
  });

  test("if invalid email and valid code is given", async () => {
    const testOtp = new Otp({ destination: "test@sajan.com", code: "123456" });
    await testOtp.save();
    const response = await request(server)
      .post("/auth/verify-otp")
      .send({ email: "testing@sajan.com", code: "123456" });
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("email or otp did not match");
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).not.toHaveProperty("name");
  });

  test("if invalid email and invalid code is given", async () => {
    const testOtp = new Otp({ destination: "test@sajan.com", code: "123456" });
    await testOtp.save();
    const response = await request(server)
      .post("/auth/verify-otp")
      .send({ email: "testing@sajan.com", code: "000000" });
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("email or otp did not match");
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).not.toHaveProperty("name");
  });

  test("if no payload in given", async () => {
    const testOtp = new Otp({ destination: "test@sajan.com", code: "123456" });
    await testOtp.save();
    const response = await request(server).post("/auth/verify-otp").send({});
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe(
      "request doesn't contain proper payload"
    );
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).not.toHaveProperty("name");
  });

  test("if datatype of code is different and is new user", async () => {
    const testOtp = new Otp({ destination: "test@sajan.com", code: "123456" });
    await testOtp.save();
    const response = await request(server)
      .post("/auth/verify-otp")
      .send({ email: "test@sajan.com", code: 123456 });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.isOldUser).toBe(false);
    expect(response.body.message).toBe("otp verified");
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).not.toHaveProperty("name");
  });

  test("if datatype of email is different", async () => {
    const testOtp = new Otp({ destination: "test@sajan.com", code: "123456" });
    await testOtp.save();
    const response = await request(server)
      .post("/auth/verify-otp")
      .send({ email: 123456, code: "123456" });
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("enter a valid email");
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).not.toHaveProperty("name");
  });



  test("if valid email and valid code is given and is old user", async () => {
    const testOtp = new Otp({ destination: "test@sajan.com", code: "123456" });
    const testUser = new User({
      email: "test@sajan.com",
      name: "Test",
      workspaces: [],
      channels: [],
      doc: new Date(),
    });
    await testOtp.save();
    await testUser.save();
    const response = await request(server)
      .post("/auth/verify-otp")
      .send({ email: "test@sajan.com", code: "123456" });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe("otp verified");
    expect(response.body.isOldUser).toBe(true);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("Test");
    await User.collection.drop();
  });
});

describe("signup API tests", () => {
  test("if valid email, workspace and username if given", async () => {
    const response = await request(server)
      .post("/auth/signup")
      .send({ email: "test@sajan.com", name: "sajan", workspace: "workspace" });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("sajan");
    await User.collection.drop();
    await Workspace.collection.drop();
    await Channel.collection.drop();
  });

  test("if no payload is given",async ()=>{
    const response=await request(server).post("/auth/signup").send({});
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("request doesn't contain proper payload");
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).not.toHaveProperty("name");
  })

  test("if any one of the property is missing",async ()=>
  {
    const response=await request(server).post("/auth/signup").send({name:"sajan",email:"test@sajan.com"});
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("request doesn't contain proper payload");
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).not.toHaveProperty("name");
  })

  test("if datatype of name and workspace fields are different", async () => {
    const response = await request(server)
      .post("/auth/signup")
      .send({ email: "test@sajan.com", name:1234, workspace:123456 });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("1234");
  });

  test("if datatype of email is different",async ()=>
  {
    const response=await request(server).post("/auth/signup").send({name:"sajan",email:1234,workspace:"workspace"});
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("enter a valid email");
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).not.toHaveProperty("name");
  })
});
