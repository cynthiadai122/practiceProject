import { RECEIVE_VIEW_USER, RECEIVE_CREATE_USER, RECEIVE_EDIT_USER, RECEIVE_API_DATA, RECEIVE_REMOVE_USER } from "../actions";

export default (state = [],action) => {
  const { type, payload } = action;
  switch (type) {
    case RECEIVE_API_DATA:
      return action.data;

    case RECEIVE_VIEW_USER:
        console.log("view user state",action.user);
        return {user:action.user};

    case RECEIVE_CREATE_USER:
        const newUser = action.user;
        console.log("create user", action);
        console.log("craete result", state.users.concat(newUser));
        const users ={users:state.users.concat(newUser)}
        return users;

    case RECEIVE_REMOVE_USER:
      const result = state.users.filter(u => u.id !== action.id)
      const newlist = {users:result};
      return newlist;

    case RECEIVE_EDIT_USER:
      const editUser = action.data;
      return state.map(user => {
        if (user.id === editUser.id) {
            return editUser;
        }
        return user;
    });
    default:
      return state;
  }
};

