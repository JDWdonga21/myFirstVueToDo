<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <span class="addContainer" v-on:click="addTodo">
      <i class="fa fa-plus addbtn"></i>
      <!-- <span class="material-icons-outlined"> add </span> -->
    </span>
    <!-- <button class="material-icons-outlined" v-on:click="addTodo">add</button> -->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      newTodoItem: "",
    };
  },
  methods: {
    addTodo: function () {
      //console.log(this.newTodoItem);
      if (this.newTodoItem !== "") {
        // var obj = { completed: false, item: this.newTodoItem };
        // //저장 로직
        // //stringify 자바스크립트 객체를 str으로 들어감
        // localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
        // addTodoItem event 발생
        this.$emit("addTodoItem", this.newTodoItem);
        //this로 메서드도 접근 가능
        this.clearInput();
      }
    },
    clearInput: function () {
      this.newTodoItem = "";
    },
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
