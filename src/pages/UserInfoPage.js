
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { requestApiData, requestRemoveUser,requestViewUser} from "../actions";
import * as userAction from '../userAction';
import { bindActionCreators } from "redux";
import {Link} from 'react-router-dom';
const UserInfoPage=({match}) =>{
    const token = localStorage.getItem('token');
    const id = match.params.id;
    const [userInfo, setUserInfo] = useState({ users:[] });

    // useEffect(()=>{
    //     const fetchData = async()=>{
    //         const result = await fetch(`/api/v2/users/${id}`,{ 
    //             headers: {
    //                 authorization: token ,
    //             }, 
    //             });
    //         const body = await result.json();
    //         console.log("body",body);
            
    //         setUserInfo(body);

    //     }
    //     fetchData();
    // }, [])

    // console.log(userInfo);
    const viewContact=(index)=>{
        userAction.viewUserInfo(index);
        console.log("viewing", userAction.viewUserInfo(index));
     
      }
    viewContact(id);
 

return(
<>

{/* <h3>User Details</h3>
<table className="table table-striped">
    <tbody>
        <tr>
            <th>User ID:</th>
            <td>{id}</td>
        </tr>
        <tr>
            <th>First name</th>
            <td>{userInfo.users.first_name}</td>
        </tr>
        <tr>
            <th>Last name:</th>
            <td>{userInfo.users.last_name}</td>
        </tr>
        <tr>
            <th>Email:</th>
            <td>{userInfo.users.email}</td>
        </tr>
        <tr>
            <th>Jobs Count:</th>
            <td>{userInfo.users.jobs_count}</td>
        </tr>
        <tr>
            <th>Active</th>
            <td>{`${userInfo.users.active}`}</td>
        </tr>
        <tr>
            <th>Slack username</th>
            <td>{userInfo.users.slack_username}</td>
        </tr>
  </tbody> 
</table>
<Link to= {`/api/v2/users`}>
<button className="btn btn-outline-success" >Back to all users</button>
</Link> */}
</>
);

}

const mapStateToProps = state => ({ data: state.data});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    viewContact: index =>dispatch(userAction.viewUserInfo(index)),
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UserInfoPage);
