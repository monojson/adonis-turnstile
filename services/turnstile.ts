import got from "got"
import { TurnstileResponse, TurnstileConfig } from "../types.js"

/**
 * See more info about Cloudflare server-side validation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export default class TurnstileService {
    constructor(protected config: TurnstileConfig) {}

    public async check(token: string): Promise<TurnstileResponse> {
        if (!token) {
            return {
                success: false, 
                errorCodes: ['bad-request']
            }
        }

        const body = await got.post(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            json: {
              secret: this.config.secretKey,
              response: token,
            }
          }
        ).text()
        const decodeBody = JSON.parse(body)
        return {
          success: Boolean(decodeBody.success),
          challengeTimestamp: decodeBody.challenge_ts,
          hostname: decodeBody.hostname,
          errorCodes: decodeBody['error-codes'],
          action: decodeBody.action,
          cdata: decodeBody.cdata,
        } as TurnstileResponse
    }
}