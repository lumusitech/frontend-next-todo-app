# Dashboard App with Nextjs and Postgres

A Simple Dashboard App for Next.js Practice.
**Themes:** Building REST endpoints vs. using Server Actions, implementing optimistic updates with useOptimistic, revalidation and cache management, server cookies vs client cookies, User authentication, and others.

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

Important Note: You can use `npx prisma db pull` to automatically generate Prisma schema models for tables already present in your database that are not yet defined in your schema. For more information about other Prisma commands, visit [https://www.prisma.io/docs/orm/reference/prisma-cli-reference](https://www.prisma.io/docs/orm/reference/prisma-cli-reference). Remember to update your Prisma client after using `npx prisma db pull` with `npx prisma generate` to access the new schemas (automatic synchronization of new tables with Prisma).

## UI

### Icons

In this projects, we use React Icons. Learn more [here](https://react-icons.github.io/react-icons/)

Intallation:

```bash
npm install react-icons --save
```

### Adapted Components from [TW components](https://www.creative-tim.com/twcomponents)

### Note: Tailwind CSS Configuration

Ensure that the paths to all files using Tailwind styles are included in the tailwind.config.ts file. In this project, the todos and products folders have been added.
Furthermore, add a safelist array to ensure that dynamically generated Tailwind classes like grid-cols-${tabsOptions.length} are not purged during the build process.

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/todos/**/*.{js,ts,jsx,tsx,mdx}',
    './src/products/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  safelist: [
    {
      // Ensure dynamically generated grid-cols classes are not purged
      pattern: /grid-cols-./,
    },
  ],
  plugins: [],
} satisfies Config
```

## Authentication and Authorization

This project uses Auth.js as authentication and authorization management. Auth.js is a complete open-source authentication solution for Web applications. It is designed from the ground up to support Next.js and Serverless. More info [here](https://next-auth.js.org/getting-started/introduction).

We can generate hash key for `NEXTAUTH_SECRET` env var using this [page](https://generate-secret.vercel.app/32).

To generate GITHUB_ID and GITHUB_SECRET you have to go to github settings, then Developers settings, then OAuth Apps and generate a new OAuth app. Remember add a callback page. In development mode, use `http://localhost:3000/api/auth/callback/github`. In production mode, use `https://yourdomain.com/api/auth/callback/github`

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

## Next Cookie Management

Next.js provides the `cookies()` function for reading incoming HTTP request cookies in Server Components and managing outgoing request cookies in Server Actions or Route Handlers. Read more [here](https://nextjs.org/docs/app/api-reference/functions/cookies).
To simplify cookie management in this project, we utilize the `cookies-next` library.

## Dependencies

- [Prisma](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Vercel - Next + Prisma](https://vercel.com/guides/nextjs-prisma-postgres)
- [Yup](https://www.npmjs.com/package/yup): Yup is a schema builder for runtime value parsing and validation. Define a schema, transform a value to match, assert the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformation.
- [Cookies Next](https://www.npmjs.com/package/cookies-next): A versatile cookie management library for Next.js applications, supporting both client-side and server-side operations.
- [Next Auth](https://next-auth.js.org/): NextAuth.js/Auth.js is a complete open-source authentication solution for Web applications.
- [Auth Prisma Adapter](https://next-auth.js.org/v3/adapters/prisma): Follow the guide to implement next auth adapter for prisma.

## Prod

## Stage
