import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import turnstile from '../services/main.js'
import { E_TURNSTILE } from '../errors.js';

export default class TurnstileMiddleware {
    async handle(ctx: HttpContext, next: NextFn) {
        const token = ctx.request.input('cf-turnstile-token')
        const turnstileResponse = await turnstile.check(token)
        if (!turnstileResponse.success) {
            const errorCodes = turnstileResponse.errorCodes ?? []
            throw new E_TURNSTILE(errorCodes.join(', '))
        } else {
            return next()
        }
    }
}
