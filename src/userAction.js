import * as actionTypes from './actions';


export const viewUserInfo = (id) => {
    return {
      type: actionTypes.REQUEST_VIEW_USER,
      id: id, 
    }
  };

export const createUserInfo = (user) => {
    return {
      type: actionTypes.REQUEST_CREATE_USER,
      user: user
    }
  };

export const deleteUserInfro = (id) => {
    return {
        type: actionTypes.REQUEST_REMOVE_USER,
        id: id
    }
}