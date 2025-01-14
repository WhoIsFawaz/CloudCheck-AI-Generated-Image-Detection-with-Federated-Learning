#!/bin/sh

npm install -D typescript ts-node @types/node
npx prisma generate
# npx prisma migrate resolve --applied init
# npx prisma db seed
npm run start:dev