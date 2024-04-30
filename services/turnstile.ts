import got from "got"
import { TurnstileResponse, CloudflareTurnstileResponse, TurnstileConfig } from "../types.js"
import { HttpContext } from "@adonisjs/core/http"

export default class TurnstileService {
    constructor(protected config: TurnstileConfig) {}

    public async check(ctx: HttpContext): Promise<TurnstileResponse> {
        const token = ctx.request.input('cf-turnstile-response')
        const ip = ctx.request.header('cf-connecting-ip')

        const { body } = await got.post<CloudflareTurnstileResponse>(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            json: {
              secret: this.config.secretKey,
              response: token,
              remoteip: ip,
            }
          }
        )

        return {
          success: Boolean(body.success),
          challengeTimestamp: body.challenge_ts,
          hostname: body.hostname,
          errorCodes: body['error-codes'],
          action: body.action,
          cdata: body.cdata,
        } as TurnstileResponse
    }
}