import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    return await prisma.category.findMany()
  }
  catch (error) {
    console.error('获取分类失败:', error)
    return { error: '获取分类失败' }
  }
})
