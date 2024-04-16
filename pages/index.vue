<template>
  <div class="demo-ct">
    <h1>{{ $t('hello', { name: 'developer' }) }}</h1>
    <div class="flex">
      <Image src="/image/example-img-to-compress.png" class="w-[50%]" />
      <Icon name="map" class="w-[50%]" />
    </div>
    <TextInput label="Hello" description="This is a text input" v-model="text" />
    <p>{{ text }}</p>
    <TextArea label="A text area" />
    <div>
      <Button icon="edit" class="mr-3" />
      <Button value="This is a button" class="mr-3" />
      <Button value="This is a button" loading class="mr-3" />
      <Button value="This is a button" type="secondary" />
    </div>
    <div>
      <Checkbox v-model="checked" label="Check me" />
    </div>
    <div>
      <Checkbox v-model="checkedSwitch" label="Check me" type="switch-on" />
    </div>
    <div>
      <DateInput label="Enter a date" v-model="date" />
      <p class="mt-1">DATE IS: {{ date }}</p>
    </div>
    <div>
      <NavigationTabs
        :items="navigationTabsItems"
        :cur-item="curNavigationTabItem"
        @choose="setCurNavigationTab"
      />
    </div>
    <div>
      <Modal :is-visible="modalIsVisible" @close="hideModal" />
      <Button value="Show modal" @click="showModal" />
    </div>
    <div>
      <Dialog :is-visible="dialogIsVisible" @cancel="hideDialog" @confirm="hideDialog" />
      <Button value="Show dialog" @click="showDialog" />
    </div>
    <div>
      <ListCard :data="{ id: '', name: '', isPlaceholder: true }" button-icon="edit" />
    </div>
    <div>
      <Select
        v-model="selectValue"
        label="This is a sample select"
        :options="[
          { value: undefined, name: 'Select...' },
          { value: 'one', name: 'One' },
          { value: 'two', name: 'Two' },
        ]"
      />
    </div>
    <div>
      <WorkInProgressNotice />
      <WorkInProgressNotice text="I am a different text!" />
    </div>
    <div>
      <Accordion title="This is an accordion">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptatem ipsum molestias
        voluptate totam delectus harum fugit. Sed eveniet architecto laborum harum provident eos qui
        et animi quasi, iure cupiditate.
      </Accordion>
    </div>
    <div>
      <NoResultsNotice
        icon="user"
        :title="$t('common.noResultFound')"
        :description="$t('common.noResultFound')"
        :button="{ label: $t('common.change') }"
        @buttonClick="() => ''"
      />
    </div>

    <div>
      <Pagination :current-page="0" :total-pages="10" />
    </div>

    <div>
      <ImageInput
        :cur-image="getTestImage(300, 300)"
        :previewWidth="100"
        :previewHeight="100"
        @fileUpload="() => ''"
      />
    </div>

    <div>
      <RangePicker v-model:start-date="startDate" v-model:end-date="endDate" />
      <p class="mt-1">DATE IS: {{ startDate }} / {{ endDate }}</p>
    </div>

    <div>
      <!-- Chek expy-web-frontend for more implementations -->
      <AutocompleteTagInput
        placeholder="Codeworks team"
        :options="[
          {
            name: 'Matteo',
            value: 'matteo',
          },
          {
            name: 'Simone',
            value: 'simone',
          },
          {
            name: 'Alessio',
            value: 'alessio',
          },
          {
            name: 'Edoardo',
            value: 'edoardo',
          },
        ]"
        :selected-tags="selectedTags"
        is-tag-input
        @add-tag="addTag"
        @remove-tag="removeTag"
      />
    </div>

    <div>
      <H>This is an animated title</H>
    </div>

    <div>
      <P>This is an animated paragraph</P>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TextInput from '~/components/form/TextInput.vue'

const { t } = useI18n()

// Head
useHead({
  title: t('contacts.companySimpleName') + ' | ' + t('pg.home.meta.title'),
  meta: [{ name: 'description', content: t('pg.home.meta.description') }],
})

const text = ref('hello :)')
const checked = ref(true)
const checkedSwitch = ref(false)
const date = ref()
const startDate = ref()
const endDate = ref()

const curNavigationTabItem = ref('one')
const modalIsVisible = ref(false)
const dialogIsVisible = ref(false)
const navigationTabsItems = [
  {
    id: 'one',
    name: 'One',
  },
  {
    id: 'two',
    name: 'Two',
  },
  {
    id: 'three',
    name: 'Three',
  },
]
const selectValue = undefined
const selectedTags = ref([] as Array<any>)

function setCurNavigationTab(newTabId: string) {
  curNavigationTabItem.value = newTabId
}

function showModal() {
  modalIsVisible.value = true
}

function showDialog() {
  dialogIsVisible.value = true
}

function hideDialog() {
  dialogIsVisible.value = false
}

function hideModal() {
  modalIsVisible.value = false
}

function addTag(value: any) {
  selectedTags.value.push(value)
}

function removeTag(value: any, index: number) {
  selectedTags.value.splice(index, 1)
}

//
const { t } = useI18n()

useHead({
  title: t('contacts.companySimpleName') + ' | ' + t('pg.home.meta.title'),
  meta: [{ name: 'description', content: t('pg.home.meta.description') }],
})
</script>

<style lang="postcss" scoped>
.demo-ct {
  @apply flex-col justify-center space-y-8 p-5;

  & h1 {
    @apply font-bold font-title text-primary;
  }
}
</style>
