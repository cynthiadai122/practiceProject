import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { REQUEST_API_DATA, 
  receiveApiData,receiveEditUser,
  REQUEST_REMOVE_USER,receiveRemoveUser, 
  REQUEST_VIEW_USER,receiveViewUser, 
  REQUEST_CREATE_USER, receiveCreateUser,
  REQUEST_EDIT_USER
 } from "./actions";
import axios from 'axios';



const token = localStorage.getItem('token');
const fetchData = async () => {
  try {
    const response = await fetch("/api/v2/users",{ 
      headers: {
          authorization: token,
        }, 
       });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const viewUser = async(id)=>{
  const result = await fetch(`/api/v2/users/${id}`,{ 
      headers: {
          authorization: token ,
      }, 
      });
  const userInfo = await result.json();
  return userInfo;
}


const deleteUser = async(id) =>{
  const token = localStorage.getItem('token');
         axios.delete(`/api/v2/users/${id}`,{
            headers: {
                authorization: token
              }
        }).then((response) => {
          console.log("respose delete",response);
        }
        );
}


const updateUser = async(user)=>{
  console.log("updated user", user);
    axios.patch(`/api/v2/users/${user.id}`,{ 
      first_name:user.first_name, 
      last_name:user.last_name, 
      email:user.email,
      jobs_count:user.jobs_count,
      slack_username:user.slack_username, 
      active:user.active,
    },
    { 
        headers: {
            authorization: token ,
        }
      });
}

const addUser = async(user)=>{
  console.log("user",user.first_name);
  axios.post('/api/v2/users/',{
    first_name:user.first_name,
    last_name:user.last_name, 
    email:user.email,
    jobs_count:user.jobs_count,
    active:user.active,
    slack_username:user.slack_username
  },{ 
    headers: {
        authorization: token,
    }
});
 
  // const u = await result.data.json();
  // return u;
}


function* getApiData(action) {
  try {
    const data = yield call(fetchData);
    yield put(receiveApiData(data));
  } catch (e) {
    console.log(e);
  }
}

function* updateOneUser ({ user }) {
  try {
    const newData = yield call(updateUser,user); 
    yield put(receiveEditUser(newData));
  } catch (e) {
    console.log(e);
  }
}
  
function* viewOneUser ({ id }) {
  try {
    const newData = yield call(viewUser, id); 
    console.log("newdata", newData);
    yield put(receiveViewUser(newData));
  } catch (e) {
    console.log(e);
 
  }
}

function* deleteOneUser ({ id }) {
  try {
    yield call(deleteUser, id); 
    console.log("deleting",id);
    yield put(receiveRemoveUser(id));

  } catch (e) {
    console.log(e);
  }
}

function* CreateOneUser ({ user }) {
  try {
    yield call(addUser, user); 
    console.log("adding",user);
    yield put(receiveCreateUser(user));

  } catch (e) {
    console.log(e);
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
  yield takeEvery(REQUEST_VIEW_USER, viewOneUser);
  yield takeEvery(REQUEST_EDIT_USER,updateOneUser);
  yield takeEvery(REQUEST_REMOVE_USER, deleteOneUser);
  yield takeEvery(REQUEST_CREATE_USER,CreateOneUser);

}
