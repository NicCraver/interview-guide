const input = `
---
## 什么是闭包（Closure）？请解释其工作原理和用途。

闭包是指一个函数可以访问其词法作用域中的变量，即使该函数在其原始作用域之外被调用。闭包允许函数记住并访问其所在的词法作用域，即使该函数在其他地方执行。闭包常用于数据隐藏、函数工厂和模块模式等场景。即使该函数在其原始作用域之外被调用。闭包允许函数记住并访问其所在的词法作用域，即使该函数在其他地方执行。闭包常用于数据隐藏、函数工厂和模块模式等场景。即使该函数在其原始作用域之外被调用。闭包允许函数记住并访问其所在的词法作用域，即使该函数在其他地方执行。闭包常用于数据隐藏、函数工厂和模块模式等场景。


- difficulty: 3
- categoryName: 'JavaScript'
- questionTypeName: 概念题
- tagNames: JavaScript、函数、中级
---


## 什么是原型链（Prototype Chain）？请解释其工作原理和用途。

原型链是 JavaScript 中实现继承的主要方法。每个对象都有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链。

原型链的工作原理如下：
1. 当试图访问一个对象的属性时，JavaScript 首先在对象本身中查找。
2. 如果没找到，就会继续在对象的原型中查找。
3. 如果还是没找到，就会在原型的原型中查找，直到达到原型链的末端（通常是 Object.prototype）。

原型链的主要用途包括：
1. 实现继承：允许对象继承其他对象的属性和方法。
2. 共享方法：可以在原型上定义方法，所有继承该原型的对象都可以使用这些方法，节省内存。
3. 扩展内置对象：可以通过修改内置对象的原型来添加新的方法。

理解原型链对于深入理解 JavaScript 的对象模型和继承机制至关重要。

--- difficulty: 3
--- categoryName: 'JavaScript'
--- questionTypeName: 概念题
--- tagNames: JavaScript、函数、中级
---`

// export function parseMdToJs(content) {
// }

// parseMdToJs(input)
// // 输出：
//   [
//     {
//       content: '什么是闭包（Closure）？请解释其工作原理和用途。',
//       answer: '闭包是指一个函数可以访问其词法作用域中的变量，即使该函数在其原始作用域之外被调用。闭包允许函数记住并访问其所在的词法作用域，即使该函数在其他地方执行。闭包常用于数据隐藏、函数工厂和模块模式等场景。即使该函数在其原始作用域之外被调用。闭包允许函数记住并访问其所在的词法作用域，即使该函数在其他地方执行。闭包常用于数据隐藏、函数工厂和模块模式等场景。即使该函数在其原始作用域之外被调用。闭包允许函数记住并访问其所在的词法作用域，即使该函数在其他地方执行。闭包常用于数据隐藏、函数工厂和模块模式等场景。',
//       difficulty: 3,
//       categoryName: 'JavaScript',
//       questionTypeName: '概念题',
//       tagNames: ['JavaScript', '闭包', '中级'],
//     },
//     {
//       content: '原型链是什么？请解释其工作原理和用途。',
//       answer: '原型链是指一个对象可以通过其原型链访问其他对象的方法和属性。原型链的工作原理是通过原型对象来继承方法和属性，一层一层、以此类推。原型链的主要用途包括实现继承、共享方法和扩展内置对象。',
//       difficulty: 4,
//       categoryName: 'JavaScript',
//       questionTypeName: '概念题',
//       tagNames: ['JavaScript', '原型', '继承', '中级'],
//     }
//   ]
function parseMdToJs(content) {
  const questions = content.split('---').filter(q => q.trim())
  return questions.map((question) => {
    const [, titleContent, answerContent, ...metaContent] = question.split('##')
    const metadata = Object.fromEntries(
      metaContent.join('').split('\n')
        .filter(line => line.includes(':'))
        .map(line => line.split(':').map(part => part.trim())),
    )

    return {
      content: titleContent.trim(),
      answer: answerContent.trim(),
      difficulty: Number.parseInt(metadata.difficulty),
      categoryName: metadata.categoryName.replace(/'/g, ''),
      questionTypeName: metadata.questionTypeName,
      tagNames: metadata.tagNames.split('、'),
    }
  })
}

console.log(`parseMdToJs(input)`, parseMdToJs(input))
