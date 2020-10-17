
import React from 'react';
const ViewUserTable=({user}) =>{
    console.log("userTable", user)
return(
<>
<h3>User Details</h3>
<table className="table table-striped">
    <tbody>
        <tr>
            <th>User ID:</th>
            <td>{user.id}</td>
        </tr>
        <tr>
            <th>First name</th>
            <td>{user.first_name}</td>
        </tr>
        <tr>
            <th>Last name:</th>
            <td>{user.last_name}</td>
        </tr>
        <tr>
            <th>Email:</th>
            <td>{user.email}</td>
        </tr>
        <tr>
            <th>Jobs Count:</th>
            <td>{user.jobs_count}</td>
        </tr>
        <tr>
            <th>Active</th>
            <td>{`${user.active}`}</td>
        </tr>
        <tr>
            <th>Slack username</th>
            <td>{user.slack_username}</td>
        </tr>
  </tbody> 
</table>
</>
);
}

export default ViewUserTable;
