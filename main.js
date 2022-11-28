const Hapi = require("@hapi/hapi");
const roleRoutes = require("./src/role_service/role.routes");
const userRoutes = require("./src/user_service/user.routes");
const server = Hapi.server({
  port: 3000,
  host: "localhost",
  routes: {
    cors: {
      origin: ["*"],
    },
  },
});
const init = async () => {
  server.route(userRoutes);
  server.route(roleRoutes);
  await server.start();

  console.log(`Server berjalan pada ${server.info.uri}`);
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

module.exports = server;
