# shadcn/ui Dashboard Guide

This guide explains how to use shadcn/ui components in your e-commerce dashboard.

## Table of Contents
1. [Adding New Components](#adding-new-components)
2. [Using Existing Components](#using-existing-components)
3. [Common Dashboard Patterns](#common-dashboard-patterns)
4. [Customization](#customization)

## Adding New Components

### Method 1: Using npx (Recommended)
```bash
npx shadcn-ui@latest add [component-name]
```

Examples:
```bash
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add select
npx shadcn-ui@latest add badge
```

### Method 2: Manual Installation
1. Visit [shadcn/ui components](https://ui.shadcn.com/docs/components)
2. Copy the component code
3. Create the file in `src/components/ui/[component-name].tsx`
4. Ensure dependencies are installed in `package.json`

## Using Existing Components

### 1. Card Component
Used for containers, charts, and content sections:

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Chart Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Your content here */}
  </CardContent>
  <CardFooter>
    {/* Optional footer */}
  </CardFooter>
</Card>
```

### 2. Button Component
Multiple variants and sizes:

```tsx
import { Button } from '@/components/ui/button'

// Variants: default, destructive, outline, secondary, ghost, link
// Sizes: default, sm, lg, icon

<Button variant="default" size="default">Click Me</Button>
<Button variant="outline" size="sm">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Delete</Button>
```

### 3. Input & Label Components
For forms:

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter email" />
</div>
```

### 4. Separator Component
For visual dividers:

```tsx
import { Separator } from '@/components/ui/separator'

<Separator />
<Separator orientation="vertical" />
```

### 5. Tabs Component
For tabbed navigation:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Content 1</TabsContent>
  <TabsContent value="analytics">Content 2</TabsContent>
</Tabs>
```

## Common Dashboard Patterns

### Pattern 1: Metric Cards Grid
```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
      <DollarSign className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$45,231.89</div>
      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
    </CardContent>
  </Card>
</div>
```

### Pattern 2: Data Table with Cards
```tsx
<Card>
  <CardHeader>
    <CardTitle>Recent Orders</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between border-b border-border pb-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">{order.id}</p>
            <p className="text-sm text-muted-foreground">{order.customer}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">${order.amount}</p>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
```

### Pattern 3: Chart Container
```tsx
<Card>
  <CardHeader>
    <CardTitle>Sales Trend</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={300}>
      {/* Your chart component here */}
    </ResponsiveContainer>
  </CardContent>
</Card>
```

### Pattern 4: Form Sections
```tsx
<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
    <CardDescription>Configure your preferences</CardDescription>
  </CardHeader>
  <Separator />
  <CardContent className="space-y-4 pt-6">
    <div className="space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" />
    </div>
  </CardContent>
</Card>
```

## Customization

### Using Tailwind Classes
All shadcn components use Tailwind CSS and can be customized:

```tsx
<Card className="border-2 border-primary">
  <CardHeader className="bg-muted">
    {/* Custom styling */}
  </CardHeader>
</Card>

<Button className="w-full">Full Width Button</Button>
```

### Using CSS Variables
The theme uses CSS variables defined in `src/index.css`:

```css
:root {
  --primary: 217.2 91.2% 59.8%;
  --secondary: 217.2 32.6% 17.5%;
  /* etc. */
}
```

### Custom Component Variants
You can extend components using `cn()` utility:

```tsx
import { cn } from '@/lib/utils'

<Button className={cn(
  "custom-class",
  isActive && "bg-primary"
)}>
  Custom Button
</Button>
```

## Available Components in Your Project

Currently installed:
- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Label
- ✅ Separator
- ✅ Tabs

## Recommended Components for Dashboard

Consider adding these for enhanced functionality:

```bash
# Data Display
npx shadcn-ui@latest add table      # For data tables
npx shadcn-ui@latest add badge       # For status badges
npx shadcn-ui@latest add avatar      # For user avatars
npx shadcn-ui@latest add progress    # For progress bars

# Forms
npx shadcn-ui@latest add select      # Dropdown selects
npx shadcn-ui@latest add checkbox    # Checkboxes
npx shadcn-ui@latest add switch      # Toggle switches
npx shadcn-ui@latest add textarea    # Text areas

# Overlays
npx shadcn-ui@latest add dialog      # Modal dialogs
npx shadcn-ui@latest add dropdown-menu # Dropdown menus
npx shadcn-ui@latest add popover     # Popovers
npx shadcn-ui@latest add tooltip     # Tooltips

# Navigation
npx shadcn-ui@latest add navigation-menu # Navigation menus
npx shadcn-ui@latest add breadcrumb  # Breadcrumbs

# Feedback
npx shadcn-ui@latest add alert       # Alerts
npx shadcn-ui@latest add toast       # Toast notifications
npx shadcn-ui@latest add skeleton     # Loading skeletons
```

## Example: Complete Dashboard Section

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

export default function DashboardSection() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your metrics</p>
        </div>
        <Button>Export</Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Metric 1</CardTitle>
              </CardHeader>
              <CardContent>Content</CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Component Examples](https://ui.shadcn.com/docs/components)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

