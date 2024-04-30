import { Exception } from "@adonisjs/core/exceptions";
import { HttpContext } from "@adonisjs/core/http";

export const E_TURNSTILE = class extends Exception {
  static status = 400;
  static code = "E_TURNSTILE"
  static message = 'invalid-input-response'

  /**
   * Converts exception to an HTTP response
   */
  async handle(error: this, ctx: HttpContext) {
    const message = error.message

    switch (ctx.request.accepts(["html", "application/vnd.api+json", "json"])) {
      case "html":
      case null:
        ctx.response.status(error.status).send(message);
        break;
      case "json":
        ctx.response.status(error.status).send({
          errors: [
            {
              message,
            },
          ],
        });
        break;
      case "application/vnd.api+json":
        ctx.response.status(error.status).send({
          errors: [
            {
              code: error.code,
              title: message,
            },
          ],
        });
        break;
    }
  }
};
