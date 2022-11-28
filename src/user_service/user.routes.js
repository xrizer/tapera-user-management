const {
  findByQuery,
  createUser,
  editUser,
  deleteUser,
  anjayquery,
  findById,
  anjaynyoba,
} = require("./user.handler");

const userRoutes = [
  {
    method: "POST",
    path: "/user",
    handler: createUser,
  },
  {
    method: "GET",
    path: "/user",
    handler: findByQuery,
  },
  {
    method: "GET",
    path: "/user/{id}",
    handler: findById,
  },
  {
    method: "PUT",
    path: "/user/{id}",
    handler: editUser,
  },
  {
    method: "DELETE",
    path: "/user/{id}",
    handler: deleteUser,
  },
  {
    method: "GET",
    path: "/anjay",
    handler: anjaynyoba,
  },
];

module.exports = userRoutes;
