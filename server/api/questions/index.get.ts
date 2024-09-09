import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    return await prisma.question.findMany({
      include: {
        category: true,
        questionType: true,
        tags: { include: { tag: true } },
      },
      orderBy: {
        createdAt: 'desc', // Sort by creation time in descending order (newest first)
      },
    })
  }
  catch (error) {
    console.error('获取题目失败:', error)
    return { error: '获取题目失败' }
  }
})
