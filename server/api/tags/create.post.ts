import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await prisma.tag.create({ data: body })
  }
  catch (error) {
    console.error('创建标签失败:', error)
    return { error: '创建标签失败' }
  }
})
