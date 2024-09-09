// server/api/parse-md.post.ts

import { createError, defineEventHandler } from 'h3'
import matter from 'gray-matter'

interface ParsedQuestion {
  content: string
  answer: string
  difficulty: number
  categoryName: string
  questionTypeName: string
  tagNames: string[]
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { content } = body as { content: string }

  if (!content) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必要的内容',
    })
  }

  function parseMdToJs(content: string): ParsedQuestion[] {
    // 使用正则表达式匹配整个问题块，包括元数据
    const questionBlocks = content.split(/---\s*\n/).filter(Boolean)

    return questionBlocks.map((block) => {
      const { data, content: questionContent } = matter(block)
      const lines = questionContent.split('\n').filter(Boolean)
      const questionLine = lines.find(line => line.startsWith('## ')) || ''
      const question = questionLine.replace(/^##\s*/, '').trim()
      const answer = lines.slice(lines.indexOf(questionLine) + 1).join('\n').trim()

      return {
        content: question,
        answer,
        difficulty: data.difficulty || 0,
        categoryName: data.categoryName || '',
        questionTypeName: data.questionTypeName || '',
        tagNames: (data.tagNames as string || '').split('、').map(tag => tag.trim()),
      }
    })
  }

  try {
    const result = parseMdToJs(content)
    return { result }
  }
  catch (error) {
    console.error('解析 Markdown 时出错:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '解析 Markdown 时出错',
      stack: error instanceof Error ? error.stack : undefined,
    })
  }
})
