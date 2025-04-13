# Advanced Search System

A powerful search system built with NestJS and PostgreSQL, featuring advanced filtering, sorting, and autocomplete capabilities.

## Features

- 🔍 Advanced search with multiple filters
- 📝 Full-text search using PostgreSQL
- 🏷️ Tag-based filtering
- 📍 Location-based search
- 💰 Price range filtering
- 🔄 Sorting by multiple fields
- 📄 Pagination support
- 🤖 Autocomplete suggestions
- 📊 Performance optimized with 1000+ test products

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


## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lucasacci/advanced-search-system.git
   cd advanced-search-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/advanced_search?schema=public"
   PORT=3000
   ```

4. Set up the database:
   ```bash
   # Create the database
   npx prisma db push

   # Seed the database with test data
   npm run seed
   ```

## Running the Application

1. Start the development server:
   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run build
   npm run start:prod
   ```

2. The API will be available at `http://localhost:3000`

## API Documentation

The API documentation is available through Swagger UI at `http://localhost:3000/api`

### Main Endpoints

- `GET /products/search` - Search products with filters
- `GET /products/autocomplete` - Get autocomplete suggestions
- `GET /products` - Get all products
- `GET /products/:id` - Get a specific product
- `POST /products` - Create a new product
- `PATCH /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Search Parameters

The search endpoint (`/products/search`) accepts the following query parameters:

- `searchTerm` - Text to search in name and description
- `category` - Filter by category
- `location` - Filter by location
- `tags` - Filter by tags (comma-separated)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Field to sort by (name, price, createdAt, updatedAt)
- `sortDirection` - Sort direction (asc, desc)

### Example Search Request

```bash
curl "http://localhost:3000/products/search?searchTerm=laptop&category=electronics&minPrice=500&maxPrice=2000&page=1&limit=10&sortBy=price&sortDirection=asc"
```

## Testing

1. Run the test suite:
   ```bash
   # Unit tests
   npm run test

   # e2e tests
   npm run test:e2e

   # Test coverage
   npm run test:cov
   ```

2. The test suite includes:
   - Unit tests for services and controllers
   - Integration tests for the search functionality
   - Performance tests with the seeded database

## Performance Testing

The system includes 1000 test products for performance testing. To run performance tests:

```bash
# Generate test data
npm run seed

# Run performance tests
npm run test:perf
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.