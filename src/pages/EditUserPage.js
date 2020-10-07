import ValidatedEditedForm from '../components/ValidatedEditUserForm';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

const EditUserPage=({match}) =>{
    const token = localStorage.getItem('token');
    const id = match.params.id;
    const [userInfo, setUserInfo] = useState({ users:[] });
    useEffect(()=>{
        const fetchData = async()=>{
            const result = await fetch(`/api/v2/users/${id}`,{ 
                headers: {
                    authorization: token ,
                }, 
                });
            const body = await result.json();
            console.log("body",body);
            setUserInfo(body);
        }
        fetchData();
    }, [])

    console.log("test...",userInfo.users.email);

const test=userInfo.users.email;
console.log("test...",typeof(test));

  const formik = useFormik({
    initialValues: {
      email: test
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
      <>
      <h2>Edit user page</h2>
      <ValidatedEditedForm id={id}/>
      </>
    //   <>
    // <p>{userInfo.users.email}</p>

    // <form onSubmit={formik.handleSubmit}>
    //   <label htmlFor="email">Email Address</label>
    //   <input
    //     id="email"
    //     name="email"
    //     type="email"
    //     onChange={formik.handleChange}
    //     value={formik.values.email}
    //   />
    //   <button type="submit">Edit</button>

    // </form>
    // </>
  );
};

export default EditUserPage;
