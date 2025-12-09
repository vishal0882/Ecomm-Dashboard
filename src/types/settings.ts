export interface ApiConfig {
  enabled: boolean
  [key: string]: string | number | boolean | undefined
}

export interface TableauConfig extends ApiConfig {
  serverUrl: string
  siteId: string
  username: string
  password: string
  apiVersion?: string
}

export interface NewRelicConfig extends ApiConfig {
  apiKey: string
  accountId: string
  region?: string
}

export interface JiraConfig extends ApiConfig {
  baseUrl: string
  email: string
  apiToken: string
  projectKey?: string
}

export interface BlueShiftConfig extends ApiConfig {
  apiKey: string
  accountId: string
  endpoint?: string
}

export interface BlueTriangleConfig extends ApiConfig {
  apiKey: string
  accountId: string
  endpoint?: string
}

export interface WebhookConfig {
  id: string
  name: string
  url: string
  events: string[]
  enabled: boolean
  secret?: string
}

export interface SettingsState {
  tableau: TableauConfig
  newRelic: NewRelicConfig
  jira: JiraConfig
  blueShift: BlueShiftConfig
  blueTriangle: BlueTriangleConfig
  webhooks: WebhookConfig[]
}

