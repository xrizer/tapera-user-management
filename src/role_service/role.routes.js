const Joi = require("joi");
const {
  rolefind,
  createRole,
  roleById,
  editRole,
  deleteRole,
} = require("./role.handler");

const roleRoutes = [
  {
    method: "GET",
    path: "/user-roles",
    handler: rolefind,
  },
  {
    method: "GET",
    path: "/user-roles/{id}",
    handler: roleById,
  },
  {
    method: "POST",
    path: "/user-roles",
    handler: createRole,
    options: {
      validate: {
        query: Joi.object({
          role: Joi.string().max(100).pattern(new RegExp("^[A-Za-z]+$")),
          status: Joi.boolean(),
          created_by: Joi.string().pattern(
            new RegExp("^(user):[A-Za-z0-9-]+$")
          ),
          failAction: "error",
        }),
      },
    },
  },
  {
    method: "PUT",
    path: "/user-roles/{id}",
    handler: editRole,
  },
  {
    method: "DELETE",
    path: "/user-roles/{id}",
    handler: deleteRole,
  },
];

module.exports = roleRoutes;
