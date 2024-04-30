import { ApplicationService } from '@adonisjs/core/types'
import { TurnstileConfig } from '../types.js'
import TurnstileService from '../services/turnstile.js'

declare module '@adonisjs/core/types' {
    interface ContainerBindings {
        turnstile: TurnstileService
    }
}

export default class TurnstileProvider {
    constructor(protected app: ApplicationService) {
    }

    register() {
        this.app.container.singleton('turnstile', async () => {
            const config = this.app.config.get<TurnstileConfig>('turnstile')
            return new TurnstileService(config)
        })
    }
}
