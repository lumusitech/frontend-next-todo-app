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

## Prisma commands

Rename the .env.template file to.env and replace the placeholder URL with your database connection details, including the username, password, and database name. For this project, we have:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

```bash
npx prisma init
```

### Update Prisma After Schema Changes

After making changes to your Prisma schema (`schema.prisma`), run the following commands:

```bash
npx prisma migrate dev # Apply schema changes to your database.
npx prisma generate # Generate the Prisma Client to reflect schema updates.

## Dependencies

- [Prisma](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Vercel - Next + Prisma](https://vercel.com/guides/nextjs-prisma-postgres)

## Prod

## Stage
```
