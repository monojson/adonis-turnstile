# adonis-cf-turnstile
This is a AdonisJS V6 package that protect your applications from bots and spam attacks by Cloudflare Turnstile.

## Pre Condition
#### Step 1: Registr a Cloudflare account
#### Step 2: Get a sitekey and secret key, you can get more information from [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/get-started/)


## Installation
```bash
npm i adonis-cf-turnstile
node ace configure adonis-cf-turnstile
```

## Set Env Variables
```txt
TURNSTILE_SITE_KEY=YOUR_SITE_KEY
TURNSTILE_SECRET_KEY=YOUR_SECRET_KEY 
```

## Usage
```ts
import type { HttpContext } from '@adonisjs/core/http'
import turnstile from 'adonis-cf-turnstile/services/main'

...
    async check(ctx: HttpContext) {
        const token = ctx.request.input('token')
        const { success } = await turnstile.check(token)
        if (!success) {
            // handle bot or spam attack request and return
        }
        // handle normal request
    }
...
```