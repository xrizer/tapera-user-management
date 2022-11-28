const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();
function statusToBool(status) {
  if (status === "active") return true;
  return false;
}
const findByQuery = async (request, h) => {
  if (request.query.status !== undefined) {
    const amjay = await prisma.roles.findMany({
      where: { status: statusToBool(request.query.status.toString()) },
      include: { User: true },
    });
    if (statusToBool(request.query.status.toString()) === false) {
      const transform = amjay.map((row) => {
        return {
          id: row.User.id,
          role: row.role,
          username: row.User.username,
          email: row.User.email,
          status: row.status === true ? "active" : "unactive",
          createdBy: row.User.created_by,
          createdAt: row.User.created_at,
          updatedAt: row.User.updated_at,
          updatedBy: row.User.updated_by,
        };
      });
      return {
        code: 200,
        message: "succes",
        count: 1,
        data: transform,
        errors: null,
      };
    }
    if (statusToBool(request.query.status.toString()) === true) {
      const count = await prisma.user.count();
      const transform = amjay.map((row) => {
        if (row.User !== null) {
          return {
            id: row.User.id,
            role: row.role,
            username: row.User.username,
            email: row.email,
            status: row.status === true ? "active" : "unactive",
            createdBy: row.User.created_by,
            createdAt: row.User.created_at,
            updatedAt: row.User.updated_at,
            updatedBy: row.User.updated_by,
          };
        }
      });
      const filtered = transform.filter(function (f) {
        return f != null;
      });
      return {
        code: 200,
        message: "succes",
        count: count,
        data: filtered,
        errors: null,
      };
    }
  } else if (
    (request.query.status !== undefined) &
    (request.query.username !== undefined)
  ) {
    const amjay = await prisma.roles.findMany({
      where: { status: statusToBool(request.query.status.toString()) },
      include: { User: true },
    });
    if (statusToBool(request.query.status.toString()) === false) {
      const transform = amjay.map((row) => {
        return {
          id: row.User.id,
          role: row.role,
          username: row.User.username,
          email: row.User.email,
          status: row.status === true ? "active" : "unactive",
          createdBy: row.User.created_by,
          createdAt: row.User.created_at,
          updatedAt: row.User.updated_at,
          updatedBy: row.User.updated_by,
        };
      });
      function searchMatch(target, search) {
        search = String(search).trim().toLowerCase();
        return String(target).toLowerCase().includes(search);
      }

      function findResults(transform, searchObj) {
        return transform.filter((el) => {
          return Object.entries(searchObj).every(([key, value]) =>
            searchMatch(el[key], value)
          );
        });
      }

      const result = findResults(transform, { username: "cto" });

      return {
        code: 200,
        message: "succes",
        count: 1,
        data: result,
        errors: null,
      };
    }
    if (statusToBool(request.query.status.toString()) === true) {
      const count = await prisma.user.count();
      const transform = amjay.map((row) => {
        if (row.User !== null) {
          return {
            id: row.User.id,
            role: row.role,
            username: row.User.username,
            email: row.email,
            status: row.status === true ? "active" : "unactive",
            createdBy: row.User.created_by,
            createdAt: row.User.created_at,
            updatedAt: row.User.updated_at,
            updatedBy: row.User.updated_by,
          };
        }
      });
      const filtered = [
        transform.filter(function (f) {
          return f != null;
        }),
      ];
      function searchMatch(target, search) {
        search = String(search).trim().toLowerCase();
        return String(target).toLowerCase().includes(search);
      }

      function findResults(filtered, searchObj) {
        return filtered.filter((el) => {
          return Object.entries(searchObj).every(([key, value]) =>
            searchMatch(el[key], value)
          );
        });
      }
      console.log(filtered);
      const result = findResults(filtered, { username: "cto" });
      return {
        code: 200,
        message: "succes",
        count: count,
        data: result,
        errors: null,
      };
    }
  } else {
    let whereQuery = undefined;
    if (request.query.username !== undefined) {
      whereQuery = {
        where: {
          username: request.query.username,
        },
        include: { role: true },
      };
    }
    if (request.query.email !== undefined) {
      whereQuery = {
        where: {
          email: request.query.email,
        },
        include: { role: true },
      };
    }
    if (
      request.query.username !== undefined &&
      request.query.email !== undefined
    ) {
      whereQuery = {
        where: {
          username: request.query.username,
          email: request.query.email,
        },
        include: { role: true },
      };
    }
    if (whereQuery === undefined) {
      whereQuery = {
        where: {},
        include: { role: true },
      };
    }
    const x = await prisma.user.findMany(whereQuery);
    const count = await prisma.user.count();
    const transform = x.map((row) => {
      return {
        id: row.id,
        role: row.role.role,
        username: row.username,
        email: row.email,
        status: row.role.status === true ? "active" : "unactive",
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        updatedBy: row.updated_by,
      };
    });
    return {
      code: 200,
      message: "succes",
      count: count,
      data: transform,
      errors: null,
    };
  }
};

const findById = async (request, h) => {
  const { id } = request.params;
  const x = await prisma.user.findFirst({
    where: { id },
    include: { role: true },
  });
  const transform = {
    id: x.id,
    role: x.role.role,
    username: x.username,
    email: x.email,
    status: x.role.status,
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
};
const createUser = async (request, h) => {
  const {
    username,
    password,
    email,
    id_user_role,
    created_by,
    updated_at,
    updated_by,
  } = request.payload;
  const id2 = uuidv4();
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
    id: `user:${id2}`,
    username: username,
    password: password,
    email: email,
    id_user_role: id_user_role,
    created_by: createdBy,
    updated_by: updatedBy,
    created_at: Date.now().toString(),
    updated_at: updatedAt,
  };
  await prisma.user.create({ data: data });
  return {
    code: 201,
    message: "created",
    count: 1,
    data: [],
    errors: null,
  };
};

const editUser = async (request, h) => {
  const { id } = request.params;
  const { username, password, email, id_user_role, updated_by } =
    request.payload;
  let updatedBy = "";
  if (updated_by !== undefined) {
    updatedBy = updated_by;
  }
  const data = {
    username: username,
    password: password,
    email: email,
    id_user_role: id_user_role,
    updated_by: updatedBy,
    updated_at: Date.now().toString(),
  };
  await prisma.user.update({ where: { id }, data: data });
  return {
    code: 200,
    message: "success updated",
    count: 1,
    data: [],
    errors: null,
  };
};

const deleteUser = async (request, h) => {
  const { id } = request.params;
  await prisma.user.delete({ where: { id } });
  return {
    code: 200,
    message: "success deleted",
    count: 1,
    data: [],
    errors: null,
  };
};

const anjaynyoba = async (request, h) => {
  const amjay = await prisma.roles.findMany({
    where: { status: false },
    include: { User: true },
  });
  return amjay;
};
module.exports = {
  findByQuery,
  findById,
  createUser,
  editUser,
  deleteUser,
  anjaynyoba,
};
