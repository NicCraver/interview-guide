// @ts-check
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(
  // @ts-ignore
  antfu(
    {
      formatters: true,
      rules: {
        'no-console': 'off',
      },
    },
  ),
)
