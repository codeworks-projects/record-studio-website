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
      <div class="relative h-screen bg-black">
        <Video
          videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
        />
        <slot />
      </div>
    </Body>
  </Html>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})

const title = computed(() =>
  t('layouts.title', { title: t((route.meta.title as string) ?? 'TBD') })
)
</script>
