import ConfigureCommand from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'
import pkg from './package.json'
const packageName = pkg.name

export async function configure(command: ConfigureCommand) {
    const codemods = await command.createCodemods()
    await codemods.makeUsingStub(stubsRoot, 'config/turnstile.stub', {})

    /**
     * Add environment variables
     */
    await codemods.defineEnvVariables({
      TURNSTILE_SITE_KEY: '',
      TURNSTILE_SECRET_KEY: ''
    })

    /**
     * Validate environment variables
     */
    await codemods.defineEnvValidations({
        variables: {
            TURNSTILE_SITE_KEY: `Env.schema.string.optional()`,
            TURNSTILE_SECRET_KEY: 'Env.schema.string.optional()'
        },
    })

    /**
     * Register provider
     */
    await codemods.updateRcFile((rcFile) => {
        rcFile.addProvider(`${packageName}/providers/turnstile_provider`)
    })

    /**
     * Register provider
     */
    await codemods.registerMiddleware('router', [
      { path: `${packageName}/middleware/turnstile_middleware` },
    ])
}
