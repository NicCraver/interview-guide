// server/api/question-types/index.get.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    return await prisma.questionType.findMany()
  }
  catch (error) {
    console.error('获取题目类型失败:', error)
    return { error: '获取题目类型失败' }
  }
})
