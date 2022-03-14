<template>
  <div>
    <ul>
      <!-- v-for를 사용할 때 내장된 index 가 있다. -->
      <li
        v-for="(todoItem, index) in todoItems"
        v-bind:key="todoItem.item"
        class="shadow"
      >
        <i
          class="checkBtn fa fa-check"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          v-on:click="toggleComplete(todoItem, index)"
        ></i>
        <span v-bind:class="{ textCompleted: todoItem.completed }">{{
          todoItem.item
        }}</span>

        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i class="fa fa-trash-o"></i>
          <!-- <span class="material-icons-outlined"> add </span> -->
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      todoItems: [],
    };
  },
  methods: {
    removeTodo: function (todoItem, index) {
      // 삭제기능
      // console.log(todoItem, index);
      localStorage.removeItem(todoItem);
      // splice
      this.todoItems.splice(index, 1);
    },
    toggleComplete: function (todoItem, index) {
      //완료기능
      console.log(todoItem, index);
      todoItem.completed = !todoItem.completed;
      // update 기능이 없으므로 지웠다가 다시 만들어야함
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
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
</style>
