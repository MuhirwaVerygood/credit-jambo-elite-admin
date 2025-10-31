# Admin Frontend

Next.js React application for the Credit Jambo Elite admin portal, providing a web interface for administrators to manage users, devices, and monitor system activities.

## Features

- Admin dashboard with system overview
- User management interface
- Device verification management
- Transaction monitoring and reporting
- Responsive design with modern UI
- Real-time data updates

## Prerequisites

- Node.js (v18 or higher)
- Admin backend API running (localhost:3001)

## Installation

1. **Navigate to the admin frontend directory**
   ```bash
   cd Admin/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

## Running the Application

### Development
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production
```bash
npm run build
npm run start
```

## Project Structure

```
Admin/frontend/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Admin dashboard
│   ├── login/            # Admin login page
│   ├── users/            # User management pages
│   ├── devices/          # Device management pages
│   └── transactions/     # Transaction monitoring pages
├── components/           # Reusable React components
├── lib/                 # Utility functions and API clients
├── public/              # Static assets
└── styles/              # Global styles and CSS
```

## Key Features

### Dashboard
- System statistics and metrics
- Recent transactions overview
- User activity monitoring
- Device verification status

### User Management
- View all registered users
- Edit user information
- Manage user accounts
- View user transaction history

### Device Management
- List all registered devices
- Verify/unverify devices
- Remove unauthorized devices
- Device activity logs

### Transaction Monitoring
- View all system transactions
- Filter by date, type, user
- Export transaction reports
- Transaction analytics

## API Integration

The frontend communicates with the Admin Backend API:

- **Base URL**: `http://localhost:3001`
- **Authentication**: JWT tokens stored in localStorage
- **Data Fetching**: Server-side rendering with SWR for client-side updates

## Styling

- Uses Tailwind CSS for utility-first styling
- Responsive design for mobile and desktop
- Consistent design system with reusable components

## Development Guidelines

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture

### State Management
- React hooks for local state
- SWR for server state management
- Context API for global state (auth, theme)

### Routing
- Next.js App Router for file-based routing
- Protected routes for authenticated pages
- Dynamic routes for user/device details

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Admin backend API URL | http://localhost:3001 |

## Building for Production

```bash
npm run build
npm run start
```

The production build will be optimized for performance and SEO.

## Testing

```bash
npm run test
npm run test:watch
```

## Deployment

The application can be deployed to Vercel, Netlify, or any Node.js hosting platform:

1. Build the application: `npm run build`
2. Set environment variables in your hosting platform
3. Deploy the `.next` folder contents

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style and patterns
2. Create feature branches for new functionality
3. Test thoroughly before submitting PRs
4. Update documentation for new features
