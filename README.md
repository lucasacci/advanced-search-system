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
