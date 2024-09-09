import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3060'

const prisma = new PrismaClient()

describe('删除数据测试', () => {
  beforeAll(async () => {
    // 连接到测试数据库
    await prisma.$connect()
  })

  beforeEach(async () => {
    // 在每个测试之前清理数据库
    const modelNames = Object.keys(prisma).filter(key => key[0] !== '_')
    console.log(`modelNames`, modelNames)
    // // 清理数据之前删除依赖项
    // await prisma.tagsOnQuestions.deleteMany({})
    // await prisma.quizQuestion.deleteMany({})
    // await prisma.quiz.deleteMany({})
    // await prisma.userQuestionState.deleteMany({})
    // await prisma.errorCollection.deleteMany({})

    // // 删除没有外键依赖的表
    // await prisma.user.deleteMany({})
    // await prisma.question.deleteMany({})
    // await prisma.category.deleteMany({})
    // await prisma.questionType.deleteMany({})
    // await prisma.tag.deleteMany({})
    //     'user',
    //   'question',
    //   'category',
    //   'questionType',
    //   'userQuestionState',
    //   'quiz',
    //   'quizQuestion',
    //   'tag',
    //   'tagsOnQuestions',
    //   'errorCollection',
  })

  afterAll(async () => {
    // 断开数据库连接
    await prisma.$disconnect()
  })

  it('获取用户列表', async () => {
    const response = await axios.get('/api/users')
    expect(response.status).toBe(200)
    expect(response.data.data).toBeInstanceOf(Array)
  })
})
