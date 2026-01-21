/** @type {import('plop').NodePlopAPI} */
export default function (plop) {
  // Feature generator
  plop.setGenerator('feature', {
    description: 'Create a new feature module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Feature name (e.g., "products", "user-settings"):',
        validate: (value) => {
          if (!value) return 'Feature name is required'
          if (!/^[a-z]+(-[a-z]+)*$/.test(value)) {
            return 'Feature name must be kebab-case (e.g., "my-feature")'
          }
          return true
        },
      },
      {
        type: 'confirm',
        name: 'hasApi',
        message: 'Does this feature need API integration?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'hasStore',
        message: 'Does this feature need local state (Zustand store)?',
        default: false,
      },
    ],
    actions: (data) => {
      const actions = [
        // Create index.ts (barrel export)
        {
          type: 'add',
          path: 'src/features/{{dashCase name}}/index.ts',
          templateFile: 'plop-templates/feature/index.ts.hbs',
        },
        // Create types
        {
          type: 'add',
          path: 'src/features/{{dashCase name}}/types/index.ts',
          templateFile: 'plop-templates/feature/types/index.ts.hbs',
        },
        // Create page
        {
          type: 'add',
          path: 'src/features/{{dashCase name}}/pages/{{pascalCase name}}Page.tsx',
          templateFile: 'plop-templates/feature/pages/Page.tsx.hbs',
        },
        // Create pages index
        {
          type: 'add',
          path: 'src/features/{{dashCase name}}/pages/index.ts',
          templateFile: 'plop-templates/feature/pages/index.ts.hbs',
        },
        // Create components index
        {
          type: 'add',
          path: 'src/features/{{dashCase name}}/components/index.ts',
          template: '// Export feature components here\n',
        },
        // Create i18n file
        {
          type: 'add',
          path: 'src/i18n/locales/en/{{dashCase name}}.json',
          templateFile: 'plop-templates/feature/i18n.json.hbs',
        },
        {
          type: 'add',
          path: 'src/i18n/locales/tr/{{dashCase name}}.json',
          templateFile: 'plop-templates/feature/i18n.json.hbs',
        },
      ]

      // Add API files if needed
      if (data.hasApi) {
        actions.push(
          {
            type: 'add',
            path: 'src/features/{{dashCase name}}/api/queries.ts',
            templateFile: 'plop-templates/feature/api/queries.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/features/{{dashCase name}}/api/mutations.ts',
            templateFile: 'plop-templates/feature/api/mutations.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/features/{{dashCase name}}/api/index.ts',
            templateFile: 'plop-templates/feature/api/index.ts.hbs',
          }
        )
      }

      // Add store if needed
      if (data.hasStore) {
        actions.push({
          type: 'add',
          path: 'src/features/{{dashCase name}}/store/index.ts',
          templateFile: 'plop-templates/feature/store/index.ts.hbs',
        })
      }

      return actions
    },
  })

  // Component generator
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'list',
        name: 'location',
        message: 'Where should this component be created?',
        choices: [
          { name: 'Core UI (shared across app)', value: 'core' },
          { name: 'Feature component', value: 'feature' },
        ],
      },
      {
        type: 'input',
        name: 'featureName',
        message: 'Feature name:',
        when: (answers) => answers.location === 'feature',
        validate: (value) => (value ? true : 'Feature name is required'),
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
        validate: (value) => {
          if (!value) return 'Component name is required'
          if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
            return 'Component name must be PascalCase (e.g., "MyComponent")'
          }
          return true
        },
      },
    ],
    actions: (data) => {
      const basePath =
        data.location === 'core'
          ? 'src/core/ui/components'
          : `src/features/${data.featureName}/components`

      return [
        {
          type: 'add',
          path: `${basePath}/{{pascalCase name}}.tsx`,
          templateFile: 'plop-templates/component/Component.tsx.hbs',
        },
      ]
    },
  })

  // Hook generator
  plop.setGenerator('hook', {
    description: 'Create a new custom hook',
    prompts: [
      {
        type: 'list',
        name: 'location',
        message: 'Where should this hook be created?',
        choices: [
          { name: 'Shared hooks', value: 'shared' },
          { name: 'Feature hook', value: 'feature' },
        ],
      },
      {
        type: 'input',
        name: 'featureName',
        message: 'Feature name:',
        when: (answers) => answers.location === 'feature',
        validate: (value) => (value ? true : 'Feature name is required'),
      },
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (without "use" prefix):',
        validate: (value) => {
          if (!value) return 'Hook name is required'
          if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
            return 'Hook name must be PascalCase (e.g., "LocalStorage")'
          }
          return true
        },
      },
    ],
    actions: (data) => {
      const basePath =
        data.location === 'shared'
          ? 'src/shared/hooks'
          : `src/features/${data.featureName}/hooks`

      return [
        {
          type: 'add',
          path: `${basePath}/use{{pascalCase name}}.ts`,
          templateFile: 'plop-templates/hook/useHook.ts.hbs',
        },
      ]
    },
  })
}
