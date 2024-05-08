<template>
  <span v-html="parsedText" class="highlighter" />
</template>

<script lang="ts" setup>
type Props = {
  text: string;
  toHighlight: Array<HighlightItem>;
}

const props = withDefaults(
  defineProps<Props>(), {
    text: "",
  }
);

const parsedText = computed(() => {
  let text = props.text;

  for (const item of props.toHighlight) {
    const regex = new RegExp(`\\b${item.text}\\b`, "g"); // Use word boundaries (\b) to match complete words
    text = text.replace(regex, getReplacedText(item.text, item));
  }

  return text;
});

const getReplacedText = (text: string, item: HighlightItem) => {
  let span = `<span `;

  if (item.style) {
    span += `style="${item.style}" `;
  }

  if (item.class) {
    span += `class="${item.class}"`;
  }

  return `${span}> ${text}</span>`;
};
</script>
