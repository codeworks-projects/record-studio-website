<template>
  <header class="header">
    <NuxtLink class="icon-ct clickable" :class="{ 'menu-open': showMenu }" :to="localePath('/')">
      <Icon name="logo-icon" />
    </NuxtLink>
    <nav class="menu-ct" ref="menuRef">
      <div
        class="menu-icon-ct clickable"
        :class="{ 'menu-open': showMenu }"
        @click="() => toggleShowMenu(!showMenu)"
      >
        <div class="menu-icon-line"></div>
        <div class="menu-icon-line"></div>
        <div class="menu-icon-line"></div>
      </div>
      <ul class="menu" :class="{ 'menu-open': showMenu }">
        <li
          v-for="(item, i) in menu"
          class="menu-item clickable"
          :class="{ 'menu-hover': isMenuHovered }"
          @click="toggleShowMenu(false)"
        >
          <NuxtLink :key="i" :to="localePath(item.link)">
            {{ item.title }}
          </NuxtLink>
        </li>
        <a
          class="header-btn"
          :class="{ 'menu-hover': isMenuHovered }"
          :href="`mailto:${$t('contacts.email', { at: '@' })}`"
          target="_blank"
          title="contact-us"
        >
          <Button :animated="false" :value="$t('common.letsTalk')" class="header-btn-btn" />
        </a>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { useElementHover } from '@vueuse/core'

const showMenu = ref(false)
const menuRef = ref()
const isMenuHovered = useElementHover(menuRef)

function toggleShowMenu(state?: boolean) {
  showMenu.value = state || false
}
const localePath = useLocalePath()
const { t } = useI18n()

const menu = computed(() => [
  { title: t('common.work'), link: '/work' },
  // { title: t('common.about'), link: '/about' },
  { title: t('common.contacts'), link: '/contacts' },
])
</script>

<style lang="postcss" scoped>
.header {
  @apply fixed top-0 left-0 right-0 p-5 flex items-center justify-between z-30;

  & .icon-ct {
    @apply w-20;

    & svg {
      @apply fill-white;
    }
  }

  & .menu-ct {
    @apply text-white font-medium flex items-center gap-10 transition-all lowercase;

    & .menu {
      @apply flex items-center gap-10;

      & .menu-item {
        @apply transition-opacity;

        &:hover {
          @apply !opacity-100;
        }

        &.menu-hover {
          @apply opacity-50;
        }
      }
      & .header-btn {
        @apply transition-opacity;

        &:hover {
          @apply !opacity-100;
        }

        &.menu-hover {
          @apply opacity-50;
        }

        & .header-btn-btn {
          @apply lowercase font-medium;
        }
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  .header {
    & .icon-ct {
      @apply fixed w-14 z-40 top-5 left-5;
    }

    & .menu-ct {
      & .menu-icon-ct {
        @apply fixed right-5 top-12 h-5 w-8 z-40;
        transition: transform 0.5s ease;

        & .menu-icon-line {
          @apply bg-white h-[2px] mb-[8px] border-r-[2px];

          transform-origin: 50%;
          transition:
            transform 0.5s ease,
            color 0.5s ease,
            opacity 0.5s ease;

          &:last-child {
            @apply mb-0;
            transform: scale(0.8, 1);
            transform-origin: right center;
          }
        }

        &.menu-open {
          transform: translateX(15px);

          & .menu-icon-line {
            &:first-child {
              transform: rotate(45deg) translateY(18px) translateX(-3px);
            }

            &:not(:first-child):not(:last-child) {
              transform: rotate(-45deg) translateY(-10px) translateX(-10px);
            }

            &:last-child {
              display: none;
            }
          }
        }
      }

      & .menu {
        @apply fixed opacity-0 top-0 left-0 right-0 bottom-0 z-30 p-10 pt-28 pr-5 bg-black/90 flex-col pointer-events-none transition-all duration-500 items-end;

        & .menu-item {
          @apply text-2xl;

          &.menu-hover {
            @apply opacity-100;
          }
        }

        & .header-btn {
          @apply mt-3;

          &.menu-hover {
            @apply opacity-100;
          }
        }

        &.menu-open {
          @apply gap-2 opacity-100 pointer-events-auto;
        }
      }
    }
  }
}

@media only screen and (min-width: 1300px) {
  .header {
    @apply px-12;
  }
}
</style>
