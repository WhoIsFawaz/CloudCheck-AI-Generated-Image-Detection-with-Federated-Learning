// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        Username: 'jdoe',
        Name: 'John Doe',
        Email: 'johndoe@mail.com',
        Password: '$2y$10$nPiCwjsSyRvQsz3JlnEStedKpEQL2uL0/IGlg182VGm0GplXU7zDe', // In production, store hashed passwords
      },
      {
        Username: 'asmith',
        Name: 'Alice Smith',
        Email: 'alicesmith@mail.com',
        Password: '$2y$10$nPiCwjsSyRvQsz3JlnEStedKpEQL2uL0/IGlg182VGm0GplXU7zDe',
      },
      {
        Username: 'bwhite',
        Name: 'Bob White',
        Email: 'bobwhite@mail.com',
        Password: '$2y$10$nPiCwjsSyRvQsz3JlnEStedKpEQL2uL0/IGlg182VGm0GplXU7zDe',
      },
      {
        Username: 'cjones',
        Name: 'Carol Jones',
        Email: 'caroljones@mail.com',
        Password: '$2y$10$nPiCwjsSyRvQsz3JlnEStedKpEQL2uL0/IGlg182VGm0GplXU7zDe',
      },
      {
        Username: 'djohnson',
        Name: 'David Johnson',
        Email: 'davidjohnson@mail.com',
        Password: '$2y$10$nPiCwjsSyRvQsz3JlnEStedKpEQL2uL0/IGlg182VGm0GplXU7zDe',
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
