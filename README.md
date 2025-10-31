# Credit Jambo Elite - Admin Portal

Administrative interface for managing the Credit Jambo Elite savings platform. Provides tools for overseeing users, transactions, devices, and system operations.

## What It Does

The Admin Portal enables administrators to:
- **Manage Users**: View, verify, and manage all user accounts
- **Monitor Transactions**: Track all deposits, withdrawals, and financial activities
- **Device Security**: Manage device registrations and security
- **System Analytics**: Generate reports and monitor platform performance
- **Compliance**: Maintain audit trails and regulatory compliance

## Architecture

**Backend** (`./backend/`) - NestJS API on port 3001  
**Frontend** (`./frontend/`) - Next.js dashboard on port 4001

## Quick Start

1. Start database: `docker-compose up -d` (from project root)
2. Setup backend:
   ```bash
   cd Admin/backend
   cp .env.example .env
   npm install
   npx prisma migrate dev
   npm run start:dev
   ```
3. Setup frontend:
   ```bash
   cd Admin/frontend
   cp .env.example .env.local
   npm install
   npm run dev
   ```
4. Access: http://localhost:4001

## Key Features

- User account management and verification
- Real-time transaction monitoring
- Device registration oversight
- Financial reporting and analytics
- System health monitoring
- Audit logging and compliance tools

For detailed setup instructions, see:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)