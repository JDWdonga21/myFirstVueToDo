123 345

<template>
  <div id="app">
    <Todo-Header></Todo-Header>
    <!-- event 사용 -->
    <Todo-Input v-on:addTodoItem="addOneItem"></Todo-Input>
    <!-- todoitems todolist로 데이터 props로 내려야함 -->
    <Todo-List
      v-bind:propsdata="todoItems"
      v-on:removeItem="removeOneItem"
      v-on:completeItem="completeOneItem"
    ></Todo-List>
    <Todo-Footer v-on:clearAll="clearAllItems"></Todo-Footer>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";
// App.vue는 동작/ 데이터 조작을 처리하는 컨테이너라고 생각하면 좋다.
export default {
  data() {
    return {
      todoItems: [],
    };
  },
  methods: {
    addOneItem: function (todoItem) {
      var obj = { completed: false, item: todoItem };
      //저장 로직
      //stringify 자바스크립트 객체를 str으로 들어감
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem: function (todoItem, index) {
      localStorage.removeItem(todoItem.item);
      // splice
      this.todoItems.splice(index, 1);
    },
    completeOneItem: function (todoItem, index) {
      // todoItem.completed = !todoItem.completed;
      // 이유는? 컴포넌트 간의 경계를 명확하게 함/ 안티패턴? 을 막음
      this.todoItems[index].completed = !this.todoItems[index].completed;
      // update 기능이 없으므로 지웠다가 다시 만들어야함
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems: function () {
      localStorage.clear();
      this.todoItems = [];
    },
  },
  created: function () {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          //this.todoItems.push(localStorage.key(i));
          // JSON.parse str -> 오브젝트로
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
          // console.log(localStorage.key(i));
        }
      }
    }
  },
  components: {
    //컴포넌트 태그명 : 컴포넌트 내용
    "Todo-Header": TodoHeader,
    "Todo-Input": TodoInput,
    "Todo-List": TodoList,
    "Todo-Footer": TodoFooter,
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
