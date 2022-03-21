const reMakeindex = (state, index) => {
  state.indexnum = index;
};
const addOneItem = (state, makeSignal) => {
  const obj = {
    key: makeSignal.keynum,
    completed: false,
    item: makeSignal.text,
  };
  localStorage.setItem(makeSignal.keynum, JSON.stringify(obj));
  //this.todoItems.push(obj);
  state.todoItems.push(obj);
};
const removeOneItem = (state, payload) => {
  localStorage.removeItem(payload.todoItem.key);

  // splice
  state.todoItems.splice(payload.index, 1);
};
const completeOneItem = (state, getSignal) => {
  state.todoItems[getSignal.index].completed =
    !state.todoItems[getSignal.index].completed;
  // update 기능이 없으므로 지웠다가 다시 만들어야함
  localStorage.removeItem(getSignal.todoItem.key);
  localStorage.setItem(
    getSignal.todoItem.key,
    JSON.stringify(getSignal.todoItem)
  );
};
const clearAllItems = (state) => {
  localStorage.clear();
  state.todoItems = [];
};

export {
  reMakeindex,
  addOneItem,
  removeOneItem,
  completeOneItem,
  clearAllItems,
};
