<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <span class="addContainer" v-on:click="addTodo">
      <i class="fa fa-plus addbtn"></i>
      <!-- <span class="material-icons-outlined"> add </span> -->
    </span>
    <!-- <button class="material-icons-outlined" v-on:click="addTodo">add</button> -->
    <My-Modal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
    -->
      <!-- @click="showModal = false" 은 v-on 의 축약형  -->
      <h3 slot="header">경고!</h3>
      <p slot="body">무언가를 입력하세요.</p>
      <p slot="footer">
        <i
          class="fa fa-times-circle-o closeModalBtn"
          style="font-size: 36px"
          @click="showModal = false"
        ></i>
      </p>
    </My-Modal>
  </div>
</template>

<script>
import Modal from "./common/MyModal.vue";

export default {
  data: function () {
    return {
      newTodoItem: "",
      showModal: false,
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
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput: function () {
      this.newTodoItem = "";
    },
  },
  components: {
    "My-Modal": Modal,
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
.closeModalBtn {
  color: #f34363;
}
</style>
