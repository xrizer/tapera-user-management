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

// it("successfully get all data user role", async function () {
//   const options = {
//     method: "GET",
//     url: "/user-roles",
//   };
//   const data = await server.inject(options);
//   expect(data.statusCode).toBe(200);
// });

// it("should add role successfully", async function () {
//   const options = {
//     method: "POST",
//     url: "/user-roles",
//     payload: JSON.stringify({
//       role: "manusia-beriman",
//       status: true,
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

// it("should update role successfully", async function () {
//   const options = {
//     method: "PUT",
//     url: "/user-roles/usr-role:d23f85e1-31f6-4196-9930-0ef3d5291dc7",
//     payload: JSON.stringify({
//       role: "bismillah berkah",
//       status: true,
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

// it("should delete role successfully", async function () {
//   const options = {
//     method: "DELETE",
//     url: "/user-roles/usr-role:mHjEf3_u3xnK7wKg",
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
