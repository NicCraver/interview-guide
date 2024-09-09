import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    return await prisma.tag.findMany()
  }
  catch (error) {
    console.error('获取标签失败:', error)
    return { error: '获取标签失败' }
  }
})
