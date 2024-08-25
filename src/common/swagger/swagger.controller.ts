import Router from "koa-router";
import { readFileSync } from "fs";
import { join } from "path";
import { load } from "js-yaml";

export const swaggerRouter = new Router();

const swaggerDocument = load(
  readFileSync(join(__dirname, "swagger.yml"), "utf8"),
);

swaggerRouter.get("/swagger-docs", async (ctx) => {
  ctx.body = swaggerDocument;
});

swaggerRouter.get('/api-docs', async (ctx) => {
  ctx.type = 'text/html';
  ctx.body = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Swagger UI</title>
      <link rel="stylesheet" type="text/css" href="./swagger-ui.css" />
      <link rel="stylesheet" type="text/css" href="index.css" />
      <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
    </head>

    <body>
      <div id="swagger-ui"></div>
      <script src="./swagger-ui-bundle.js" charset="UTF-8"> </script>
      <script src="./swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
      <script>
        window.onload = function() {
          const ui = SwaggerUIBundle({
            url: "/swagger-docs",
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            layout: "StandaloneLayout"
          });
          window.ui = ui;
        };
      </script>
    </body>
  </html>
  `;
});
