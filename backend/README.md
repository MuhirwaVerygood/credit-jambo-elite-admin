# Admin Backend

NestJS backend API for the Credit Jambo Elite admin portal, providing administrative functionality for managing users, devices, and system operations.

## Features

- User management and authentication
- Device verification system
- Transaction monitoring
- JWT-based authentication
- Prisma ORM with PostgreSQL
- RESTful API design

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Docker (for database)

## Installation

1. **Navigate to the admin backend directory**
   ```bash
   cd Admin/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_SECRET`: Secure JWT secret key
   - `PORT`: 3001 (default)

4. **Start the database**
   ```bash
   # From project root
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

## Running the Application

### Development
```bash
npm run start:dev
```
The API will be available at `http://localhost:3001`

### Production
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/login` - Admin login
- `POST /auth/register` - Register new admin user

### User Management
- `GET /admin/users` - List all users
- `GET /admin/users/:id` - Get user details
- `PUT /admin/users/:id` - Update user information

### Device Management
- `GET /admin/devices` - List all devices
- `POST /admin/devices/verify` - Verify device
- `DELETE /admin/devices/:id` - Remove device

### Transaction Monitoring
- `GET /admin/transactions` - List all transactions
- `GET /admin/transactions/:id` - Get transaction details

## Database Schema

The admin backend uses the shared database schema with the following key models:
- `User` - User accounts
- `Device` - Device verification records
- `Transaction` - Financial transactions

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

## Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## API Documentation

Once the server is running, visit `http://localhost:3001/api` for Swagger documentation.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `PORT` | Server port | 3001 |

## Development Notes

- Uses TypeScript for type safety
- Implements class-validator for request validation
- Uses bcryptjs for password hashing
- Implements rate limiting and helmet for security
- Follows NestJS best practices and patterns
