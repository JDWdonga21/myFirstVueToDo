<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" v-on:click="clearTodo"> Clear All </span>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({
      clearTodo: "clearAllItems",
    }),
    // 22/03/18 ...mapMutations을 사용함에 따라 주석처리
    // clearTodo() {
    //   //this.$emit("clearAll");
    //   //220317 store를 이용한 전체삭제기능 구현
    //   this.$store.commit("clearAllItems");
    // },
  },
};
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  /* 추가 */
  display: block;
}
</style>
