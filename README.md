# Todos App with Nextjs and Postgres

A Simple Todo App for Next.js Practice

## Development

After clone, run:

```bash
npm i #install dependencies
docker compose up -d # get up database
npm run dev # start server
```

## Project creation

```bash
npm create-next-app # yes to all default options
```

## Prisma config

1. Rename the .env.template file to.env and replace the placeholder URL with your database connection details, including the username, password, and database name. For this project, we have:

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

### Seed Local Database

To seed your local database, click [here](http://localhost:3000/api/seed) or send a GET request to `http://localhost:3000/api/seed`.

### Update Prisma After Schema Changes

After making changes to your Prisma schema (`schema.prisma`), run the following commands:

```bash
npx prisma migrate dev # Apply schema changes to your database.
npx prisma generate # Generate the Prisma Client to reflect schema updates.
```

## Dependencies

- [Prisma](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Vercel - Next + Prisma](https://vercel.com/guides/nextjs-prisma-postgres)

## Prod

## Stage
