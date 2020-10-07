import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Pagination from '../components/Pagination';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ValidatedCreateUserForm from '../components/ValidatedCreateUserForm';
import ValidatedEditedForm from '../components/ValidatedEditUserForm';

const  UserPage = () =>{
    const token = localStorage.getItem('token');
    const [userInfo, setUserInfo] = useState({ users:[] });
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = userInfo.users.slice(indexOfFirstPost, indexOfLastPost);


    const fetchData = async()=>{
        const result =await fetch("/api/v2/users",{ 
            headers: {
                authorization: token,
            }, 
            });
        const body = await result.json();
        setUserInfo(body);

    }

    useEffect(()=>{
        fetchData();     
    }, [ ])


    const deleteUser = async(id) => {
        try{
            await Axios.delete(`/api/v2/users/${id}`,{
                headers: {
                    authorization: token
                  }
            });   
        }
        catch(error){
            console.log(error);
        }
        fetchData();
    }

    const editUser = (id) => {
       setSingleUserId(id);
       setEditOpen(true);
    }


    //add user
    let [open,setOpen] = useState(false);
    let handleOpen = () => setOpen(true);
    let handleClose = () => {
        setOpen(false);
        fetchData();
    }

    const [singleUserId, setSingleUserId] = useState("");

    let [editOpen,setEditOpen] = useState(false);
    let handleEditOpen = () => setEditOpen(true);
    let handleEditClose = () => {
        setEditOpen(false);
        fetchData();
    }
  
   
//   Change page
  const paginate = pageNumber =>setCurrentPage(pageNumber);

  const [filterInput, setFilterInput] = useState("");

// Update the state when input changes
const handleFilterChange = e => {
  const value = e.target.value || undefined;
  setFilterInput(value);
};

return(
<>
<input
  value={filterInput}
  onChange={handleFilterChange}
  placeholder={"Search name"}
/>

<table className="table table-striped">
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

    {currentPosts.map((u,key)=>(
        <tr key={key}>
          <td  >{u.id}</td>
          <td >{u.email}</td>
          <td >{u.jobs_count}</td>
          <td >{`${u.active}`}</td>
          <td>
          <Link to= {`/users/${u.id}`}>
            <button className="btn btn-outline-success"> View</button>
            </Link>
            {/* <Link to= {`/editInfo/${u.id}`}> */}
            <button className="btn btn-outline-info" onClick={()=>editUser(u.id)}>Edit</button>
            {/* </Link>
          */}
            <button className="btn btn-outline-danger" onClick={()=>deleteUser(u.id)}>Delete</button>
         
          </td>
        </tr>
    ))}
    </tbody>
    </table>
        <button className="btn btn-outline-success" onClick={handleOpen} >Add new user</button>

        <Dialog
                open={open}
                onClose={handleClose}
                style={{height:`1000px`}}
            >
                <DialogTitle >{"Add User"}</DialogTitle>
                <DialogContent>
                    <ValidatedCreateUserForm onClick={handleClose}/>
                </DialogContent>
                
            </Dialog>
 
        <Dialog
                open={editOpen}
                onClose={handleEditClose}
                style={{height:`1000px`}}
            >
                <DialogTitle >{"Edit User"}</DialogTitle>
                <DialogContent>
                    <ValidatedEditedForm id={singleUserId}/>
                </DialogContent>              
        </Dialog>



    <Pagination
        postsPerPage={postsPerPage}
        totalPosts={userInfo.users.length}
        paginate={paginate}
      />

    </>
);

}
export default UserPage;