// const server = require("./main"); // Import Server/Application

// // Start application before running the test case
// beforeAll((done) => {
//   server.events.on("start", () => {
//     done();
//   });
// });

// // Stop application after running the test case
// afterAll((done) => {
//   server.events.on("stop", () => {
//     done();
//   });
//   server.stop();
// });

// it("successfully get all data user", async function () {
//   const options = {
//     method: "GET",
//     url: "/user",
//   };
//   const data = await server.inject(options);
//   expect(data.statusCode).toBe(200);
// });
// it("should add user successfully", async function () {
//   const options = {
//     method: "POST",
//     url: "/user",
//     payload: JSON.stringify({
//       username: "username_example",
//       password: "passW0rd!",
//       email: "email@example.com",
//       id_user_role: "usr-role:6b31029b-5c5b-41a9-b721-3122de0470b4",
//       created_by: "user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2",
//     }),
//   };
//   const data = await server.inject(options);
//   expect(data.statusCode).toBe(200);
//   expect(data.result).toStrictEqual({
//     code: 201,
//     message: "created",
//     count: 1,
//     data: [],
//     errors: null,
//   });
// });

// it("should update user successfully", async function () {
//   const options = {
//     method: "PUT",
//     url: "/user/user:OM_Uxf1FreG5LRR_",
//     payload: JSON.stringify({
//       username: "sample_user",
//       password: "asAS09!",
//       email: "mail@example.com",
//       id_user_role: "usr-role:CTXXaa5ZwxxsM6Rs",
//       updated_by: "user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2",
//     }),
//   };
//   const data = await server.inject(options);
//   expect(data.statusCode).toBe(200);
//   expect(data.result).toStrictEqual({
//     code: 200,
//     message: "success updated",
//     count: 1,
//     data: [],
//     errors: null,
//   });
// });

// it("should delete user successfully", async function () {
//   const options = {
//     method: "DELETE",
//     url: "/user-roles/user:JZZPDDvNmTJ77g7e",
//   };
//   const data = await server.inject(options);
//   expect(data.statusCode).toBe(200);
//   expect(data.result).toStrictEqual({
//     code: 200,
//     message: "success deleted",
//     count: 1,
//     data: [],
//     errors: null,
//   });
// });
