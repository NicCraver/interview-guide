# 面试宝典 interview-guide

## 核心功能

- 面试刷题
  - 可以根据薄弱的知识点进行刷题推荐
- 面试题库
- 测验
- 错题集
- 标记学会了
- 题目收藏
- 题目搜索

您的 Prisma schema 设计非常不错，它涵盖了技术面试题宝典项目的核心功能，并且结构清晰。让我分析一下这个设计的优点和可能的改进点：
优点：

使用 UUID 作为 User 表的主键，提高了安全性和唯一性。
分离了 Category 和 QuestionType，允许更灵活的题目分类。
UserQuestionState 模型很好地捕捉了用户与题目之间的关系。
Quiz 和 QuizQuestion 模型设计合理，支持测验功能。
使用了适当的关系类型（一对多、多对多）。

可能的改进点：

考虑添加索引以优化查询性能，特别是对于经常查询的字段。
可以添加一个 Tag 模型，用于更灵活的题目标记和搜索。
考虑添加一个错题集模型，方便用户快速复习错误的题目。
可以在 User 模型中添加一些统计字段，如总分、完成题目数等。

基于这些考虑，我建议对您的 schema 做一些小的调整和添加。以下是修改后的版本：
Updated Prisma Schema for Interview Question BankClick to open code
主要的改动和添加包括：

1. 在 User 模型中添加了 totalScore 和 completedQuestions 字段，用于跟踪用户的整体进度。添加了 Tag 和 TagsOnQuestions 模型，支持更灵活的题目标记和搜索。
2. 在 UserQuestionState 模型中添加了 lastAttemptAt 字段，记录最后尝试时间。添加了 ErrorCollection 模型，用于管理用户的错题集。
3. 在 Question 模型中为 categoryId 和 questionTypeId 添加了复合索引，优化查询性能。
4. 在 UserQuestionState 模型中为 userId 和 status 添加了索引，方便按用户和状态快速查询。
5. 在 Quiz 模型中添加了 createdAt 字段，记录测验创建时间。

这些改动使得数据模型更加完善，能够更好地支持您描述的核心功能，如面试刷题、根据薄弱知识点推荐、错题集、标记学会等。同时，新增的索引和统计字段将有助于提高查询性能和用户体验。
您对这些修改有什么看法？是否还有其他功能或需求需要在数据模型中体现？

## 接口

- [ ] 题目列表

## TO DO

- [ ] 完善题目数量 50道题
- [ ] 题目录入工具
- [ ] 完善题库数据结构
- [ ] 题目类型
- [ ] 题目难度
- [ ] 题目来源
- [ ] 题目标签
- [ ] 题目答案
- [ ] 题目解析
- [ ] 题目选项
- [ ] 题目题干
- [ ] 题目ID
- [ ] 题目创建时间
- [ ] 题目更新时间
- [ ] 题目所属科目
- [ ] 题目所属章节
- [ ] 题目所属知识点
- [ ] 题目所属题库
- [ ] 集成代码编辑器Monaco https://microsoft.github.io/monaco-editor/
- [ ] Monaco多语言支持
- [ ] Monaco主题切换
- [ ] Monaco代码高亮
- [ ] Monaco代码折叠
- [ ] Monaco代码自动补全
- [ ] Monaco代码格式化

## 题库管理

- [ ] 题库列表
- [ ] 题库详情
- [ ] 题库编辑
- [ ] 题库删除
- [ ] 题库导入
- [ ] 题库导出

## 题目管理

- [ ] 题目列表
- [ ] 题目详情
- [ ] 题目编辑
- [ ] 题目删除
- [ ] 题目导入
- [ ] 题目导出

## 用户管理

- [ ] 用户列表
- [ ] 用户详情
- [ ] 用户编辑
- [ ] 用户删除
- [ ] 用户导入
- [ ] 用户导出

## 权限管理

- [ ] 角色列表
- [ ] 角色详情
- [ ] 角色编辑
- [ ] 角色删除
- [ ] 角色导入
- [ ] 角色导出

## 日志管理

- [ ] 日志列表
- [ ] 日志详情
- [ ] 日志编辑
- [ ] 日志删除
- [ ] 日志导入
- [ ] 日志导出

## 系统设置

- [ ] 系统设置列表
- [ ] 系统设置详情
- [ ] 系统设置编辑
- [ ] 系统设置删除
- [ ] 系统设置导入
- [ ] 系统设置导出

## 其他

## To Do

- [x] 提交代码能够自动更新题库
- [ ] 题目创建脚本

### node脚本

- [ ] 1. 编写node脚本
- [ ] 2. 完成createInterviewQuestion函数的脚本
- [ ] 3. 编写数据库操作相关代码
- [ ] 4. 创建题目内容、答案、难度、分类、标签、提示等代码。
- [ ] 5. 数据插入到数据库
- [ ] 6. 编写AI解析函数
- [ ] 7. 创建AI解析表并关联题目表
- [ ] 8. 将AI结果插入到AI解析表中
- [ ] 9. 查询题目表和AI解析表

- [ ] SEO /Users/nic/Downloads/iShot_2024-09-09_14.00.06.png

## 创建题目流程

components/test-com/manageQuestions.vue

```js
createInterviewQuestion({
  content: '操作数组的方法有哪些？哪些方法会改变原数组？',
  answer: `- 操作数组的方法有:`,
  difficulty: 5,
  categoryName: 'JavaScript',
  questionTypeName: '数组操作',
  tagNames: ['JavaScript', '数组', '方法', '原数组'],
  tips: [
    '熟悉数组常用方法及其功能，尤其是如何操作原数组和不操作原数组的方法。',
    '注意区分哪些方法会改变原数组的内容，哪些方法会返回新数组。',
    '理解每个数组方法的作用和它们对数组的影响，例如 push() 和 pop() 会改变原数组，而 slice() 和 map() 不会。',
  ],
})
```

使用该方法创建题目及其相关信息，包括题目内容、答案、难度、分类、标签、提示等。

第一 使用ai生成代码，后使用脚本导入题目

<!-- 提示词拿到createInterviewQuestion，在通过脚本导入题目 -->

```md
我会发给你一段markdown格式的文本，内容是面试题的标题和答案，我需要你转出json格式，并按照以下格式输出：

createInterviewQuestion({
content: '行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？行内元素和块级元素有什么区别？',
answer: `- 行内元素：a、span、img、input、strong、label、select、textarea、button

- 块级元素：div、p、h1-h6、ul、ol、li、dl、dt、dd、table、form
- 空元素：br、hr、img、input、link、meta
- 区别：
  - 布局：块级元素会占满更多的空间（通常是一整行），而行内元素只占用它们所需的空间。
  - 可嵌套性：块级元素可以包含行内元素和其他块级元素，但行内元素通常不能包含块级元素（尽管有些情况下可以，如在HTML5中，<a>可以包含块级元素）。
  - 默认行为：块级元素会在前后自动添加换行，而行内元素则不会。`,
    difficulty: 4,
    categoryName: 'HTML',
    questionTypeName: '元素分类',
    tagNames: ['HTML', '行内元素', '块级元素', '空元素'],
    tips: [
    '行内元素通常用于标记小范围的内容，像链接和图片。',
    '块级元素用于创建文档的主要结构部分，像段落和标题。',
    '空元素不包含任何内容，它们用来创建空白或分隔符，如换行或水平线。'
    ],
    examCenter:[]
    })
    其中:

1. difficulty（1-10）、categoryName、questionTypeName、tagNames由你根据内容总结
2. answer的内容需要你从markdown中提取出来并且保留markdown的格式，回车不要用\n,直接使用``语法把内容包裹即可。记得保留answer的markdown格式！记得保留answer的markdown格式！记得保留answer的markdown格式！
3. answer过长时，需要你帮我换行，每行不要超过55个中文字符
4. tips字段是向做题者提供一些提示，帮助做题者理解题目，你可以分几步（不要少于3步）提示做题者， 可以提供一些答案作为提示。注意tips是提示做题者答题的，可以提供一些答案作为例子。提示要直接、精炼、简介、准确、易懂。tips是为了答对answer，尽量和answer内容相关，不要提供无用的内容。

这是我给你发的第一段文字，
```

第二 components/Deepseek.vue 使用ai生成扩展内容 丰富内容

## 题目通过PR合并上传到题库

1. 创建临时题目表
2. 脚本将题目导入临时表
3. 将临时表数据导入正式表
4. 删除临时表数据
