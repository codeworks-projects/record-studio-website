<template>
  <div v-if="hasEnabledServices" class="cookie-banner-ct">
    <template v-if="config.public.googleTagManagerEnabled">
      <iframe
        :src="`https://www.googletagmanager.com/ns.html?id=${config.public.googleTagManagerId}`"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      />
    </template>

    <div class="cookie-banner" :class="{ 'not-visible': bannerHidden }">
      <div class="cookie-text-ct">
        <h2 class="cookie-title">{{ $t('components.cookie.title') }}</h2>
        <p class="cookie-description">
          {{ $t('components.cookie.description') }}
          <NuxtLink :to="localePath('/privacy')" class="cookie-policy">
            Cookie & Privacy Policy
          </NuxtLink>
        </p>
      </div>
      <div class="cookie-options">
        <div v-if="config.public.facebookPixelEnabled" class="cookie-option">
          <Checkbox
            id="pixel"
            v-model="cookieOptions.pixel.value"
            @change="updateCookieOption('pixel')"
          />
          <label for="pixel">Meta Pixel</label>
        </div>
        <div v-if="config.public.googleTagManagerEnabled" class="cookie-option">
          <Checkbox
            id="gtm"
            v-model="cookieOptions.gtm.value"
            @change="updateCookieOption('gtm')"
          />
          <label for="gtm">Google Analytics</label>
        </div>
      </div>
      <div class="cookie-btn-ct">
        <Button
          :animated="false"
          type="secondary"
          :value="$t('components.cookie.decline')"
          @click="declineAll"
        />
        <Button :animated="false" :value="$t('components.cookie.accept')" @click="acceptAll" />
      </div>
    </div>

    <div
      class="open-banner"
      :class="{ 'not-visible': !bannerHidden }"
      @click="updateHideBanner(false)"
    >
      <Icon class="open-icon" name="cookie" />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const config = useRuntimeConfig()
const localePath = useLocalePath()
const { $fbqConsent, $gtmConsent } = useNuxtApp()

const bannerHidden = useLocalStorage('cookie-banner-hidden', false)

const cookieOptions = reactive({
  ...(config.public.facebookPixelEnabled
    ? {
        pixel: { value: useLocalStorage('pixel-accepted', false) },
      }
    : {}),
  ...(config.public.googleTagManagerEnabled
    ? {
        gtm: { value: useLocalStorage('gtm-accepted', false) },
      }
    : {}),
})

const hasEnabledServices = computed(
  () => config.public.facebookPixelEnabled || config.public.googleTagManagerEnabled
)

const updateCookieOption = (key) => {
  if (key === 'pixel' && config.public.facebookPixelEnabled) {
    if (cookieOptions.pixel.value) {
      $fbqConsent('grant')
    } else {
      $fbqConsent('revoke')
    }
  }
  if (key === 'gtm' && config.public.googleTagManagerEnabled) {
    if (cookieOptions.gtm.value) {
      $gtmConsent('grant')
    } else {
      $gtmConsent('revoke')
    }
  }
}

const updateHideBanner = (value) => {
  bannerHidden.value = value
}

const acceptAll = () => {
  if (config.public.facebookPixelEnabled && cookieOptions.pixel) {
    cookieOptions.pixel.value = true
    updateCookieOption('pixel')
  }
  if (config.public.googleTagManagerEnabled && cookieOptions.gtm) {
    cookieOptions.gtm.value = true
    updateCookieOption('gtm')
  }
  bannerHidden.value = true
}

const declineAll = () => {
  if (config.public.facebookPixelEnabled && cookieOptions.pixel) {
    cookieOptions.pixel.value = false
    updateCookieOption('pixel')
  }
  if (config.public.googleTagManagerEnabled && cookieOptions.gtm) {
    cookieOptions.gtm.value = false
    updateCookieOption('gtm')
  }
  bannerHidden.value = true
}

if (config.public.facebookPixelEnabled) {
  watch(
    () => cookieOptions.pixel?.value,
    () => updateCookieOption('pixel'),
    { immediate: true }
  )
}

if (config.public.googleTagManagerEnabled) {
  watch(
    () => cookieOptions.gtm?.value,
    () => updateCookieOption('gtm'),
    { immediate: true }
  )
}

if (
  hasEnabledServices.value &&
  ((config.public.facebookPixelEnabled && cookieOptions.pixel?.value === null) ||
    (config.public.googleTagManagerEnabled && cookieOptions.gtm?.value === null))
) {
  bannerHidden.value = false
}
</script>

<style lang="postcss" scoped>
.cookie-banner-ct {
  @apply fixed bottom-5 right-5 z-[999] select-none;

  & .cookie-banner {
    @apply flex flex-col gap-7 rounded-lg bg-white px-10 py-10 text-black;
    box-shadow: 0 5px 24px 5px rgba(0, 0, 0, 0.25);

    &.not-visible {
      @apply hidden;
    }

    & .cookie-text-ct {
      @apply flex flex-col gap-3;
      max-width: 400px;

      & .cookie-title {
        @apply text-lg font-semibold;
      }

      & .cookie-description {
        @apply text-sm;
      }
    }

    & .cookie-options {
      @apply flex flex-col gap-2;
    }

    & .cookie-option {
      @apply flex items-baseline gap-2;
    }

    & .cookie-btn-ct {
      @apply flex items-center justify-end gap-5;
    }

    & .cookie-policy {
      @apply text-xs underline;
    }
  }

  & .open-banner {
    @apply cursor-pointer rounded-xl bg-white p-2;

    & .open-icon {
      @apply w-7 h-7 text-primary;
    }
    box-shadow: 0 5px 24px 2px rgba(0, 0, 0, 0.25);

    &.not-visible {
      @apply hidden;
    }
  }
}

@media (max-width: theme('screens.md')) {
  .cookie-banner-ct {
    @apply bottom-2 left-2 right-2;

    & .cookie-banner {
      & .cookie-btn-ct {
        @apply flex-col;

        & .cookie-btn {
          @apply w-full;
        }
      }
    }
  }
}
</style>
