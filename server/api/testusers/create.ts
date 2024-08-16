import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  })

  return newUser
})
