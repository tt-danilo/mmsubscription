const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/graphql",
    proxy({
      target: "https://saasmasterdev.azurewebsites.net",
      changeOrigin: true,
      pathRewrite: { "^/graphql": "/playground/.." }
    })
  );
  console.log("app", app);
};
