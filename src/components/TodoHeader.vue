<template>
  <header>
    <!-- store 폴더 안 store.js 의 state: { headerText } -->
    <h1>{{ this.$store.state.headerText }}</h1>
  </header>
</template>

<script></script>

<style scoped>
h1 {
  color: #2f3b52;
  font-weight: 900;
  margin: 2.5rem 0 1.5rem;
}
</style>
