import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storage = {
  //fetch: function()
  fetch() {
    //22/03/17 App.vue 에서 created() 가져옴, 로컬스토리지에 있는 내용을 전부 배열에 담아줌
    //빈 배열 선언해줌
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          //this.todoItems.push(localStorage.key(i));
          // JSON.parse str -> 오브젝트로
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          // console.log(localStorage.key(i));
        }
      }
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  //
  state: {
    headerText: "ToDo it~!",
    todoItems: storage.fetch(),
  },
  mutations: {
    reMakeindex(state, index) {
      state.indexnum = index;
    },
    addOneItem(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      //this.todoItems.push(obj);
      state.todoItems.push(obj);
    },
    removeOneItem(state, todoItem, index) {
      localStorage.removeItem(todoItem.item);

      // splice
      state.todoItems.splice(index, 1);
    },
    completeOneItem(state, todoItem, index) {
      state.todoItems[index].completed = !state.todoItems[index].completed;
      // update 기능이 없으므로 지웠다가 다시 만들어야함
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems(state) {
      localStorage.clear();
      state.todoItems = [];
    },
  },
});
