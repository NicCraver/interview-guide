import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await prisma.category.create({ data: body })
  }
  catch (error) {
    console.error('创建分类失败:', error)
    return { error: '创建分类失败' }
  }
})
