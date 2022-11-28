// const {}
const { Boom } = require("@hapi/boom");
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();
function statusToBool(status) {
  if (status === "active") return true;
  return false;
}
const rolefind = async (request, h) => {
  let whereQuery = undefined;
  if (request.query.status !== undefined) {
    whereQuery = {
      where: {
        status: statusToBool(request.query.status.toString()),
      },
      take: request.query.take,
      skip: request.query.skip,
    };
  }
  if (request.query.role !== undefined) {
    whereQuery = {
      where: {
        role: request.query.role,
      },
      take: request.query.take,
      skip: request.query.skip,
    };
  }
  if (request.query.status !== undefined && request.query.role !== undefined) {
    whereQuery = {
      where: {
        status: statusToBool(request.query.status.toString()),
        role: request.query.role,
      },
      take: request.query.take,
      skip: request.query.skip,
    };
  }
  if (request.query.take !== undefined) {
    whereQuery = {
      take: request.query.take,
    };
  }
  if (request.query.skip !== undefined) {
    whereQuery = {
      skip: request.query.skip,
    };
  }
  if (whereQuery === undefined) {
    whereQuery = {
      where: {
        status: true,
      },
      take: request.query.take,
      skip: request.query.skip,
    };
  }
  const x = await prisma.roles.findMany(whereQuery);
  const count = await prisma.roles.count();
  const transform = x.map((row) => {
    return {
      id: row.id,
      role: row.role,
      status: row.status,
      createdBy: row.created_by,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      updatedBy: row.updated_by,
    };
  });
  return h.response({
    code: 200,
    message: "succes",
    count: count,
    data: transform,
    errors: null,
  });
};
const roleById = async (request, h) => {
  try {
    const { id } = request.params;
    const x = await prisma.roles.findFirst({ where: { id } });
    const transform = {
      role: x.role,
      status: x.status,
      createdBy: x.created_by,
      createdAt: x.created_at,
      updatedAt: x.updated_at,
      updatedBy: x.updated_by,
    };

    return h.response({
      code: 200,
      message: "succes",
      count: 1,
      data: transform,
      errors: null,
    });
  } catch (error) {
    throw Boom.badImplementation("Internal Server Error");
  }
};
const createRole = async (request, h) => {
  try {
    const id2 = uuidv4();
    const { role, status, created_by, updated_at, updated_by } =
      request.payload;
    let createdBy = "";
    let updatedBy = "";
    let updatedAt = "";
    if (created_by !== undefined) {
      createdBy = created_by;
    }
    if (updated_by !== undefined) {
      updatedBy = updated_by;
    }
    if (updated_at !== undefined) {
      updatedAt = updated_at;
    }
    const data = {
      id: `usr-role:${id2}`,
      role: role,
      status: status,
      created_by: createdBy,
      updated_by: updatedBy,
      created_at: Date.now().toString(),
      updated_at: updatedAt,
    };
    await prisma.roles.create({ data: data });
    return {
      code: 201,
      message: "created",
      count: 1,
      data: [],
      errors: null,
    };
  } catch (error) {
    return h.response();
  }
};

const editRole = async (request, h) => {
  try {
    const { id } = request.params;
    const { role, status, updated_by } = request.payload;
    let updatedBy = undefined;
    if (updated_by !== undefined) {
      updatedBy = updated_by;
    }
    const data = {
      role: role,
      status: status,
      updated_by: updatedBy,
      updated_at: Date.now().toString(),
    };
    await prisma.roles.update({ where: { id }, data: data });
    return {
      code: 200,
      message: "success updated",
      count: 1,
      data: [],
      errors: null,
    };
  } catch (error) {
    throw error;
  }
};

const deleteRole = async (request, h) => {
  try {
    const { id } = request.params;
    await prisma.roles.delete({ where: { id } });
    return {
      code: 200,
      message: "success deleted",
      count: 1,
      data: [],
      errors: null,
    };
  } catch (error) {
    throw Boom.badImplementation("Internal Server Error");
  }
};
module.exports = { rolefind, createRole, editRole, deleteRole, roleById };
