import { PrismaClient } from '@prisma/client'
import { defineEventHandler, getQuery } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (query.id) {
    // 获取单个用户
    const user = await prisma.user.findUnique({
      where: { id: Number.parseInt(query.id as string) },
    })
    return user
  }
  else {
    // 获取所有用户
    const users = await prisma.user.findMany()
    return users
  }
})
