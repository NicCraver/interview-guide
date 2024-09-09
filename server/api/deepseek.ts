import process from 'node:process'
import OpenAI from 'openai'
import { encode } from 'gpt-3-encoder' // 用于计算 token 数量的库

export default defineEventHandler(async (event) => {
  const body = await readBody(event) // 获取请求体中的数据
  const { prompt } = body // 从请求体中获取 prompt

  // Initialize the OpenAI instance with the custom base URL and API key from runtime config
  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEP_SEEK_API_KEY,
  })

  const maxTokensPerRequest = 1000 // 设置每次请求的最大 tokens
  const promptTokens = encode(prompt).length // 计算输入的 token 数量

  let finalResponse = '' // 用于存储最终的组合结果

  if (promptTokens > maxTokensPerRequest) {
    // 如果输入超过了最大 tokens，则分段处理
    const segments = splitPromptIntoSegments(prompt, maxTokensPerRequest)

    for (const segment of segments) {
      const stream = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: segment }],
        max_tokens: 1000,
        stream: true, // 启用流式处理
      })

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''
        finalResponse += content // 组合每个响应内容
        // process.stdout.write(content) // 打印到控制台
      }
    }
  }
  else {
    // 如果输入不超过限制，直接发送请求
    const stream = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      stream: true,
    })

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      finalResponse += content
      // process.stdout.write(content)
    }
  }

  return finalResponse // 返回最终结果
})

// 辅助函数：根据 token 限制将长文本分段
function splitPromptIntoSegments(prompt: any, maxTokens: any) {
  const words = prompt.split(' ')
  const segments = []
  let segment = ''

  for (const word of words) {
    if (encode(`${segment} ${word}`).length > maxTokens) {
      segments.push(segment)
      segment = word
    }
    else {
      segment += ` ${word}`
    }
  }

  segments.push(segment)
  return segments
}
