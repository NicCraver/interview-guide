/**
 * 自定义语言定义，参考自 https://microsoft.github.io/monaco-editor/monarch.html
 * (采用 Monarch 格式)
 */
export default {
  // 关键字
  keywords: [
    'abstract',
    'continue',
    'for',
    'new',
    'switch',
    'assert',
    'goto',
    'do',
    'if',
    'private',
    'this',
    'break',
    'protected',
    'throw',
    'else',
    'public',
    'enum',
    'return',
    'catch',
    'try',
    'interface',
    'static',
    'class',
    'finally',
    'const',
    'super',
    'while',
    'true',
    'false',
  ],

  // 类型关键字
  typeKeywords: ['boolean', 'double', 'byte', 'int', 'short', 'char', 'void', 'long', 'float'],

  // 运算符
  operators: [
    '=',
    '>',
    '<',
    '!',
    '~',
    '?',
    ':',
    '==',
    '<=',
    '>=',
    '!=',
    '&&',
    '||',
    '++',
    '--',
    '+',
    '-',
    '*',
    '/',
    '&',
    '|',
    '^',
    '%',
    '<<',
    '>>',
    '>>>',
    '+=',
    '-=',
    '*=',
    '/=',
    '&=',
    '|=',
    '^=',
    '%=',
    '<<=',
    '>>=',
    '>>>=',
  ],

  // 符号
  symbols: /[=><!~?:&|+\-*/^%]+/,

  // 转义字符
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  // 主要的标记器定义
  tokenizer: {
    root: [
      // 标识符和关键字
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            '@typeKeywords': 'keyword',
            '@keywords': 'keyword',
            '@default': 'identifier',
          },
        },
      ],
      [/[A-Z][\w$]*/, 'type.identifier'], // 为了美观显示类名

      // 空白字符
      { include: '@whitespace' },

      // 分隔符和运算符
      [/[{}()[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [
        /@symbols/,
        {
          cases: {
            '@operators': 'operator',
            '@default': '',
          },
        },
      ],

      // @ 注解
      [/@\s*[a-z_$][\w$]*/i, { token: 'annotation', log: 'annotation token: $0' }],

      // 数字
      [/\d*\.\d+(e[\-+]?\d+)?/i, 'number.float'],
      [/0x[0-9a-f]+/i, 'number.hex'],
      [/\d+/, 'number'],

      // 分隔符：放在数字后面是因为 .\d 浮点数
      [/[;,.]/, 'delimiter'],

      // 字符串
      [/"([^"\\]|\\.)*$/, 'string.invalid'], // 未终止的字符串
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

      // 字符
      [/'[^\\']'/, 'string'],
      [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
      [/'/, 'string.invalid'],
    ],

    comment: [
      [/[^/*]+/, 'comment'],
      [/\/\*/, 'comment', '@push'], // 嵌套注释
      ['\\*/', 'comment', '@pop'],
      [/[/*]/, 'comment'],
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
    ],
  },
}
