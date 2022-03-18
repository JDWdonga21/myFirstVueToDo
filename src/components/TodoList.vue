<template>
  <div>
    <transition-group name="list" tag="ul">
      <!-- v-for를 사용할 때 내장된 index 가 있다. -->
      <!-- 22/03/17 propsdata -> this.$store.state.todoItems state에 있는 todoItem을 가져옴 -->
      <!-- 22/03/18  $store.state.todoItems -> getters.storedTodoItems -> this.todoItems (computed 안)-->
      <li
        v-for="(todoItem, index) in this.storedTodoItems"
        v-bind:key="todoItem.item"
        class="shadow"
      >
        <i
          class="checkBtn fa fa-check"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          v-on:click="toggleComplete({ todoItem, index })"
        ></i>
        <span v-bind:class="{ textCompleted: todoItem.completed }">{{
          todoItem.item
        }}</span>

        <span class="removeBtn" v-on:click="removeTodo({ todoItem, index })">
          <i class="fa fa-trash-o"></i>
          <!-- <span class="material-icons-outlined"> add </span> -->
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  //22/03/18
  computed: {
    // todoItems() {
    //   return this.$store.getters.storedTodoItems;
    // },
    ...mapGetters(["storedTodoItems"]),
    // 아래처럼 객체로 사용할 때는 겟터스의 이름과 실제로 사용하는 컴포넌트 이름이 다를 때 사용
    // ...mapGetters({
    //   todoItems: 'storedTodoItems'
    // })
  },
  //App.vue에서 데이터를 props로 받는다.
  //props: ["propsdata"],
  // data: function () {
  //   return {
  //     todoItems: [],
  //   };
  // },
  methods: {
    ...mapMutations({
      //인자가 없어도 호출하는 쪽에서 인자가 있으면 암묵적으로 넣어준다.
      //mapMutations를 이용하기 전에 객체 1로 만들어서 넘겼으므로 호출하는 부분에 {}를 사용하여 객체 1로 만들어준다.
      removeTodo: "removeOneItem",
      toggleComplete: "completeOneItem",
    }),
    // 22/03/18 ...mapMutations을 사용함에 따라 주석처리
    // removeTodo(todoItem, index) {
    //   // 삭제기능
    //   //this.$emit("removeItem", todoItem, index);

    //   // localStorage.removeItem(todoItem);
    //   // // splice
    //   // this.todoItems.splice(index, 1);

    //   //220317 store롤 이용한 삭제기능 구현
    //   console.log(index);
    //   console.log(todoItem);
    //   this.$store.commit("removeOneItem", { todoItem, index });
    // },
    // 22/03/18 ...mapMutations을 사용함에 따라 주석처리
    // toggleComplete(todoItem, index) {
    //   //완료기능
    //   //this.$emit("completeItem", todoItem, index);
    //   //console.log(todoItem, index);
    //   // todoItem.completed = !todoItem.completed;
    //   // // update 기능이 없으므로 지웠다가 다시 만들어야함
    //   // localStorage.removeItem(todoItem.item);
    //   // localStorage.setItem(todoItem.item, JSON.stringify(todoItem));

    //   //220317 store를 이용한 완료기능 구현
    //   this.$store.commit("completeOneItem", { todoItem, index });
    // },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
/* 리스트 아이탬 트랜지션*/
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
