import app from "@adonisjs/core/services/app";
import TurnstileService from "./turnstile.js";

let turnstile: TurnstileService

await app.booted(async () => {
    turnstile = await app.container.make("turnstile")
})

export { turnstile as default }
