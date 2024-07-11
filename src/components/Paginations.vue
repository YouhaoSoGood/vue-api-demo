<template>
<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <span class="page-link">&laquo;</span>
    </li>
    <li class="page-item" v-for="page1 in pages.total_pages" :key="page1" :class="{'active': page1 === pages.current_page}">
      <a class="page-link" href="#" @click.prevent="updatePage(page1)">
        {{ page1 }}
      </a>
    </li>
    <li class="page-item">
      <span class="page-link" href="#">&raquo;</span>
    </li>
  </ul>
</nav>
</template>

<script>
// Paginations.vue是用來展示列表
export default {
  props: ['pages'],
  methods: {
    updatePage (page2) {
      this.$emit('emit-pages', page2)
    }
  }
}
</script>
