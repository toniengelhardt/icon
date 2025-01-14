import {
  defineNuxtModule,
  createResolver,
  addComponent,
  installModule,
} from '@nuxt/kit'

export interface ModuleOptions {}

// Learn how to create a Nuxt module on https://nuxt.com/docs/guide/going-further/modules/
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-icon',
    configKey: 'icon',
    compatibility: {
      nuxt: '^3.0.0-rc.9',
    },
  },
  defaults: {},
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Define types for the app.config compatible with Nuxt Studio
    nuxt.hook('schema:extend', (schemas) => {
      schemas.push({
        appConfig: {
          nuxtIcon: {
            $schema: {
              title: 'Nuxt Icon',
              description: 'Configure the defaults of Nuxt Icon'
            },
            size: {
              $default: '',
              $schema: {
                title: 'Icon Size',
                description: 'Set the default icon size',
                tags: ['@studioIcon material-symbols:format-size-rounded'],
              },
            },
            class: {
              $default: '',
              $schema: {
                title: 'CSS Class',
                description: 'Set the default CSS class',
                tags: ['@studioIcon material-symbols:css'],
              },
            },
            aliases: {
              $default: {},
              $schema: {
                title: 'Icon aliases',
                description: 'Define Icon aliases to update them easily without code changes.',
                tags: [
                  '@studioIcon material-symbols:star-rounded',
                  '@studioInputObjectValueType icon'
                ],
                tsType: '{ [alias: string]: string }',
              },
            },
          },
        },
      })
    })

    installModule('nuxt-config-schema')

    addComponent({
      name: 'Icon',
      global: true,
      filePath: resolve('./runtime/Icon.vue'),
    })
  },
})
