// 在前端面试题中，题目类型通常可以分为以下几种主要类型

// 选择题（Multiple Choice Questions, MCQ）

// 判断题（True/False Questions）

// 填空题（Fill-in-the-Blank Questions）

// 简答题（Short Answer Questions）

// 编程题（Coding Questions）

// 代码阅读题（Code Comprehension Questions）

// 设计题（Design Questions）

// 逻辑题和算法题（Logic and Algorithm Questions）
// type questionTypeTypes = 'multiple-choice' | 'true-false' | 'fill-in-the-blank' | 'short-answer' | 'coding' | 'code-comprehension' | 'design' | 'logic' | 'algorithm'
// type knowledge = 'CSS' | 'JavaScript' | 'HTML' | 'Vue' | 'React' | 'Node.js' | 'Webpack' | 'TypeScript' | 'Git' | '其他'

const list: any = [
  {
    id: 1,
    question: '行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？行内元素和块级元素有什么区别？',
    options: '',
    answer: `● 行内元素有：a b span img input select strong等。
● 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4等标题标签、p 段落标签等。
● 空元素（void元素）是指没有内容的HTML元素。常见的空元素包括：<br> 换行元素、<hr> 水平线元素、<img> 图片元素、<input> 输入框元素、<link> 样式表引用元素、<meta> 元数据元素等。
● 行内元素不可以设置宽高，不独占一行，它们会按照从左到右的顺序排列，并尽可能占据内容所需的空间。
● 块级元素可以设置宽高，独占一行，会自动换行。块级元素会在页面上以独立的块形式展现，并占据其父元素的整个宽度。
`,
    type: 'short-answer',
    // 题目所属知识点
    knowledge: 'CSS',
  },
]

export default defineEventHandler(() => {
  return {
    data: list,
  }
})
