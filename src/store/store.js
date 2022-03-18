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
      // for (let i = 0; i < localStorage.length; i++) {
      //   if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
      //     //this.todoItems.push(localStorage.key(i));
      //     // JSON.parse str -> 오브젝트로
      //     arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      //     // console.log(localStorage.key(i));
      //   }
      // }
      // localStorage.forEach((Key, Value) => {
      //   console.log(Key, Value);
      // });
      let i = 0;
      Object.keys(localStorage).forEach(function (key) {
        console.log(key, localStorage.getItem(key));
        if (localStorage.key(key) !== "loglevel:webpack-dev-server") {
          //this.todoItems.push(localStorage.key(i));
          // JSON.parse str -> 오브젝트로
          i = i + 1;
          arr.push(JSON.parse(localStorage.getItem(key)));
          // console.log(localStorage.key(i));
        }
      });
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  //
  state: {
    headerText: "ToDo it~!",
    indexnum: 0,
    todoItems: storage.fetch(),
  },
  //
  getters: {
    storedTodoItems(state) {
      return state.todoItems;
    },
  },
  mutations: {
    reMakeindex(state, index) {
      state.indexnum = index;
    },
    addOneItem(state, makeSignal) {
      const obj = {
        key: makeSignal.keynum,
        completed: false,
        item: makeSignal.text,
      };
      localStorage.setItem(makeSignal.keynum, JSON.stringify(obj));
      //this.todoItems.push(obj);
      state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
      localStorage.removeItem(payload.todoItem.key);

      // splice
      state.todoItems.splice(payload.index, 1);
    },
    completeOneItem(state, getSignal) {
      state.todoItems[getSignal.index].completed =
        !state.todoItems[getSignal.index].completed;
      // update 기능이 없으므로 지웠다가 다시 만들어야함
      localStorage.removeItem(getSignal.todoItem.key);
      localStorage.setItem(
        getSignal.todoItem.key,
        JSON.stringify(getSignal.todoItem)
      );
    },
    clearAllItems(state) {
      localStorage.clear();
      state.todoItems = [];
    },
  },
});
