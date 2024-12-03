<template>
  <footer class="footer">
    <div class="footer-line" />
    <NuxtLink class="logo-ct clickable" :to="localePath('/')">
      <Icon name="logo" />
    </NuxtLink>
    <div class="info-ct">
      <div class="footer-info company-ct">
        <H :animated="false" tag="h5">{{ $t('contacts.companyLegalName') }}</H>
        <div class="info">
          <p>{{ $t('contacts.legalStreet') }}</p>
          <p>{{ $t('common.vat') }}: {{ $t('contacts.vat') }}</p>
          <p>{{ $t('common.sdi') }}: {{ $t('contacts.sdi') }}</p>
        </div>
      </div>
      <div class="footer-info contacts-ct">
        <H :animated="false" tag="h5">{{ $t('common.contacts') }}</H>
        <div class="info">
          <a
            class="clickable"
            :href="`tel:${$t('contacts.phone')}`"
            target="_blank"
            title="contact-phone"
          >
            {{ $t('contacts.phone') }}
          </a>
          <a
            class="clickable"
            :href="`mailto:${$t('contacts.email', { at: '@' })}`"
            target="_blank"
            title="contact-email"
          >
            {{ $t('contacts.email', { at: '@' }) }}
          </a>
        </div>
      </div>
      <div class="footer-info language-ct">
        <H :animated="false" tag="h5">{{ $t('common.language') }}</H>
        <div class="info">
          <a
            href="/"
            :class="locale === 'en' && 'underline'"
            class="clickable"
            @click="setLocale('en')"
          >
            {{ $t('common.english') }}
          </a>
          <!--<a
            href="/it"
            :class="locale === 'it' && 'underline'"
            class="clickable"
            @click="setLocale('it')"
          >
            {{ $t('common.italian') }}
          </a>-->
        </div>
      </div>
      <div class="footer-info connect-ct">
        <div class="info social-info">
          <a
            class="social-icon-ct clickable"
            href="https://vimeo.com/user220307068"
            target="_blank"
            title="record-studio-vimeo"
          >
            <Icon class="social-icon" name="vimeo" />
          </a>
          <a
            class="social-icon-ct clickable"
            href="https://www.linkedin.com/company/recordstudio/"
            target="_blank"
            title="record-studio-linkedin"
          >
            <Icon class="social-icon" name="linkedin" />
          </a>
          <a
            class="social-icon-ct clickable"
            href="https://www.instagram.com/record_studio_/"
            target="_blank"
            title="record-studio-instagram"
          >
            <Icon class="social-icon" name="instagram" />
          </a>
        </div>
      </div>
    </div>

    <div class="copyright-ct">
      <NuxtLink class="clickable" :to="localePath('/privacy')">
        {{ $t('common.privacy') }}
      </NuxtLink>
      <span> - Handcrafted by </span>
      <a
        class="clickable"
        href="https://codeworks.build/"
        target="_blank"
        title="handcrafted-by-codeworks"
      >
        CodeWorks
      </a>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="postcss" scoped>
.footer {
  @apply flex flex-col gap-3 font-medium pb-10 pt-24 px-5;

  & .footer-line {
    @apply h-[1px] bg-dark-opacity mb-10 rounded-full;
  }

  & .logo-ct {
    @apply flex w-[200px];

    & svg {
      @apply fill-white;
    }
  }

  & .info-ct {
    @apply flex justify-between;

    & .footer-info {
      @apply flex flex-col gap-3 mt-3 max-w-[250px] text-white text-base;

      & .info {
        @apply flex flex-col;

        &.social-info {
          @apply gap-2;
        }

        & .social-icon-ct {
          @apply bg-white rounded-full flex items-center justify-center h-7 w-7;

          & .social-icon {
            @apply fill-black w-3;
          }
        }
      }
    }
  }

  & .copyright-ct {
    @apply text-white text-sm self-end;
  }
}

@media only screen and (max-width: 980px) {
  .footer {
    @apply flex-col;

    & .logo-ct {
      @apply flex w-[150px];
    }

    & .info-ct {
      @apply flex-col gap-10;

      & .footer-info {
        @apply gap-1 max-w-none text-sm;

        & .info {
          @apply max-w-[250px];

          &.social-info {
            @apply flex-row;
          }
        }
      }
    }

    & .copyright-ct {
      @apply self-start;
    }
  }
}

@media only screen and (min-width: 1300px) {
  .footer {
    @apply px-12;
  }
}
</style>
