import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { REQUEST_API_DATA, receiveApiData, 
  RECEIVE_EDIT_USER, receiveEditUser,
  REQUEST_REMOVE_USER,receiveRemoveUser, 
  REQUEST_VIEW_USER,receiveViewUser } from "./actions";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';


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
          // if(response.statusText=="OK"){
          //   NotificationManager.success('Delete user successfully!');
            
          // }
          
        }
        // , (error) => {
        //   NotificationManager.error('Delete user failed');
        // }
        );
}


const updateUser = async(user)=>{
  try{
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
    } ).then((response) => {
            console.log("respose edit",response);
            if(response.statusText=="OK"){
              console.log('Edit user successfully!');
            }
          });
  }
  catch (e) {
    console.log(e);
  }

}


function* getApiData(action) {
  try {
    const data = yield call(fetchData);
    yield put(receiveApiData(data));
  } catch (e) {
    console.log(e);
  }
}

function* updateOneUser ({ data }) {
  try {
    const newData = yield call(updateUser,data); 
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

export default function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
  yield takeEvery(REQUEST_VIEW_USER, viewOneUser);
  yield takeEvery(REQUEST_REMOVE_USER, deleteOneUser);
}
