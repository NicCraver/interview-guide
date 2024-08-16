import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const updatedUser = await prisma.user.update({
    where: { id: body.id },
    data: {
      name: body.name,
      email: body.email,
    },
  })

  return updatedUser
})
