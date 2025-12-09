# E-Commerce Dashboard

A modern React dashboard application for generating and viewing e-commerce business reports. This dashboard integrates with Tableau, New Relic, and Jira to fetch and display various business metrics and reports.

## Features

- **Dashboard Overview**: Real-time metrics and KPIs
- **Sales Reports**: Track sales trends, revenue, and order data
- **Performance Monitoring**: Application performance metrics from New Relic
- **Issue Tracking**: Jira integration for tracking e-commerce related issues
- **Multiple Data Sources**: Seamlessly integrates data from Tableau, New Relic, and Jira
- **Modern UI**: Beautiful, responsive design with dark theme
- **Report Export**: Export reports as JSON files

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Recharts** for data visualization
- **Axios** for API calls
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### macOS Setup

**Important**: If you encounter Xcode license errors, first accept the Xcode license:
```bash
sudo xcodebuild -license accept
```

Then run the automated setup script:
```bash
./setup-mac.sh
```

Or install manually:

1. Install Node.js (if not already installed):
   - Using Homebrew: `brew install node`
   - Or download from [nodejs.org](https://nodejs.org/)

2. Navigate to the project directory:
```bash
cd /Users/vishalj/Downloads/ecommerce-dashboard-main
```

3. Install dependencies:
```bash
npm install
```

### Installation (Windows/Linux)

1. Navigate to the project directory:
```bash
cd ecommerce-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your API credentials in the `.env` file:
   - Tableau Server URL and credentials
   - New Relic API key and account ID
   - Jira base URL, email, and API token

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `https://localhost:3000`

**Note**: The application uses HTTPS with a self-signed certificate. Your browser will show a security warning - click "Advanced" and "Proceed to localhost" to continue.

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
ecommerce-dashboard/
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   └── MetricCard.tsx
│   │   ├── charts/
│   │   │   └── SalesChart.tsx
│   │   └── layout/
│   │       └── DashboardLayout.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Reports.tsx
│   │   └── Settings.tsx
│   ├── services/
│   │   ├── tableauService.ts
│   │   ├── newrelicService.ts
│   │   ├── jiraService.ts
│   │   └── reportService.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## API Integrations

### Tableau
- Fetches workbooks and dashboard data
- Requires Tableau Server URL, Site ID, username, and password
- Uses Tableau REST API v3.9

### New Relic
- Retrieves application performance metrics
- Monitors response time, error rate, uptime, and throughput
- Requires API key and account ID

### Jira
- Fetches issues and project data
- Tracks e-commerce related tickets
- Requires base URL, email, and API token

## Available Reports

1. **Sales Report**: Daily sales trends, total revenue, and order statistics
2. **Revenue Report**: Quarterly revenue data with growth metrics
3. **Orders Report**: Order details, status, and customer information
4. **Performance Report**: Application performance metrics from New Relic
5. **Customers Report**: Customer statistics, CLV, and CAC
6. **Products Report**: Top-selling products and inventory status

## Development Notes

- The application includes mock data fallbacks for development when API credentials are not configured
- All API services are designed to handle errors gracefully
- Environment variables are used for sensitive configuration
- The dashboard is fully responsive and works on mobile devices
- **Charts are always visible** - The dashboard displays all charts with fallback data even when external services are unavailable
- **CI/CD Pipeline** - GitHub Actions workflows are configured for automated testing and deployment

## CI/CD Pipeline

This project includes GitHub Actions workflows for continuous integration and deployment:

- **CI Pipeline** (`.github/workflows/ci.yml`): Runs on every push and pull request
  - Tests on Node.js 18.x and 20.x
  - Runs linter
  - Builds the project
  - Uploads build artifacts

- **Deploy Pipeline** (`.github/workflows/deploy.yml`): Runs on pushes to main/master
  - Builds production-ready artifacts
  - Ready for deployment to your hosting platform

To use these workflows:
1. Push your code to GitHub
2. The workflows will run automatically
3. Check the Actions tab in your GitHub repository to see the results

## Security Considerations

⚠️ **Important**: In a production environment, API credentials should be stored securely on the backend, not in the frontend. The current implementation stores credentials in environment variables for development purposes only.

## License

MIT


