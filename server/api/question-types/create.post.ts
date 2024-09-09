// server/api/question-types/create.post.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await prisma.questionType.create({ data: body })
  }
  catch (error) {
    console.error('创建题目类型失败:', error)
    return { error: '创建题目类型失败' }
  }
})
