<template>
  <main class="main">
    <section id="contacts" class="contacts-section center">
      <H tag="h1" class="contacts-title">{{ $t('pg.contacts.title') }}</H>
      <div class="contacts-ct">
        <Motion
          v-for="(contact, i) in contacts"
          tag="a"
          :href="contact.link"
          target="_blank"
          class="contact-item clickable"
          :initial="SLIDE_RIGHT.INITIAL"
          :in-view="SLIDE_RIGHT.IN_VIEW"
          :transition="{ ...TRANSITION.DEFAULT, delay: i / 10 }"
        >
          <H :animated="false" tag="h3" class="contact-item-title">{{ contact.title }}</H>
          <P :animated="false" class="contact-item-content">{{ contact.content }}</P>
        </Motion>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { SLIDE_RIGHT, TRANSITION } from '../../animations.config.json'
const { t } = useI18n()

const contacts = [
  {
    title: t('common.email'),
    content: t('contacts.email', { at: '@' }),
    link: `mailto:${t('contacts.email', { at: '@' })}`,
  },
  {
    title: t('common.address'),
    content: t('contacts.legalStreet'),
    link: 'https://maps.app.goo.gl/B2YwxdKFjfzSWt7i7',
  },
  { title: t('common.phone'), content: t('contacts.phone'), link: `tel:${t('contacts.phone')}` },
  {
    title: t('common.instagram'),
    content: t('contacts.instagram', { at: '@' }),
    link: 'https://www.instagram.com/record_studio_/',
  },
  {
    title: t('common.youtube'),
    content: t('contacts.youtube', { at: '@' }),
    link: 'https://www.youtube.com/@recordstudio5140',
  },
]

useHead({
  title: t('contacts.companySimpleName') + ' | ' + t('pg.contacts.meta.title'),
  meta: [{ name: 'description', content: t('pg.contacts.meta.description') }],
})
</script>

<style lang="postcss" scoped>
.main {
  @apply pt-56;

  & .contacts-section {
    @apply space-y-10;

    & .contacts-title {
      @apply uppercase;
    }

    & .contacts-ct {
      @apply flex flex-col gap-10;

      .contact-item {
        @apply flex flex-col font-bold -space-y-2;

        & .contact-item-title {
          @apply uppercase;
        }
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  .main {
    & .contacts-section {
      & .contacts-ct {
        & .contacts-row {
          @apply flex-col gap-3;
        }
      }
    }
  }
}
</style>
