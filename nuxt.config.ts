export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/supabase',
        'nuxt-lucide-icons',
        'shadcn-nuxt',
    ],
    supabase: {
        redirect: false,
    },
    app: {
        head: {
            bodyAttrs: {
                class: 'dark',
            },
        },
    },
    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },
    lucide: {
        namePrefix: 'Icon',
    },
    css: [
        '~/assets/styles/base.scss',
        '~/assets/styles/main.scss',
    ],
});
