# Upload Server

A modern, type-safe image upload server built with Fastify, TypeScript, and AWS S3. This server provides a robust API for handling image uploads, managing upload records, and exporting upload data.

## Features

- 🚀 Fast and efficient image upload handling
- 📊 Swagger documentation at `/docs`
- 🔒 Type-safe API using Zod validation
- 💾 PostgreSQL database integration with Drizzle ORM
- 📦 AWS S3 storage integration
- 📑 CSV export functionality
- 🔍 Upload history tracking and querying

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **Storage**: AWS S3
- **Documentation**: OpenAPI/Swagger
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- pnpm
- AWS S3 bucket and credentials

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```
4. Configure your environment variables in `.env`

### Database Setup

1. Run database migrations:
   ```bash
   pnpm db:migrate
   ```

2. (Optional) Launch Drizzle Studio to manage your database:
   ```bash
   pnpm db:studio
   ```

### Development Environment

The project includes a Docker Compose configuration for local development that sets up:
- PostgreSQL database
- LocalStack (for S3 emulation)

Start the development environment:
```bash
docker compose -f docker-compose.dev.yml up -d
```

This will provide:
- PostgreSQL running on port 5432
- LocalStack S3 on port 4566

For local development with these services, use these environment variables:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/uploadserver
AWS_ENDPOINT=http://localhost:4566
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_BUCKET_NAME=your-bucket-name
```

### Development

Start the development server with hot reload:
```bash
pnpm dev
```

### Testing

Run the test suite:
```bash
pnpm test
```

Watch mode for tests:
```bash
pnpm test:watch
```

### Building for Production

Build the project:
```bash
pnpm build
```

## API Documentation

Once the server is running, visit `/docs` to access the Swagger UI documentation, which provides detailed information about all available endpoints.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Launch Drizzle Studio
- `pnpm build` - Build for production

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

- `PORT` - Server port
- `DATABASE_URL` - PostgreSQL connection string
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_BUCKET_NAME` - S3 bucket name
- `AWS_REGION` - AWS region

## License

ISC
