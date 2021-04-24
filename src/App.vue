<template>
  <div class="prose container mx-auto">
    <article v-html="htmlForRender"></article>
  </div>
</template>

<script>
import marked from 'marked'
export default {
  mounted() {
    this.getContent()
  },
  data() {
    return {
      content: '',
      htmlForRender: ''
    }
  },
  computed: {
    htmlForRender() {
      return marked(this.content)
    }
  },
  methods: {
    getContent() {
      fetch(
        'https://raw.githubusercontent.com/craigary/notion-api/main/README.md'
      )
        .then(res => res.text())
        .then(res => (this.content = res))
    }
  }
}
</script>
