export default {
  changeUserName(store, userName) {
    localStorage.setItem('username', userName);
    store.setState({ userName });
  },
};
