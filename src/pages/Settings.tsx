import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  BarChart3, Zap, GitBranch, Database, Activity, Webhook, 
  CheckCircle2, XCircle, Save, TestTube, Eye, EyeOff 
} from 'lucide-react'
import { SettingsState, WebhookConfig, ApiConfig } from '@/types/settings'

export default function Settings() {
  const [settings, setSettings] = useState<SettingsState>({
    tableau: {
      enabled: false,
      serverUrl: '',
      siteId: '',
      username: '',
      password: '',
      apiVersion: '3.9'
    },
    newRelic: {
      enabled: false,
      apiKey: '',
      accountId: '',
      region: 'US'
    },
    jira: {
      enabled: false,
      baseUrl: '',
      email: '',
      apiToken: '',
      projectKey: ''
    },
    blueShift: {
      enabled: false,
      apiKey: '',
      accountId: '',
      endpoint: 'https://api.blueshift.com'
    },
    blueTriangle: {
      enabled: false,
      apiKey: '',
      accountId: '',
      endpoint: 'https://api.bluetriangle.com'
    },
    webhooks: []
  })

  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({})

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleInputChange = (service: string, field: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [service]: {
        ...prev[service as keyof SettingsState],
        [field]: value
      }
    }))
  }

  const handleToggle = (service: string, enabled: boolean) => {
    handleInputChange(service, 'enabled', enabled)
  }

  const testConnection = async (service: string) => {
    // Simulate API test
    setTestResults(prev => ({
      ...prev,
      [service]: { success: false, message: 'Testing...' }
    }))

    // Simulate API call
    setTimeout(() => {
      const config = settings[service as keyof SettingsState] as ApiConfig
      const hasRequiredFields = Object.values(config).some((v: string | number | boolean | undefined) => 
        typeof v === 'string' && v.length > 0 && typeof config.enabled === 'boolean'
      )

      setTestResults(prev => ({
        ...prev,
        [service]: {
          success: hasRequiredFields,
          message: hasRequiredFields 
            ? 'Connection successful!' 
            : 'Please fill in all required fields'
        }
      }))
    }, 1500)
  }

  const saveSettings = () => {
    // In a real app, this would save to backend/localStorage
    console.log('Saving settings:', settings)
    alert('Settings saved successfully!')
  }

  const addWebhook = () => {
    const newWebhook: WebhookConfig = {
      id: Date.now().toString(),
      name: '',
      url: '',
      events: [],
      enabled: true
    }
    setSettings(prev => ({
      ...prev,
      webhooks: [...prev.webhooks, newWebhook]
    }))
  }

  const updateWebhook = (id: string, field: string, value: string | string[] | boolean) => {
    setSettings(prev => ({
      ...prev,
      webhooks: prev.webhooks.map(wh => 
        wh.id === id ? { ...wh, [field]: value } : wh
      )
    }))
  }

  const deleteWebhook = (id: string) => {
    setSettings(prev => ({
      ...prev,
      webhooks: prev.webhooks.filter(wh => wh.id !== id)
    }))
  }

  const webhookEvents = [
    'order.created',
    'order.updated',
    'customer.created',
    'customer.updated',
    'payment.processed',
    'inventory.low',
    'performance.alert'
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Settings</h2>
          <p className="text-muted-foreground">Configure API integrations, webhooks, and data sources</p>
        </div>
        <Button onClick={saveSettings} className="gap-2">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="apis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="apis">API Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="apis" className="space-y-6">
          {/* Tableau Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6" />
                  <div>
                    <CardTitle>Tableau</CardTitle>
                    <CardDescription>Configure Tableau Server connection</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={settings.tableau.enabled}
                    onCheckedChange={(checked) => handleToggle('tableau', checked)}
                  />
                  <Badge variant={settings.tableau.enabled ? 'default' : 'secondary'}>
                    {settings.tableau.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tableau-server-url">Server URL *</Label>
                  <Input
                    id="tableau-server-url"
                    placeholder="https://your-tableau-server.com"
                    value={settings.tableau.serverUrl}
                    onChange={(e) => handleInputChange('tableau', 'serverUrl', e.target.value)}
                    disabled={!settings.tableau.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tableau-site-id">Site ID</Label>
                  <Input
                    id="tableau-site-id"
                    placeholder="DefaultSite"
                    value={settings.tableau.siteId}
                    onChange={(e) => handleInputChange('tableau', 'siteId', e.target.value)}
                    disabled={!settings.tableau.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tableau-username">Username *</Label>
                  <Input
                    id="tableau-username"
                    placeholder="your-username"
                    value={settings.tableau.username}
                    onChange={(e) => handleInputChange('tableau', 'username', e.target.value)}
                    disabled={!settings.tableau.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tableau-password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="tableau-password"
                      type={showPasswords.tableau ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={settings.tableau.password}
                      onChange={(e) => handleInputChange('tableau', 'password', e.target.value)}
                      disabled={!settings.tableau.enabled}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => togglePasswordVisibility('tableau')}
                    >
                      {showPasswords.tableau ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tableau-api-version">API Version</Label>
                  <Input
                    id="tableau-api-version"
                    placeholder="3.9"
                    value={settings.tableau.apiVersion}
                    onChange={(e) => handleInputChange('tableau', 'apiVersion', e.target.value)}
                    disabled={!settings.tableau.enabled}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => testConnection('tableau')}
                  disabled={!settings.tableau.enabled}
                  className="gap-2"
                >
                  <TestTube className="h-4 w-4" />
                  Test Connection
                </Button>
                {testResults.tableau && (
                  <div className="flex items-center gap-2">
                    {testResults.tableau.success ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm">{testResults.tableau.message}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* New Relic Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6" />
                  <div>
                    <CardTitle>New Relic</CardTitle>
                    <CardDescription>Configure New Relic API credentials</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={settings.newRelic.enabled}
                    onCheckedChange={(checked) => handleToggle('newRelic', checked)}
                  />
                  <Badge variant={settings.newRelic.enabled ? 'default' : 'secondary'}>
                    {settings.newRelic.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newrelic-api-key">API Key *</Label>
                  <div className="relative">
                    <Input
                      id="newrelic-api-key"
                      type={showPasswords.newRelic ? 'text' : 'password'}
                      placeholder="NRAK-xxxxxxxxxxxx"
                      value={settings.newRelic.apiKey}
                      onChange={(e) => handleInputChange('newRelic', 'apiKey', e.target.value)}
                      disabled={!settings.newRelic.enabled}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => togglePasswordVisibility('newRelic')}
                    >
                      {showPasswords.newRelic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newrelic-account-id">Account ID *</Label>
                  <Input
                    id="newrelic-account-id"
                    placeholder="1234567"
                    value={settings.newRelic.accountId}
                    onChange={(e) => handleInputChange('newRelic', 'accountId', e.target.value)}
                    disabled={!settings.newRelic.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newrelic-region">Region</Label>
                  <Input
                    id="newrelic-region"
                    placeholder="US"
                    value={settings.newRelic.region}
                    onChange={(e) => handleInputChange('newRelic', 'region', e.target.value)}
                    disabled={!settings.newRelic.enabled}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => testConnection('newRelic')}
                  disabled={!settings.newRelic.enabled}
                  className="gap-2"
                >
                  <TestTube className="h-4 w-4" />
                  Test Connection
                </Button>
                {testResults.newRelic && (
                  <div className="flex items-center gap-2">
                    {testResults.newRelic.success ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm">{testResults.newRelic.message}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Jira Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitBranch className="h-6 w-6" />
                  <div>
                    <CardTitle>Jira</CardTitle>
                    <CardDescription>Configure Jira integration</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={settings.jira.enabled}
                    onCheckedChange={(checked) => handleToggle('jira', checked)}
                  />
                  <Badge variant={settings.jira.enabled ? 'default' : 'secondary'}>
                    {settings.jira.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jira-base-url">Base URL *</Label>
                  <Input
                    id="jira-base-url"
                    placeholder="https://your-domain.atlassian.net"
                    value={settings.jira.baseUrl}
                    onChange={(e) => handleInputChange('jira', 'baseUrl', e.target.value)}
                    disabled={!settings.jira.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jira-email">Email *</Label>
                  <Input
                    id="jira-email"
                    type="email"
                    placeholder="your-email@example.com"
                    value={settings.jira.email}
                    onChange={(e) => handleInputChange('jira', 'email', e.target.value)}
                    disabled={!settings.jira.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jira-api-token">API Token *</Label>
                  <div className="relative">
                    <Input
                      id="jira-api-token"
                      type={showPasswords.jira ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={settings.jira.apiToken}
                      onChange={(e) => handleInputChange('jira', 'apiToken', e.target.value)}
                      disabled={!settings.jira.enabled}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => togglePasswordVisibility('jira')}
                    >
                      {showPasswords.jira ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jira-project-key">Project Key</Label>
                  <Input
                    id="jira-project-key"
                    placeholder="PROJ"
                    value={settings.jira.projectKey}
                    onChange={(e) => handleInputChange('jira', 'projectKey', e.target.value)}
                    disabled={!settings.jira.enabled}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => testConnection('jira')}
                  disabled={!settings.jira.enabled}
                  className="gap-2"
                >
                  <TestTube className="h-4 w-4" />
                  Test Connection
                </Button>
                {testResults.jira && (
                  <div className="flex items-center gap-2">
                    {testResults.jira.success ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm">{testResults.jira.message}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Blue Shift Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6" />
                  <div>
                    <CardTitle>Blue Shift</CardTitle>
                    <CardDescription>Configure Blue Shift API connection</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={settings.blueShift.enabled}
                    onCheckedChange={(checked) => handleToggle('blueShift', checked)}
                  />
                  <Badge variant={settings.blueShift.enabled ? 'default' : 'secondary'}>
                    {settings.blueShift.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="blueshift-api-key">API Key *</Label>
                  <div className="relative">
                    <Input
                      id="blueshift-api-key"
                      type={showPasswords.blueShift ? 'text' : 'password'}
                      placeholder="your-api-key"
                      value={settings.blueShift.apiKey}
                      onChange={(e) => handleInputChange('blueShift', 'apiKey', e.target.value)}
                      disabled={!settings.blueShift.enabled}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => togglePasswordVisibility('blueShift')}
                    >
                      {showPasswords.blueShift ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blueshift-account-id">Account ID *</Label>
                  <Input
                    id="blueshift-account-id"
                    placeholder="your-account-id"
                    value={settings.blueShift.accountId}
                    onChange={(e) => handleInputChange('blueShift', 'accountId', e.target.value)}
                    disabled={!settings.blueShift.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blueshift-endpoint">Endpoint</Label>
                  <Input
                    id="blueshift-endpoint"
                    placeholder="https://api.blueshift.com"
                    value={settings.blueShift.endpoint}
                    onChange={(e) => handleInputChange('blueShift', 'endpoint', e.target.value)}
                    disabled={!settings.blueShift.enabled}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => testConnection('blueShift')}
                  disabled={!settings.blueShift.enabled}
                  className="gap-2"
                >
                  <TestTube className="h-4 w-4" />
                  Test Connection
                </Button>
                {testResults.blueShift && (
                  <div className="flex items-center gap-2">
                    {testResults.blueShift.success ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm">{testResults.blueShift.message}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Blue Triangle Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="h-6 w-6" />
                  <div>
                    <CardTitle>Blue Triangle</CardTitle>
                    <CardDescription>Configure Blue Triangle API connection</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={settings.blueTriangle.enabled}
                    onCheckedChange={(checked) => handleToggle('blueTriangle', checked)}
                  />
                  <Badge variant={settings.blueTriangle.enabled ? 'default' : 'secondary'}>
                    {settings.blueTriangle.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bluetriangle-api-key">API Key *</Label>
                  <div className="relative">
                    <Input
                      id="bluetriangle-api-key"
                      type={showPasswords.blueTriangle ? 'text' : 'password'}
                      placeholder="your-api-key"
                      value={settings.blueTriangle.apiKey}
                      onChange={(e) => handleInputChange('blueTriangle', 'apiKey', e.target.value)}
                      disabled={!settings.blueTriangle.enabled}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => togglePasswordVisibility('blueTriangle')}
                    >
                      {showPasswords.blueTriangle ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bluetriangle-account-id">Account ID *</Label>
                  <Input
                    id="bluetriangle-account-id"
                    placeholder="your-account-id"
                    value={settings.blueTriangle.accountId}
                    onChange={(e) => handleInputChange('blueTriangle', 'accountId', e.target.value)}
                    disabled={!settings.blueTriangle.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bluetriangle-endpoint">Endpoint</Label>
                  <Input
                    id="bluetriangle-endpoint"
                    placeholder="https://api.bluetriangle.com"
                    value={settings.blueTriangle.endpoint}
                    onChange={(e) => handleInputChange('blueTriangle', 'endpoint', e.target.value)}
                    disabled={!settings.blueTriangle.enabled}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => testConnection('blueTriangle')}
                  disabled={!settings.blueTriangle.enabled}
                  className="gap-2"
                >
                  <TestTube className="h-4 w-4" />
                  Test Connection
                </Button>
                {testResults.blueTriangle && (
                  <div className="flex items-center gap-2">
                    {testResults.blueTriangle.success ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm">{testResults.blueTriangle.message}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Webhook className="h-6 w-6" />
                  <div>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>Configure webhooks to receive real-time events</CardDescription>
                  </div>
                </div>
                <Button onClick={addWebhook} className="gap-2">
                  <Webhook className="h-4 w-4" />
                  Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {settings.webhooks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Webhook className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No webhooks configured</p>
                  <p className="text-sm">Click "Add Webhook" to create one</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {settings.webhooks.map((webhook, index) => (
                    <Card key={webhook.id} className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Switch
                              checked={webhook.enabled}
                              onCheckedChange={(checked) => updateWebhook(webhook.id, 'enabled', checked)}
                            />
                            <div>
                              <CardTitle className="text-lg">
                                {webhook.name || `Webhook ${index + 1}`}
                              </CardTitle>
                              <CardDescription>{webhook.url || 'No URL configured'}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={webhook.enabled ? 'default' : 'secondary'}>
                              {webhook.enabled ? 'Active' : 'Inactive'}
                            </Badge>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => deleteWebhook(webhook.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`webhook-name-${webhook.id}`}>Webhook Name *</Label>
                            <Input
                              id={`webhook-name-${webhook.id}`}
                              placeholder="Order Created Webhook"
                              value={webhook.name}
                              onChange={(e) => updateWebhook(webhook.id, 'name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`webhook-url-${webhook.id}`}>Webhook URL *</Label>
                            <Input
                              id={`webhook-url-${webhook.id}`}
                              type="url"
                              placeholder="https://your-endpoint.com/webhook"
                              value={webhook.url}
                              onChange={(e) => updateWebhook(webhook.id, 'url', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Events to Subscribe</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {webhookEvents.map((event) => (
                              <div key={event} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={`${webhook.id}-${event}`}
                                  checked={webhook.events.includes(event)}
                                  onChange={(e) => {
                                    const events = e.target.checked
                                      ? [...webhook.events, event]
                                      : webhook.events.filter(ev => ev !== event)
                                    updateWebhook(webhook.id, 'events', events)
                                  }}
                                  className="rounded border-gray-300"
                                />
                                <Label htmlFor={`${webhook.id}-${event}`} className="text-sm font-normal cursor-pointer">
                                  {event}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`webhook-secret-${webhook.id}`}>Webhook Secret (Optional)</Label>
                          <div className="relative">
                            <Input
                              id={`webhook-secret-${webhook.id}`}
                              type={showPasswords[`webhook-${webhook.id}`] ? 'text' : 'password'}
                              placeholder="Secret key for webhook verification"
                              value={webhook.secret || ''}
                              onChange={(e) => updateWebhook(webhook.id, 'secret', e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={() => togglePasswordVisibility(`webhook-${webhook.id}`)}
                            >
                              {showPasswords[`webhook-${webhook.id}`] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => testConnection(`webhook-${webhook.id}`)}
                            className="gap-2"
                          >
                            <TestTube className="h-4 w-4" />
                            Test Webhook
                          </Button>
                          {testResults[`webhook-${webhook.id}`] && (
                            <div className="flex items-center gap-2">
                              {testResults[`webhook-${webhook.id}`].success ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              <span className="text-sm">{testResults[`webhook-${webhook.id}`].message}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
