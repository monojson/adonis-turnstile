export interface TurnstileConfig {
  siteKey: string
  secretKey: string
}

export type TurnstileErrorCode =
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'invalid-widget-id'
  | 'invalid-parsed-secret'
  | 'bad-request'
  | 'timeout-or-duplicate'
  | 'internal-error'

export interface TurnstileResponse {
  /** true when the token is valid */
  success: boolean

  /** the ISO timestamp for the time the challenge was solved */
  challengeTimestamp?: string

  /** the hostname for which the challenge was served */
  hostname?: string

  /** a list of errors that occurred */
  errorCodes?: TurnstileErrorCode[]

  /** the customer widget identifier passed to the widget on the client side */
  action?: string

  /** the customer data passed to the widget on the client side */
  cdata?: string
}