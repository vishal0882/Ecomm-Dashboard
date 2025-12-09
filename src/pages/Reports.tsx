export default function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Reports</h2>
        <p className="text-muted-foreground">Generate and view business reports</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-md">
            <h4 className="font-semibold mb-2">Sales Report</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Daily sales trends, total revenue, and order statistics
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90">
              Generate
            </button>
          </div>
          <div className="p-4 border border-border rounded-md">
            <h4 className="font-semibold mb-2">Revenue Report</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Quarterly revenue data with growth metrics
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90">
              Generate
            </button>
          </div>
          <div className="p-4 border border-border rounded-md">
            <h4 className="font-semibold mb-2">Performance Report</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Application performance metrics from New Relic
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90">
              Generate
            </button>
          </div>
          <div className="p-4 border border-border rounded-md">
            <h4 className="font-semibold mb-2">Customers Report</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Customer statistics, CLV, and CAC
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

