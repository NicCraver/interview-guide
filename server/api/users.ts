import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { defineEventHandler, getQuery } from 'h3'
import _ from 'lodash'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    switch (event.method) {
      case 'GET':
      {
        const query = JSON.parse(JSON.stringify(getQuery(event)))
        console.log(`query`, query)
        if (_.isEmpty(query)) {
          // 如果没有查询参数，返回所有用户和总数
          const [users, total] = await Promise.all([
            prisma.user.findMany(),
            prisma.user.count(),
          ])
          return { data: users, total }
        }

        // 处理分页
        const page = Number(query.page) || 1
        const limit = Number(query.limit) || 10
        const skip = (page - 1) * limit

        // 处理排序
        let orderBy: Prisma.UserOrderByWithRelationInput = { id: 'asc' }
        if (query.orderBy && typeof query.orderBy === 'string') {
          const order = (query.order as Prisma.SortOrder) || 'asc'
          orderBy = { [query.orderBy]: order }
        }
        // 处理query 参数 只允许查询 id name email createdAt updatedAt
        const allowedQueryFields = ['id', 'name', 'email', 'createdAt', 'updatedAt']
        const filteredQuery = _.pickBy(query, (value, key) => allowedQueryFields.includes(key))

        // 执行查询
        const [data, total] = await Promise.all([
          prisma.user.findMany({
            where: {
              ...filteredQuery,
            },
            skip,
            take: limit,
            orderBy,
          }),
          prisma.user.count(), // 获取总数
        ])
        return {
          data,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        }
      }
      case 'POST':
      {
        const body = await readBody(event)
        return await prisma.user.create({ data: body })
      }
      case 'PUT':
      {
        const bodyPut = await readBody(event)
        return await prisma.user.update({ where: { id: bodyPut.id }, data: bodyPut })
      }
      default:
        return { message: 'Method not supported' }
    }
  }
  catch (error: any) {
    console.error('Error in user API:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: { message: error.message },
    })
  }
})
