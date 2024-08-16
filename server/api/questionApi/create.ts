import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log(`body`, body)
    const newUser = await prisma.question.create({
      data: {
        ...body,
      },
    })
    return newUser
  }
  catch (error: any) {
    // 在这里记录错误或进行其他错误处理
    console.error('Error while creating new user:', error.message)
    // 返回具体的错误信息和状态码
    event.res.statusCode = 500 // 服务器错误
    return { message: `Error while creating new user: ${error.message}` }
  }
})
