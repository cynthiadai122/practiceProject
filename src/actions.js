export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const requestApiData = () => ({ type: REQUEST_API_DATA });


export const RECEIVE_API_DATA = "RECEIVE_API_DATA";
export const receiveApiData = data => ({ type: RECEIVE_API_DATA, data  });

export const REQUEST_VIEW_USER = "REQUEST_VIEW_USER";
export const requestViewUser = () => ({ type: REQUEST_VIEW_USER });

export const RECEIVE_VIEW_USER = 'RECEIVE_VIEW_USER';
export const receiveViewUser = user => ({ type: RECEIVE_VIEW_USER,  user });


export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
export const requestCreateUser =() => ({ type: REQUEST_CREATE_USER }); 

export const RECEIVE_CREATE_USER = 'RECEIVE_CREATE_USER';
export const receiveCreateUser = user => ({ type: RECEIVE_CREATE_USER,  user });



export const REQUEST_REMOVE_USER = "REQUEST_REMOVE_USER";
export const requestRemoveUser = () => ({ type: REQUEST_REMOVE_USER });

export const RECEIVE_REMOVE_USER = 'RECEIVE_REMOVE_USER';
export const receiveRemoveUser = id=> ({ type: RECEIVE_REMOVE_USER,id});

export const RECEIVE_EDIT_USER= 'RECEIVE_EDIT_USER';
export const receiveEditUser = user => ({ type: RECEIVE_EDIT_USER, user });