import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { config } from 'dotenv'
import OpenAI from 'openai'
import { encode } from 'gpt-3-encoder'

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 加载.env文件
config({ path: join(__dirname, '..', '.env') })

// 检查并打印环境变量
console.log('DEEP_SEEK_API_KEY:', process.env.DEEP_SEEK_API_KEY ? '已设置' : '未设置')

// 初始化OpenAI实例
let openai
try {
  openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEP_SEEK_API_KEY,
  })
}
catch (error) {
  console.error('初始化 OpenAI 实例时出错:', error.message)
  process.exit(1)
}

const maxTokensPerRequest = 1000 // 设置每次请求的最大tokens

// 辅助函数：根据token限制将长文本分段
function splitPromptIntoSegments(prompt, maxTokens) {
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

async function processPrompt(prompt) {
  let finalResponse = '' // 用于存储最终的组合结果
  const promptTokens = encode(prompt).length // 计算输入的token数量

  console.log(`处理prompt，长度为 ${promptTokens} tokens`)

  if (promptTokens > maxTokensPerRequest) {
    console.log('prompt超过最大token限制，进行分段处理')
    // 如果输入超过了最大tokens，则分段处理
    const segments = splitPromptIntoSegments(prompt, maxTokensPerRequest)

    for (const segment of segments) {
      console.log(`处理分段，长度为 ${encode(segment).length} tokens`)
      try {
        const stream = await openai.chat.completions.create({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: segment }],
          max_tokens: 1000,
          stream: true, // 启用流式处理
        })

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || ''
          finalResponse += content // 组合每个响应内容
          process.stdout.write(content) // 打印到控制台
        }
      }
      catch (error) {
        console.error('API 调用出错:', error.message)
        throw error
      }
    }
  }
  else {
    console.log('直接处理完整prompt')
    // 如果输入不超过限制，直接发送请求
    try {
      const stream = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        stream: true,
      })

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''
        finalResponse += content
        process.stdout.write(content)
      }
    }
    catch (error) {
      console.error('API 调用出错:', error.message)
      throw error
    }
  }

  return finalResponse // 返回最终结果
}

// 主函数
async function main() {
  const prompt = '你好' // 从命令行参数获取prompt
  if (!prompt) {
    console.error('请提供一个prompt作为命令行参数')
    process.exit(1)
  }

  try {
    const result = await processPrompt(prompt)
    console.log('\n最终结果:', result)
  }
  catch (error) {
    console.error('处理过程中出错:', error)
  }
}

main()
