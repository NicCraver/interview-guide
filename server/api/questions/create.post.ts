import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log('收到的创建题目请求数据:', body)

    // 验证必要字段
    if (!body.content || !body.answer || !body.difficulty || !body.categoryId || !body.questionTypeId || !body.tagIds || !body.tips) {
      throw new Error('缺少必要字段')
    }

    // 验证外键关系
    const category = await prisma.category.findUnique({ where: { id: body.categoryId } })
    if (!category)
      throw new Error('指定的分类不存在')

    const questionType = await prisma.questionType.findUnique({ where: { id: body.questionTypeId } })
    if (!questionType)
      throw new Error('指定的题目类型不存在')

    for (const tagId of body.tagIds) {
      const tag = await prisma.tag.findUnique({ where: { id: tagId } })
      if (!tag)
        throw new Error(`指定的标签 ID ${tagId} 不存在`)
    }

    const question = await prisma.question.create({
      data: {
        content: body.content,
        answer: body.answer,
        difficulty: body.difficulty,
        category: { connect: { id: body.categoryId } },
        questionType: { connect: { id: body.questionTypeId } },
        tips: body.tips,
        tags: {
          create: body.tagIds.map((tagId: number) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: {
        category: true,
        questionType: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    console.log('成功创建的题目:', question)
    return question
  }
  catch (error: any) {
    console.error('创建题目失败:', error)
    return createError({
      statusCode: 400,
      message: error.message,
    })
  }
  finally {
    await prisma.$disconnect()
  }
})
