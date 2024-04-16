<template>
  <div class="picker-ct">
    <DateInput
      v-model="startDate"
      :min-date="minDate"
      :max-date="maxDate"
      :label="$t('common.fromDate')"
    />
    <DateInput
      v-model="endDate"
      :min-date="minEndDate"
      :max-date="maxEndDate"
      :disabled="!startDate"
      :label="$t('common.toDate')"
    />
  </div>
</template>

<script setup lang="ts">
type Props = {
  startingDaysRange?: number
  maxDate?: string
  minDate?: string
}

const props = withDefaults(defineProps<Props>(), {
    startingDaysRange: 7,
    maxDate: '2040-12-31',
    minDate: '1970-01-01'
  }
);

const startDate = defineModel<string>('startDate')
const endDate = defineModel<string>('endDate')

const minEndDate = computed(() => {
  if (startDate.value) {
    return new Date(startDate.value).toISOString().split('T')[0]
  }
  return props.minDate
})

const maxEndDate = computed(() => {
  if (startDate.value && props.startingDaysRange) {
    const tmp = new Date(startDate.value)
    return new Date(tmp.setDate(tmp.getDate() + props.startingDaysRange)).toISOString().split('T')[0]
  }
  return props.maxDate
})
</script>

<style lang="postcss" scoped>
.picker-ct {
  @apply flex gap-6 items-center;
}

@media only screen and (max-width: 980px) {
  .picker-ct {
    @apply flex-col gap-3 items-start;
  }
}
</style>
