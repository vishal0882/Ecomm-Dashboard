import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AlertCircle, Users, Target, TrendingUp } from 'lucide-react'

const teams = [
  { id: 1, name: 'Frontend Team', sprint: 'Sprint 23', velocity: 42, capacity: 50, burndown: 85 },
  { id: 2, name: 'Backend Team', sprint: 'Sprint 23', velocity: 38, capacity: 45, burndown: 78 },
  { id: 3, name: 'Mobile Team', sprint: 'Sprint 23', velocity: 35, capacity: 40, burndown: 72 },
  { id: 4, name: 'QA Team', sprint: 'Sprint 23', velocity: 28, capacity: 35, burndown: 80 },
]

const sprintMetrics = [
  { sprint: 'Sprint 20', completed: 45, inProgress: 12, blocked: 3, total: 60 },
  { sprint: 'Sprint 21', completed: 48, inProgress: 10, blocked: 2, total: 60 },
  { sprint: 'Sprint 22', completed: 52, inProgress: 8, blocked: 1, total: 61 },
  { sprint: 'Sprint 23', completed: 50, inProgress: 7, blocked: 2, total: 59 },
]

const dependencies = [
  { id: 1, from: 'Frontend Team', to: 'Backend Team', type: 'API Dependency', status: 'resolved', priority: 'high' },
  { id: 2, from: 'Backend Team', to: 'Mobile Team', type: 'Data Model', status: 'pending', priority: 'medium' },
  { id: 3, from: 'Frontend Team', to: 'QA Team', type: 'Testing', status: 'in-progress', priority: 'high' },
  { id: 4, from: 'Mobile Team', to: 'QA Team', type: 'Testing', status: 'resolved', priority: 'low' },
]

const blockers = [
  { id: 1, team: 'Backend Team', issue: 'API rate limiting issue', severity: 'high', status: 'active', days: 2 },
  { id: 2, team: 'Frontend Team', issue: 'Third-party library conflict', severity: 'medium', status: 'resolved', days: 0 },
  { id: 3, team: 'Mobile Team', issue: 'Build pipeline failure', severity: 'high', status: 'active', days: 1 },
]

const teamVelocity = [
  { team: 'Frontend', sprint1: 40, sprint2: 42, sprint3: 45, sprint4: 42 },
  { team: 'Backend', sprint1: 35, sprint2: 38, sprint3: 40, sprint4: 38 },
  { team: 'Mobile', sprint1: 32, sprint2: 35, sprint3: 38, sprint4: 35 },
  { team: 'QA', sprint1: 25, sprint2: 28, sprint3: 30, sprint4: 28 },
]

export default function ScrumOfScrum() {
  const totalVelocity = teams.reduce((sum, team) => sum + team.velocity, 0)
  const totalCapacity = teams.reduce((sum, team) => sum + team.capacity, 0)
  const utilization = (totalVelocity / totalCapacity) * 100
  const activeBlockers = blockers.filter(b => b.status === 'active').length

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Scrum of Scrums</h2>
        <p className="text-muted-foreground">Cross-team coordination, dependencies, and sprint metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Velocity</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVelocity}</div>
            <p className="text-xs text-muted-foreground">Story points completed</p>
            <Progress value={utilization} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{utilization.toFixed(1)}% capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground">Teams in sprint</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Blockers</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activeBlockers}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dependencies</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dependencies.length}</div>
            <p className="text-xs text-muted-foreground">
              {dependencies.filter(d => d.status === 'resolved').length} resolved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Current sprint metrics for each team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{team.name}</h4>
                    <p className="text-sm text-muted-foreground">{team.sprint}</p>
                  </div>
                  <Badge variant="outline">{team.velocity} / {team.capacity} SP</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Velocity</span>
                    <span className="font-medium">{team.velocity} / {team.capacity} story points</span>
                  </div>
                  <Progress value={(team.velocity / team.capacity) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sprint Burndown</span>
                    <span className="font-medium">{team.burndown}%</span>
                  </div>
                  <Progress value={team.burndown} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="sprints" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sprints">Sprint Metrics</TabsTrigger>
          <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
          <TabsTrigger value="blockers">Blockers</TabsTrigger>
          <TabsTrigger value="velocity">Velocity Trend</TabsTrigger>
        </TabsList>

        <TabsContent value="sprints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sprint Completion Metrics</CardTitle>
              <CardDescription>Task completion across recent sprints</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sprintMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sprint" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                  <Bar dataKey="inProgress" fill="#8884d8" name="In Progress" />
                  <Bar dataKey="blocked" fill="#ff6b6b" name="Blocked" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dependencies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Team Dependencies</CardTitle>
              <CardDescription>Inter-team dependencies and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From Team</TableHead>
                    <TableHead>To Team</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dependencies.map((dep) => (
                    <TableRow key={dep.id}>
                      <TableCell className="font-medium">{dep.from}</TableCell>
                      <TableCell>{dep.to}</TableCell>
                      <TableCell>{dep.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={dep.priority === 'high' ? 'destructive' : dep.priority === 'medium' ? 'default' : 'secondary'}
                        >
                          {dep.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={dep.status === 'resolved' ? 'default' : dep.status === 'in-progress' ? 'secondary' : 'outline'}
                        >
                          {dep.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Blockers</CardTitle>
              <CardDescription>Issues blocking team progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blockers.map((blocker) => (
                  <div key={blocker.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{blocker.issue}</h4>
                        <p className="text-sm text-muted-foreground">{blocker.team}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant={blocker.severity === 'high' ? 'destructive' : 'secondary'}
                        >
                          {blocker.severity}
                        </Badge>
                        <Badge
                          variant={blocker.status === 'active' ? 'destructive' : 'default'}
                        >
                          {blocker.status}
                        </Badge>
                      </div>
                    </div>
                    {blocker.status === 'active' && (
                      <p className="text-sm text-muted-foreground">
                        Blocked for {blocker.days} day{blocker.days !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="velocity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Velocity Trend</CardTitle>
              <CardDescription>Story points completed over recent sprints</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teamVelocity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="team" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sprint1" fill="#8884d8" name="Sprint 20" />
                  <Bar dataKey="sprint2" fill="#82ca9d" name="Sprint 21" />
                  <Bar dataKey="sprint3" fill="#ffc658" name="Sprint 22" />
                  <Bar dataKey="sprint4" fill="#ff6b6b" name="Sprint 23" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

