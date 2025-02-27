# Todos App with Nextjs and Postgres

A Simple Todo App for Next.js Practice.

## Development

1. After clone:

   ```bash
   # Update the DATABASE_URL within your .env file.
   npm i #install dependencies
   docker compose up -d # get up database
   npx prisma migrate dev # Apply schema changes to your database.
   npx prisma generate # Generate the Prisma Client to reflect schema updates.
   npm run dev # start server
   ```

2. Seed Endpoint for Local Database Reset

   - The `/api/seed` endpoint allows you to easily reset your local database to its initial state with test data.
   - Access it by clicking [here](http://localhost:3000/api/seed) or sending a GET request to `http://localhost:3000/api/seed`.

## How the Project Was Built

```bash
npm create-next-app # yes to all default options
```

### Prisma config

1. Copy .env.template file and rename the .env.template.copy file to .env and replace the placeholder URL with your database connection details, including the username, password, and database name. For this project, we have:

   ```bash
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
   ```

2. Init Prisma

   ```bash
   npx prisma init
   ```

3. Add src/lib/prisma.ts file for nextjs use:

   "This src/lib/prisma.ts file creates and exports a singleton instance of the Prisma Client. This ensures that only one Prisma Client is instantiated during development, preventing excessive database connections. In production, it simply exports a new instance. This optimizes performance and avoids potential connection issues."

   Key points covered:

   - Singleton pattern: Explains the core purpose.
   - Development optimization: Highlights the prevention of excessive connections.
   - Production behavior: Clarifies the difference in production.
   - Performance and connection benefits: Briefly states the advantages.

   ```ts
   import { PrismaClient } from '@prisma/client'

   const prismaClientSingleton = () => {
     return new PrismaClient()
   }

   declare const globalThis: {
     prismaGlobal: ReturnType<typeof prismaClientSingleton>
   } & typeof global

   const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

   export default prisma

   if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
   ```

#### Update Prisma After Schema Changes

After making changes to your Prisma schema (`schema.prisma`), run the following commands:

```bash
npx prisma migrate dev # Apply schema changes to your database.
npx prisma generate # Generate the Prisma Client to reflect schema updates.
```

## Dependencies

- [Prisma](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Vercel - Next + Prisma](https://vercel.com/guides/nextjs-prisma-postgres)
- [Yup](https://www.npmjs.com/package/yup): Yup is a schema builder for runtime value parsing and validation. Define a schema, transform a value to match, assert the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformation.

## Prod

## Stage
