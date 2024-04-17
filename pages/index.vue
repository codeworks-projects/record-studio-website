<template>
  <main>
    <header>
      <Icon name="logo" />
    </header>
    <article>
      <H tag="h2" class="font-bold">{{ $t('pg.home.comingSoon') }}</H>
      <P>{{ $t('pg.home.comingSoonDescription') }}</P>
      <Motion
        :initial="SLIDE_UP.INITIAL"
        :in-view="SLIDE_UP.IN_VIEW"
        :transition="TRANSITION.DEFAULT"
        tag="div"
        class="cta-ct"
      >
        <button
          class="clickable"
          @click="
            navigateTo(`mailto:${$t('contacts.email', { at: '@' })}`, {
              external: true,
            })
          "
        >
          {{ $t('common.contactUs') }}
        </button>
        <div class="social">
          <a class="social-icon clickable" href="https://www.youtube.com/@recordstudio5140">
            <Icon class="w-[21px] h-[14px]" name="youtube" />
          </a>
          <a class="social-icon clickable" href="https://www.instagram.com/record_studio_/">
            <Icon class="w-[14px] h-[14px]" name="instagram" />
          </a>
          <a
            class="social-icon clickable"
            href="https://www.facebook.com/people/Record-Studio/100037660705926/"
          >
            <Icon class="w-[7px] h-[13px]" name="facebook" />
          </a>
          <a class="social-icon clickable" href="https://www.linkedin.com/company/recordstudio/">
            <Icon class="w-[21px] h-[14px]" name="linkedin" />
          </a>
        </div>
      </Motion>
    </article>

    <footer>
      {{ $t('contacts.companyName') }} • {{ $t('contacts.legalStreet') }} •
      {{ $t('contacts.email', { at: '@' }) }} • {{ $t('common.vat') }}
      {{ $t('contacts.vatNumber') }}
    </footer>
  </main>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'
const { t } = useI18n()

// Head
useHead({
  title: t('contacts.companySimpleName') + ' | ' + t('pg.home.meta.title'),
  meta: [{ name: 'description', content: t('pg.home.meta.description') }],
})
</script>

<style lang="postcss" scoped>
main {
  @apply h-full;

  header {
    @apply fixed top-0 left-0 right-0 py-10 flex items-center justify-center;

    & svg {
      @apply h-8;
    }
  }

  article {
    @apply w-full h-full text-white flex flex-col gap-4 items-center justify-center leading-none text-center px-10;

    & h2 {
      @apply !text-4xl;
    }

    & p {
      @apply text-lg !max-w-[450px];
    }

    & .cta-ct {
      @apply z-10 flex flex-col gap-5;

      & button {
        @apply bg-white text-black uppercase font-bold px-5 py-2 rounded-xl mt-10;
      }

      & .social {
        @apply flex gap-2 justify-between;

        & .social-icon {
          @apply bg-white flex items-center justify-center text-black w-[29px] h-[29px] rounded-full;
        }
      }
    }
  }

  footer {
    @apply fixed bottom-0 left-0 right-0 py-10 flex items-center justify-center text-grey font-medium text-xs mx-10 text-center;
  }
}
</style>
