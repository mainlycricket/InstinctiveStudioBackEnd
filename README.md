- Make migrations

```sh
dotenvx run -- npx prisma migrate dev --schema ./config/prisma/schema.prisma --name init
```

- Seed Data

```sh
dotenvx run -- npx prisma generate --schema ./config/prisma/schema.prisma && node ./config/prisma/seed.js
```
