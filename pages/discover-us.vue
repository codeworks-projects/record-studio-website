<template>
  <main class="max-md:pb-20 pb-40 text-white flex flex-col overflow-hidden">
    <section class="relative max-md:pt-32 pt-56">
      <div class="size-full absolute inset-0 z-0">
        <Image src="/image/discover-us/hero1.webp" class="size-full object-contain object-top" />
      </div>

      <div class="relative z-10 flex flex-col max-md:gap-8 gap-16 __center">
        <Motion
          :initial="SLIDE_UP.INITIAL"
          :in-view="SLIDE_UP.IN_VIEW"
          :transition="TRANSITION.DEFAULT"
        >
          <h1
            class="uppercase font-title max-md:text-4xl text-8xl __text-gradient"
            v-html="$md($t('pg.discover-us.title'))"
          />
        </Motion>
        <div class="max-md:flex-col max-md:gap-6 flex gap-14 !leading-none font-title opacity-90">
          <Motion
            :initial="SLIDE_UP.INITIAL"
            :in-view="SLIDE_UP.IN_VIEW"
            :transition="{ ...TRANSITION.DEFAULT, delay: index * 0.1 }"
            v-for="(claim, index) in claims"
          >
            <p class="max-md:!max-w-none !max-w-[200px] !font-extrabold max-md:text-base text-xl">
              {{ claim }}
            </p>
          </Motion>
        </div>

        <NuxtLink to="#contact" class="w-fit">
          <Button :value="$t('pg.discover-us.cta')" />
        </NuxtLink>
      </div>

      <div class="relative z-10 max-md:pt-20 pt-40 __center">
        <Video
          class="size-full rounded-lg"
          autoplay
          :videoUrl="`${config.public.strapiImagePath}/uploads/Record_Studio_Presentatio_Spot_Homepage_7a15c1c0b8.mp4`"
        />
      </div>
    </section>

    <div class="relative">
      <div class="size-full absolute inset-0 z-0">
        <Image src="/image/discover-us/hero2.webp" class="size-full object-contain object-top" />
      </div>

      <div class="relative z-10 pt-4 flex flex-col max-md:gap-16 gap-28 __center">
        <section class="max-md:grid-cols-1 grid grid-cols-3 gap-4">
          <Motion
            tag="div"
            class="bg-[#0d0d0d] h-full rounded-lg max-md:p-6 p-8 flex flex-col max-md:gap-6 gap-10 justify-between"
            :initial="SLIDE_UP.INITIAL"
            :in-view="SLIDE_UP.IN_VIEW"
            :transition="{ ...TRANSITION.DEFAULT, delay: index * 0.1 }"
            v-for="(card, index) in cards"
          >
            <div class="flex items-center justify-between">
              <p class="font-title font-semibold max-md:text-2xl text-4xl uppercase">
                {{ index + 1 }}.
              </p>
              <Icon name="icona_asterisco" />
            </div>
            <div class="flex flex-col gap-5">
              <h2 class="font-title font-semibold max-md:text-xl text-2xl">{{ card.title }}</h2>
              <div class="h-[1px] bg-white w-full" />
              <p class="__paragraph opacity-80">
                {{ card.description }}
              </p>
            </div>
          </Motion>
        </section>
        <section class="max-md:grid-cols-1 max-md:gap-8 grid grid-cols-2">
          <Motion
            tag="div"
            class="font-title font-semibold max-md:text-2xl text-4xl uppercase max-w-[400px]"
            :initial="SLIDE_UP.INITIAL"
            :in-view="SLIDE_UP.IN_VIEW"
            :transition="TRANSITION.DEFAULT"
          >
            <h2>{{ $t('pg.discover-us.grid1.title') }}</h2>
          </Motion>
          <Motion
            tag="div"
            class="flex flex-col max-md:gap-6 gap-10"
            :initial="SLIDE_UP.INITIAL"
            :in-view="SLIDE_UP.IN_VIEW"
            :transition="TRANSITION.DEFAULT"
          >
            <p class="font-title max-md:text-xl text-3xl font-semibold max-w-[500px]">
              {{ $t('pg.discover-us.grid1.subtitle') }}
            </p>
            <p class="__paragraph max-w-[700px]">
              {{ $t('pg.discover-us.grid1.description') }}
            </p>

            <NuxtLink to="#contact" class="w-fit">
              <Button :animated="false" :value="$t('pg.discover-us.cta')" />
            </NuxtLink>
          </Motion>
        </section>
        <section class="max-md:grid-cols-1 max-md:gap-8 grid grid-cols-2">
          <div class="flex flex-col max-md:gap-8 gap-36">
            <Motion
              tag="div"
              class="font-title font-semibold max-md:text-2xl text-4xl uppercase max-w-[400px]"
              :initial="SLIDE_UP.INITIAL"
              :in-view="SLIDE_UP.IN_VIEW"
              :transition="TRANSITION.DEFAULT"
            >
              <h2>{{ $t('pg.discover-us.grid2.title') }}</h2>
            </Motion>

            <NuxtLink to="#contact" class="w-fit">
              <Button :value="$t('pg.discover-us.cta')" />
            </NuxtLink>
          </div>
          <Motion
            tag="div"
            class="flex flex-col max-md:gap-6 gap-10"
            :initial="SLIDE_UP.INITIAL"
            :in-view="SLIDE_UP.IN_VIEW"
            :transition="TRANSITION.DEFAULT"
          >
            <div class="max-md:grid-cols-1 grid grid-cols-2 gap-4 mb-10">
              <div
                class="rounded-lg gap-8 p-6 flex flex-col bg-white/20 backdrop-blur-sm justify-between"
              >
                <p class="font-title max-md:text-lg text-2xl font-semibold max-w-[250px]">
                  {{ $t('pg.discover-us.grid2.card1.title') }}
                </p>
                <p class="__paragraph">{{ $t('pg.discover-us.grid2.card1.description') }}</p>
              </div>
              <div
                class="rounded-lg gap-8 p-6 flex flex-col bg-white/20 backdrop-blur-sm justify-between"
              >
                <p class="font-title max-md:text-lg text-2xl font-semibold max-w-[250px]">
                  {{ $t('pg.discover-us.grid2.card2.title') }}
                </p>
                <p class="__paragraph">{{ $t('pg.discover-us.grid2.card2.description') }}</p>
              </div>
            </div>
            <p class="font-title max-md:text-xl text-4xl font-semibold max-w-[500px]">
              {{ $t('pg.discover-us.grid2.subtitle') }}
            </p>
            <p class="__paragraph max-w-[700px]">
              {{ $t('pg.discover-us.grid2.description') }}
            </p>
          </Motion>
        </section>
        <section class="flex flex-col max-md:gap-6 gap-10">
          <Motion
            tag="div"
            class="font-title font-semibold max-md:text-2xl text-4xl uppercase max-w-[400px]"
            :initial="SLIDE_UP.INITIAL"
            :in-view="SLIDE_UP.IN_VIEW"
            :transition="TRANSITION.DEFAULT"
          >
            <h2>{{ $t('pg.discover-us.grid3.title') }}</h2>
          </Motion>
          <p class="__paragraph opacity-80 max-w-[550px]">
            {{ t('pg.discover-us.grid3.description') }}
          </p>
          <div class="max-md:grid-cols-2 grid grid-cols-4 gap-4">
            <Motion
              v-for="(work, i) in works"
              tag="div"
              :initial="OPACITY.INITIAL"
              :in-view="OPACITY.IN_VIEW"
              :transition="{ ...TRANSITION.DEFAULT }"
            >
              <WorkCard :work="work" copy />
            </Motion>
          </div>
        </section>
      </div>
    </div>

    <section class="flex flex-col max-md:gap-6 gap-10 __center max-md:pt-20 pt-40">
      <Motion
        tag="div"
        class="font-title font-semibold max-md:text-2xl text-4xl uppercase max-w-[400px]"
        :initial="SLIDE_UP.INITIAL"
        :in-view="SLIDE_UP.IN_VIEW"
        :transition="TRANSITION.DEFAULT"
      >
        <h2>{{ $t('pg.discover-us.brands.title') }}</h2>
      </Motion>
      <p class="__paragraph opacity-80 max-w-[550px]">
        {{ t('pg.discover-us.brands.description') }}
      </p>
      <div class="max-md:grid-cols-2 grid grid-cols-4 gap-4">
        <Motion
          v-for="(brand, i) in brands"
          tag="div"
          class="flex items-center justify-center"
          :initial="SLIDE_UP.INITIAL"
          :in-view="SLIDE_UP.IN_VIEW"
          :transition="{ ...TRANSITION.DEFAULT, delay: i * 0.1 }"
        >
          <Image
            :src="brand"
            class="max-md:w-20 max-md:h-20 w-28 h-28 object-contain grayscale opacity-50"
          />
        </Motion>
      </div>

      <NuxtLink to="#contact" class="w-fit mx-auto">
        <Button :value="$t('pg.discover-us.cta')" />
      </NuxtLink>
    </section>

    <section class="max-md:pt-20 pt-40 flex flex-col gap-4 __center">
      <div
        class="max-md:flex-col max-md:items-start max-md:gap-8 flex items-center justify-between"
      >
        <Motion
          tag="div"
          class="font-title font-semibold max-md:text-3xl text-6xl uppercase max-w-[400px]"
          :initial="SLIDE_UP.INITIAL"
          :in-view="SLIDE_UP.IN_VIEW"
          :transition="TRANSITION.DEFAULT"
        >
          <h2>{{ $t('pg.discover-us.us.title') }}</h2>
        </Motion>
        <Motion
          tag="div"
          class="flex flex-col max-md:gap-4 gap-8"
          :initial="SLIDE_UP.INITIAL"
          :in-view="SLIDE_UP.IN_VIEW"
          :transition="TRANSITION.DEFAULT"
        >
          <p class="font-title max-md:text-xl text-3xl font-semibold">
            {{ $t('pg.discover-us.us.subtitle') }}
          </p>
          <p class="__paragraph max-w-[700px]">
            {{ $t('pg.discover-us.us.description') }}
          </p>
        </Motion>
      </div>

      <Image src="/image/discover-us/img.webp" class="w-full rounded-lg" />

      <Motion
        tag="div"
        class="flex flex-col mx-auto text-center items-center"
        :initial="SLIDE_UP.INITIAL"
        :in-view="SLIDE_UP.IN_VIEW"
        :transition="TRANSITION.DEFAULT"
      >
        <p class="font-title max-md:text-lg text-2xl font-semibold uppercase">
          {{ $t('pg.discover-us.us.subtitle2') }}
        </p>

        <p
          class="font-title max-md:text-2xl text-4xl font-semibold uppercase"
          v-html="$md($t('pg.discover-us.us.description2'))"
        />

        <NuxtLink to="#contact" class="w-fit pt-10">
          <Button :animated="false" :value="$t('pg.discover-us.cta')" />
        </NuxtLink>
      </Motion>
    </section>

    <section class="flex flex-col max-md:gap-6 gap-10 __center max-md:pt-20 pt-40">
      <Motion
        tag="div"
        class="font-title font-semibold max-md:text-2xl text-4xl uppercase flex flex-col"
        :initial="SLIDE_UP.INITIAL"
        :in-view="SLIDE_UP.IN_VIEW"
        :transition="TRANSITION.DEFAULT"
      >
        <h2>{{ $t('pg.discover-us.availability.title') }}</h2>
        <p class="max-md:text-lg text-2xl">{{ $t('pg.discover-us.availability.subtitle') }}</p>
      </Motion>
      <p class="__paragraph opacity-80 max-w-[550px]">
        {{ t('pg.discover-us.availability.description') }}
      </p>
      <div class="max-md:grid-cols-1 grid grid-cols-4 gap-4">
        <Motion
          tag="div"
          class="flex flex-col gap-2 border border-white rounded-lg max-md:p-3 max-md:py-4 p-4 py-6"
          :initial="SLIDE_UP.INITIAL"
          :in-view="SLIDE_UP.IN_VIEW"
          :transition="{ ...TRANSITION.DEFAULT, delay: index * 0.1 }"
          v-for="(item, index) in [1, 2, 3, 4]"
        >
          <div class="flex flex-col">
            <p class="uppercase __paragraph">{{ $t('pg.discover-us.availability.month') }}</p>
            <p class="max-md:text-3xl text-5xl font-title uppercase font-semibold">
              {{ availability[`month${item}Name`] }}
            </p>
          </div>
          <p class="max-md:text-4xl text-7xl font-title uppercase font-semibold">
            {{ availability[`month${item}Availability`] }}
          </p>
          <p class="font-medium uppercase max-md:text-base text-xl max-w-[150px]">
            {{ $t('pg.discover-us.availability.availableSlots') }}
          </p>
          <p class="uppercase __paragraph underline">
            {{ $t('pg.discover-us.availability.lock') }}
          </p>
        </Motion>
      </div>

      <NuxtLink to="#contact" class="w-fit ml-auto">
        <Button :value="$t('pg.discover-us.cta')" />
      </NuxtLink>
    </section>

    <section class="max-md:grid-cols-1 max-md:gap-8 grid grid-cols-2 __center max-md:pt-20 pt-40">
      <div class="flex flex-col max-md:gap-8 gap-14">
        <Motion
          tag="div"
          class="font-title font-semibold max-md:text-2xl text-4xl uppercase max-w-[400px]"
          :initial="SLIDE_UP.INITIAL"
          :in-view="SLIDE_UP.IN_VIEW"
          :transition="TRANSITION.DEFAULT"
        >
          <h2>{{ $t('pg.discover-us.qa.title') }}</h2>
        </Motion>

        <NuxtLink to="#contact" class="w-fit">
          <Button :value="$t('pg.discover-us.cta')" />
        </NuxtLink>
      </div>

      <div class="flex flex-col">
        <div v-for="(item, index) in qa" class="flex flex-col">
          <div
            class="clickable flex items-center justify-between"
            @click="openedQA = openedQA === index ? null : index"
          >
            <p class="font-bold max-md:text-base text-lg">{{ item.title }}</p>
            <Icon v-show="openedQA !== index" name="piu" />
            <Icon v-show="openedQA === index" name="meno" />
          </div>

          <p v-if="openedQA === index" class="__paragraph mt-6">{{ item.description }}</p>

          <div class="h-[1px] w-full bg-white my-10" />
        </div>
      </div>
    </section>

    <section id="contact" class="max-md:pt-16 pt-32">
      <Motion
        tag="div"
        :initial="SLIDE_UP.INITIAL"
        :in-view="SLIDE_UP.IN_VIEW"
        :transition="TRANSITION.DEFAULT"
        class="flex justify-center"
      >
        <h2 class="uppercase font-title max-md:text-[120px] text-[280px] __text-gradient-2">
          {{ $t('pg.discover-us.contact.title') }}
        </h2>
      </Motion>

      <div
        class="__center max-md:mt-[-60px] mt-[-210px] rounded-lg gap-8 max-md:p-4 p-6 flex flex-col bg-white/20 backdrop-blur-sm justify-between"
      >
        form
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { SLIDE_UP, OPACITY, TRANSITION } from '~/animations.config.json'
import type { Work } from '~/types/work'

const config = useRuntimeConfig()
const { t } = useI18n()

const openedQA = ref<number | null>(null)

const claims = computed(() => [
  t('pg.discover-us.claim1'),
  t('pg.discover-us.claim2'),
  t('pg.discover-us.claim3'),
])

const cards = computed(() => [
  {
    title: t('pg.discover-us.card1.title'),
    description: t('pg.discover-us.card1.description'),
  },
  {
    title: t('pg.discover-us.card2.title'),
    description: t('pg.discover-us.card2.description'),
  },
  {
    title: t('pg.discover-us.card3.title'),
    description: t('pg.discover-us.card3.description'),
  },
])

const brands = [
  '/image/discover-us/logos/ALÌ.webp',
  '/image/discover-us/logos/ARMANI BEAUTY.webp',
  '/image/discover-us/logos/ARREDO3.webp',
  '/image/discover-us/logos/ATMOSPHERA.webp',
  '/image/discover-us/logos/BINDI.webp',
  '/image/discover-us/logos/CALLIGARIS.webp',
  '/image/discover-us/logos/DE CASTELLI.webp',
  '/image/discover-us/logos/DIADORA.webp',
  '/image/discover-us/logos/FDA GROUP.webp',
  '/image/discover-us/logos/IDEALPLAST.webp',
  '/image/discover-us/logos/MOROSO.webp',
  '/image/discover-us/logos/OVS.webp',
  '/image/discover-us/logos/PIANCA.webp',
  '/image/discover-us/logos/POLTRONE FRAU.webp',
  '/image/discover-us/logos/REGIONE VENETO.webp',
  '/image/discover-us/logos/SCHUCO.webp',
  '/image/discover-us/logos/TOTEM.webp',
  '/image/discover-us/logos/VERITAS.webp',
  '/image/discover-us/logos/VERSACE.webp',
  '/image/discover-us/logos/VILLA D_ESTE.webp',
]

const qa = computed(() => [
  {
    title: t('pg.discover-us.qa.qa1.title'),
    description: t('pg.discover-us.qa.qa1.description'),
  },
  {
    title: t('pg.discover-us.qa.qa2.title'),
    description: t('pg.discover-us.qa.qa2.description'),
  },
  {
    title: t('pg.discover-us.qa.qa3.title'),
    description: t('pg.discover-us.qa.qa3.description'),
  },
  {
    title: t('pg.discover-us.qa.qa4.title'),
    description: t('pg.discover-us.qa.qa4.description'),
  },
  {
    title: t('pg.discover-us.qa.qa5.title'),
    description: t('pg.discover-us.qa.qa5.description'),
  },
  {
    title: t('pg.discover-us.qa.qa6.title'),
    description: t('pg.discover-us.qa.qa6.description'),
  },
  {
    title: t('pg.discover-us.qa.qa7.title'),
    description: t('pg.discover-us.qa.qa7.description'),
  },
  {
    title: t('pg.discover-us.qa.qa8.title'),
    description: t('pg.discover-us.qa.qa8.description'),
  },
])

const { data: av } = await useFetch(`${config.public.strapiUrl}/projects-availability?populate=*`)

const availability = computed(() => {
  return (av.value as any)?.data.attributes as any
})

const { data: wd } = await useFetch(
  `${config.public.strapiUrl}/works?populate=*&sort=date&filters[showAsCaseStudy][$eq]=true`
)

const works = computed(() => {
  return (wd.value as any)?.data as Work[]
})

useHead({
  title: t('contacts.companySimpleName') + ' | ' + t('pg.discover-us.meta.title'),
  meta: [{ name: 'description', content: t('pg.discover-us.meta.description') }],
})
</script>

<style lang="postcss" scoped>
.__paragraph {
  @apply font-sans font-medium leading-tight opacity-80;
}
</style>
