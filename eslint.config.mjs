// @ts-check
import antfu from '@antfu/eslint-config'

import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(
  antfu(
    {
      formatters: true,
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            type: 'natural',
            groups: [
              ['builtin', 'external'],
              ['internal'],
              ['parent', 'sibling', 'index'],
            ],
            newlinesBetween: 'always',
          },
        ],
      },
    },
  ),
)
