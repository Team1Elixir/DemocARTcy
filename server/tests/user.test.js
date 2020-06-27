const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { encrypt } = require('../helpers/bcrypt.js');
const userData = require('../rawData//dummyUser.json');


beforeAll(() => {
  queryInterface.bulkDelete('Users');

  userData.map(user => {
      user.password = encrypt(user.password);
      user.createdAt = new Date();
      user.updatedAt = new Date();
      return user;
  })

  queryInterface.bulkInsert('Users', userData, {});
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Users")
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Test Register", () => {
  describe("POST /register", () => {
    test("should return object with id, name,and email. status 201", (done) => {
      const userInput = {
        username: "yusak",
        email: "mail@maill.com",
        password: "asdasd",
      };
      request(app)
        .post("/users/register")
        .send(userInput)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty(
              "username",
              expect.any(String)
            );
            expect(response.body).toHaveProperty("id", expect.any(Number));
            expect(response.body).toHaveProperty("email", userInput.email);
            expect(response.body).not.toHaveProperty("password");
            return done();
          }
        });
    });
  });
  describe("ERROR POST /register", () => {
    test("should return status code 400, because username is empty", (done) => {
      const error = "username is required";
      const userInput = {
        username: "",
        email: "mael@maill.com",
        password: "asdasd",
      };
      request(app)
        .post("/users/register")
        .send(userInput)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error", error);
            return done();
          }
        });
    });
    test("should return status code 400 because username already exists", (done) => {
      const error = "Username already exists";
      const userInput = {
        username: "yusak",
        email: "mail@mail.com",
        password: "asdasd",
      };
      request(app)
        .post("/users/register")
        .send(userInput)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error", error);
            return done();
          }
        });
    });
    test("should return error with wrong email format. status 400", (done) => {
      const error = "please input correct email";
      const userInput = {
        username: "bolulu",
        email: "mail",
        password: "asdasd",
      };
      request(app)
        .post("/users/register")
        .send(userInput)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error", error);
            return done();
          }
        });
    });
    test("should return error with less than 6 password letters. status 400", (done) => {
      const error = "password must more than 6 letters";
      const userInput = {
        username: "bolulu",
        email: "mail@mailll.com",
        password: "asd",
      };
      request(app)
        .post("/users/register")
        .send(userInput)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error", error);
            return done();
          }
        });
    });

    test("should return status code 400 because email already exists", (done) => {
      const error = "email already exists";
      const userInput = {
        username: "bolulu",
        email: "mail@maill.com",
        password: "asdqwe",
      };
      request(app)
        .post("/users/register")
        .send(userInput)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error", error);
            return done();
          }
        });
    });
  });
});

describe("test login", () => {
  describe("POST /login", () => {
    describe("success /login", () => {
      test("should return token with status 200", (done) => {
        const userInput = {
          username: "yusak",
          password: "asdasd",
        };
        request(app)
          .post("/users/login")
          .send(userInput)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty("token", expect.any(String));
              expect(response.body).not.toHaveProperty(
                "password",
                userInput.password
              );
              return done();
            }
          });
      });
    });
    describe("error /login", () => {
      test("should return error with empty string with status 400", (done) => {
        const error = "username is invalid or not found";
        const userInput = {
          username: "",
          password: "",
        };
        request(app)
          .post("/users/login")
          .send(userInput)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty("error", error);
              return done();
            }
          });
      });
      test("should return error with wrong email with status 400", (done) => {
        const error = "username is invalid or not found";
        const userInput = {
          username: "asdasd",
          password: "asdasd",
        };
        request(app)
          .post("/users/login")
          .send(userInput)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty("error", error);
              return done();
            }
          });
      });
      test("should return error with wrong password with status 400", (done) => {
        const error = "password is invalid";
        const userInput = {
          username: "yusak",
          password: "asda",
        };
        request(app)
          .post("/users/login")
          .send(userInput)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty("error", error);
              return done();
            }
          });
      });
    });
  });
});

describe('test Edit user data', () => {
  describe('PUT/:id', () => {
    test('should return status code 200 along with updated data', done => {
      const userInput = {
        email: "hueyguey@mail.com",
        cover_url: "https://i.pinimg.com/originals/7c/c0/e7/7cc0e70f03e60753c51b9a58542d820f.jpg",
        profile_url: "https://previews.123rf.com/images/mayya/mayya1601/mayya160100050/50742271-hand-drawn-doodle-swirled-skull-profile.jpg",
        bio: "Professional doodle artist",
        website: "doodle.io",
        password: "hueyguey"
      };
      request(app)
        .put('/users/1')
        .send(userInput)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          let { user } = res.body;
          console.log(user);
          expect(user).toHaveProperty('name', 'hueyguey');
          expect(user).toHaveProperty('username', 'hueyguey');
          expect(user).toHaveProperty('email', 'hueyguey@mail.com');
          expect(user).toHaveProperty('cover_url', 'https://i.pinimg.com/originals/7c/c0/e7/7cc0e70f03e60753c51b9a58542d820f.jpg');
          expect(user).toHaveProperty('profile_url', 'https://previews.123rf.com/images/mayya/mayya1601/mayya160100050/50742271-hand-drawn-doodle-swirled-skull-profile.jpg');
          expect(user).toHaveProperty('bio', 'Professional doodle artist');
          expect(user).toHaveProperty('website', 'doodle.io');
          expect(user).not.toHaveProperty('password');

        })
        .end(err => {
            if (err) {
                done(err);
            } else {
                done();
            }
        })
    });
  });
});

describe("Test select username profile", () => {
  describe("POST /register", () => {
    test("should return object with id, name,and email. status 201", (done) => {
      const userInput = {
        username: "yusak1",
        email: "mail1@maill.com",
        password: "asdasd",
      };
      request(app)
        .post("/users/register")
        .send(userInput)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty(
              "username",
              expect.any(String)
            );
            expect(response.body).toHaveProperty("id", expect.any(Number));
            expect(response.body).toHaveProperty("email", userInput.email);
            expect(response.body).not.toHaveProperty("password");
            return done();
          }
        });
    });
  });
  describe("GET /:username", () => {
    test("should return object with id, name,and email. status 200", (done) => {
      const userInput = {
        username: "yusak1",
        email: "mail1@maill.com",
        password: "asdasd",
      };
      request(app)
        .get(`/users/yusak1`)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty(
              "username",
              expect.any(String)
            );
            expect(response.body).toHaveProperty("email", userInput.email);
            expect(response.body).not.toHaveProperty("password");
            return done();
          }
        });
    });
  });
  describe("GET /:username", () => {
    test("should return error with not found. status 404", (done) => {
      const error = 'Username not found'
      const userInput = {
        username: "yusak",
        email: "mail1@maill.com",
        password: "asdasd",
      };
      request(app)
        .get(`/users/123123123`)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("error", error);
            return done();
          }
        });
    });
  });
});
