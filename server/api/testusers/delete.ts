import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const deletedUser = await prisma.user.delete({
    where: { id: body.id },
  })

  return deletedUser
})
