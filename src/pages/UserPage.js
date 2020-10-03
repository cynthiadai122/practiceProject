import React from 'react';
import getUsers from '../mockServer/users/index';
import 'bootstrap/dist/css/bootstrap.min.css';
const HomePage = () =>{
    const users=getUsers;
return(
<>
    <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Job count</th>
                <th scope="col">Active</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>

    {users.data.map((u,key)=>(
        <tr key={key}>
          <td  >{u.id}</td>
          <td >{u.email}</td>
          <td >{u.jobs_count}</td>
          <td >{`${u.active}`}</td>
          <td>
          <a href="#" class="btn btn-outline-success">Add</a>
          <a href="#"class="btn btn-outline-info">Edit</a>
          <a href="#"class="btn btn-outline-danger">Delete</a>
          </td>
          {/* <td >{`${u.slack_username}` ? 'yes':'N/A'}</td> */}

          
        </tr>
  


    ))}
    </tbody>
    </table>
    </>
);

}
export default HomePage;