import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import turnstile from '../services/main.js'
import { TurnstileResponse } from '../types.js'

declare module '@adonisjs/core/http' {
    export interface HttpContext {
        turnstile: TurnstileResponse
    }
}

export default class TurnstileMiddleware {
    async handle(ctx: HttpContext, next: NextFn) {
        ctx.turnstile = await turnstile.check(ctx)
        return next()
    }
}
