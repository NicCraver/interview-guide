import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { PrismaClient } from '@prisma/client'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

axios.defaults.baseURL = 'http://localhost:3060'

const prisma = new PrismaClient()

async function createUser(name: string, email?: string): Promise<AxiosResponse> {
  return await axios.post('/api/users', {
    name,
    email: email || `${uuidv4()}@test.com`,
  })
}

describe('用户接口测试', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: { endsWith: '@test.com' } },
    })
    await prisma.$disconnect()
  })

  describe('创建用户', () => {
    afterAll(async () => {
      await prisma.user.deleteMany({
        where: { email: { endsWith: '@test.com' } },
      })
    })
    it('应该成功创建用户并返回正确的数据', async () => {
      const name = `TestUser${uuidv4()}`
      const response = await createUser(name)
      expect(response.status).toBe(200)
      expect(response.data.name).toBe(name)
      expect(response.data.email).toMatch(/@test\.com$/)
      expect(response.data.id).toBeDefined()
    })

    it('应该在创建重复邮箱的用户时返回错误', async () => {
      const name = `TestUser${uuidv4()}`
      const email = `${uuidv4()}@test.com`
      await axios.post('/api/users', { name, email })

      await expect(axios.post('/api/users', { name: 'Another User', email }))
        .rejects.toThrow()
    })
  })

  describe('获取用户列表', async () => {
    const totalUsers = 15
    const baseUrl = '/api/users'

    beforeAll(async () => {
      // 创建测试用户
      for (let i = 0; i < totalUsers; i++) {
        await createUser(`TestUser${uuidv4()}`)
      }
    })

    it('应该返回所有用户和总数', async () => {
      const response = await axios.get(baseUrl)
      expect(response.status).toBe(200)
      expect(response.data.data).toBeInstanceOf(Array)
      expect(response.data.data.length).toBe(totalUsers)
      expect(response.data.total).toBe(totalUsers)
    })

    it('应该支持基本分页并返回正确的总数', async () => {
      const limit = 5
      const response1 = await axios.get(`${baseUrl}?limit=${limit}&page=1`)
      const response2 = await axios.get(`${baseUrl}?limit=${limit}&page=2`)
      const response3 = await axios.get(`${baseUrl}?limit=${limit}&page=3`)

      expect(response1.data.data.length).toBe(limit)
      expect(response2.data.data.length).toBe(limit)
      expect(response3.data.data.length).toBe(limit)

      expect(response1.data.data).not.toEqual(response2.data.data)
      expect(response2.data.data).not.toEqual(response3.data.data)
      expect(response1.data.data).not.toEqual(response3.data.data)

      expect(response1.data.pagination.total).toBe(totalUsers)
      expect(response2.data.pagination.total).toBe(totalUsers)
      expect(response3.data.pagination.total).toBe(totalUsers)
    })

    it('应该返回正确的分页信息和总数', async () => {
      const limit = 5
      const response = await axios.get(`${baseUrl}?limit=${limit}&page=2`)

      expect(response.data.pagination).toBeDefined()
      expect(response.data.pagination).toEqual({
        page: 2,
        limit,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      })
    })

    it('应该处理超出范围的页码并返回正确的总数', async () => {
      const response = await axios.get(`${baseUrl}?limit=5&page=100`)

      expect(response.status).toBe(200)
      expect(response.data.data).toBeInstanceOf(Array)
      expect(response.data.data.length).toBe(0)
      expect(response.data.pagination.page).toBe(100)
      expect(response.data.pagination.total).toBe(totalUsers)
    })

    it('应该处理无效的分页参数并返回正确的总数', async () => {
      const response = await axios.get(`${baseUrl}?limit=invalid&page=invalid`)

      expect(response.status).toBe(200)
      expect(response.data.data).toBeInstanceOf(Array)
      expect(response.data.pagination.page).toBe(1)
      expect(response.data.pagination.limit).toBe(10) // 假设默认limit是10
      expect(response.data.pagination.total).toBe(totalUsers)
    })

    it('应该支持自定义排序并返回正确的总数', async () => {
      const response = await axios.get(`${baseUrl}?limit=5&page=1&orderBy=name&order=desc`)

      expect(response.status).toBe(200)
      expect(response.data.data).toBeInstanceOf(Array)
      expect(response.data.data.length).toBe(5)
      expect(response.data.pagination.total).toBe(totalUsers)

      // 检查是否按名称降序排列
      const names = response.data.data.map((user: any) => user.name)
      expect(names).toEqual([...names].sort().reverse())
    })
  })

  describe('获取用户详情', () => {
    it('应该返回指定用户的详细信息', async () => {
      const name = `TestUser${uuidv4()}`
      const createResponse = await createUser(name)
      const userId = createResponse.data.id

      const response = await axios.get(`/api/users?id=${userId}`)
      expect(response.status).toBe(200)
      console.log(`response.data`, response.data)
      expect(response.data.data[0].name).toBe(name)
      expect(response.data.data[0].id).toBe(userId)
    })

    it('查询不存在的用户时应该返回', async () => {
      const response = await axios.get('/api/users?id=999999')
      console.log(`response`, response)
      expect(response.status).toBe(200)
      expect(response.data.data).toEqual([])
    })
  })

  describe('更新用户', () => {
    it('应该成功更新用户信息', async () => {
      const createResponse = await createUser(`TestUser${uuidv4()}`)
      const userId = createResponse.data.id
      const newName = `UpdatedUser${uuidv4()}`
      const updateResponse = await axios.put('/api/users', {
        id: userId,
        name: newName,
        email: createResponse.data.email,
      })

      expect(updateResponse.status).toBe(200)
      expect(updateResponse.data.name).toBe(newName)
      expect(updateResponse.data.id).toBe(userId)
    })

    it('更新不存在的用户时应该返回错误', async () => {
      await expect(axios.put('/api/users', {
        id: '999999',
        name: 'NonExistentUser',
        email: 'nonexistent@test.com',
      })).rejects.toThrow()
    })
  })

  describe('删除用户', () => {
    it('应该成功删除用户', async () => {
      const createResponse = await createUser(`TestUser${uuidv4()}`)
      // console.log(`createResponse`, createResponse)
      const userId = createResponse.data.id

      const deleteResponse = await axios.post('/api/testusers/delete', { id: userId })
      expect(deleteResponse.status).toBe(200)

      const getResponse = await axios.get(`/api/users?id=${userId}`)
      expect(getResponse.status).toBe(200)
      expect(getResponse.data.data).toEqual([])
    })

    it('删除不存在的用户时应该返回错误', async () => {
      await expect(axios.post('/api/testusers/delete', { id: '999999' }))
        .rejects.toThrow()
    })
  })
})
