# Advanced Search System

A NestJS-based advanced search system with PostgreSQL integration, featuring:

- Advanced search capabilities with multiple filters
- Autocomplete suggestions
- Pagination and sorting
- Performance optimized queries
- TypeScript support
- Swagger documentation

## Project Setup

```bash
# Install dependencies
$ npm install

# Set up the database
$ npx prisma migrate dev

# Seed the database with test data
$ npm run seed
```

## Running the Application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/api
```

## Features

- **Advanced Search**: Search products by name, description, category, location, price range, and tags
- **Autocomplete**: Get intelligent suggestions as you type
- **Pagination**: Efficiently handle large result sets
- **Sorting**: Sort results by various fields
- **Performance**: Optimized PostgreSQL queries with proper indexing

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is MIT licensed.

## Project Structure

```
src/
├── modules/               # Application modules
│   ├── app/              # Core application module
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── app.controller.ts
│   ├── products/         # Products module
│   │   ├── dto/         # Data Transfer Objects
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   └── prisma/           # Prisma module for database access
│       ├── prisma.module.ts
│       └── prisma.service.ts
├── config/               # Configuration files
│   ├── app.config.ts     # General configuration
│   ├── database.config.ts # Database configuration
│   ├── swagger.config.ts # Swagger configuration
│   └── index.ts          # Config export
├── constants/            # Global constants
│   ├── index.ts         # Constants export
│   ├── sort.constants.ts # Sorting constants
│   └── pagination.constants.ts # Pagination constants
├── decorators/          # Custom decorators
│   ├── api-response.decorator.ts
│   ├── pagination.decorator.ts
│   └── index.ts
├── types/               # Type definitions
│   ├── pagination.interface.ts
│   ├── filter.interface.ts
│   └── sort.interface.ts
├── utils/               # Utility functions
│   ├── query.interface.ts # Query interfaces
│   ├── sort.interface.ts # Sorting interfaces
│   ├── filter.interface.ts # Filtering interfaces
│   └── pagination.interface.ts # Pagination interfaces
└── main.ts             # Application entry point
```

### Detailed Structure

1. **`modules/`**: 
   - Contains all application modules
   - Each module is a self-contained feature with its own components
   - Currently includes the products module for product management

2. **`config/`**:
   - Application configuration files
   - Database and environment variable configurations

3. **`constants/`**:
   - Global constants used throughout the application
   - Fixed values such as error messages, limits, etc.

4. **`decorators/`**:
   - Custom decorators to enhance functionality
   - Includes decorators for API responses and pagination

5. **`types/`**:
   - TypeScript interfaces and types
   - Defines data structures for pagination, filters, and sorting

6. **`utils/`**:
   - Utility services and functions
   - Includes the query service for handling advanced searches

7. **`main.ts`**:
   - Application entry point
   - Configures and bootstraps the NestJS application

This structure follows the principles of:
- Separation of concerns
- Modularity
- Code reusability
- Maintainability
- Scalability
