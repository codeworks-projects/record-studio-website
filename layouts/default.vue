<template>
  <Html :lang="head.htmlAttrs!.lang" :dir="head.htmlAttrs!.dir">
    <Head>
      <Title>{{ title }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <div class="relative bg-black min-h-screen overflow-x-hidden">
        <Header />
        <slot />
        <Footer />
      </div>

      <ClientOnly>
        <Suspense>
          <CookieBanner />
        </Suspense>
      </ClientOnly>
    </Body>
  </Html>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
// const { $gtm } = useNuxtApp()
// $gtm('test', {
//   parameter1: 'value1',
//   parameter2: 'value2',
// })

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})

const title = computed(() =>
  t('layouts.title', { title: t((route.meta.title as string) ?? 'TBD') })
)
</script>
