import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { PrismaClient } from '@prisma/client'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

axios.defaults.baseURL = 'http://localhost:3060'

const prisma = new PrismaClient()

async function createUser(name: string): Promise<AxiosResponse> {
  return await axios.post('/api/users', {
    name,
    email: `${uuidv4()}@test.com`,
  })
}

describe('用户接口测试', () => {
  beforeAll(async () => {
    // 连接到测试数据库
    await prisma.$connect()
  })

  beforeEach(async () => {
    // 在每个测试之前清理数据库
    await prisma.user.deleteMany({
      where: { email: { endsWith: '@test.com' } },
    })
  })

  afterAll(async () => {
    // 断开数据库连接
    await prisma.$disconnect()
  })

  it('创建用户', async () => {
    const name = `TestUser${uuidv4()}`
    const response = await createUser(name)
    expect(response.status).toBe(200)
    expect(response.data.name).toBe(name)
  })

  it('获取用户列表', async () => {
    const response = await axios.get('/api/users')
    expect(response.status).toBe(200)
    expect(response.data.data).toBeInstanceOf(Array)
  })

  it('获取用户详情', async () => {
    const name = `TestUser${uuidv4()}`
    await createUser(name)
    const response = await axios.get(`/api/users?name=${name}`)
    expect(response.status).toBe(200)
    expect(response.data.data[0].name).toBe(name)
  })

  it('更新用户', async () => {
    const name = `TestUser${uuidv4()}`
    const response = await createUser(name)
    const id = response.data.id
    const newName = `UpdatedUser${uuidv4()}`
    const updateResponse = await axios.put(`/api/users`, {
      id,
      name: newName,
      email: response.data.email,
    })
    expect(updateResponse.status).toBe(200)
    expect(updateResponse.data.name).toBe(newName)
  })

  it('删除用户', async () => {
    const name = `TestUser${uuidv4()}`
    const response = await createUser(name)
    const id = response.data.id
    console.log(`response.status`, response.status)
    console.log(`id`, id)
    const deleteResponse = await axios(`/api/testusers/delete`, {
      method: 'POST',
      data: {
        id,
      },
    })
    // console.log(`deleteResponse`, deleteResponse)
    expect(deleteResponse.status).toBe(200)
    const getResponse = await axios.get(`/api/users?id=${id}`)
    console.log(`getResponse`, getResponse)
    expect(getResponse.data.data.length).toBe(0)
  })
})
