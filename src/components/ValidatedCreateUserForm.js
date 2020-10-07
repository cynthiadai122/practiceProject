import React from 'react';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import "../styles/Login.css";
import * as Yup from 'yup';
import Axios from 'axios';


const ValidatedCreateUserForm = () => (
  <Formik
    initialValues={{ first_name: "", last_name: "", email: "", jobs_count:"", active:"", slack_username:"" }}
    validate={values => {
      let errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!EmailValidator.validate(values.email)) {
        errors.email = "Invalid email address.";
      }
      return errors;
}}

validationSchema={Yup.object().shape({
    email: Yup.string()
        .email()
        .required("Required"),
    first_name: Yup.string()
        .required("Please enter your first name.")
        .min(1, "First name is too short.")
        .max(20, "First name is too long.")
        .matches(/([a-z ,.'-])/, "Please enter valid first name."),
    last_name: Yup.string()
        .required("Please enter your last name.")
        .min(1, "Last name is too short.")
        .max(20, "Last name is too long.")
        .matches(/([a-z ,.'-])/, "Please enter valid last name."),
    jobs_count: Yup.string()
        .required("Please enter your job count.")
        .matches(/([0-9]{1,3})/, "Please enter valid job count."),
    slack_username: Yup.string()
        .required("Please enter your slack name.")
        .min(1, "Slack username name is too short.")
        .max(20, "Slack username name is too long.")
        .matches(/([a-z ,.'-])/, "Please enter valid slack name."),
    active: Yup.string()
        .required("active field required.")
})}
    onSubmit={(values,{ setSubmitting }) => {
        const token = localStorage.getItem('token');
        Axios.post('/api/v2/users/',{ first_name:values.first_name, last_name:values.last_name, email:values.email,jobs_count:values.jobs_count,
            active:values.active,slack_username:values.slack_username
        },{ 
            headers: {
                authorization: token,
            }
        });   

      
      setTimeout(() => {
        console.log("Submitting form...", values);
        setSubmitting(true);
      }, 500);
    }}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;

      return (
        <form onSubmit={handleSubmit}>
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th>User ID:</th>
                        <td>User id</td>
                    </tr>
                    <tr>
                        <th>First name</th>
                        <td>
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="Enter your first name"
                                value={values.first_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.first_name && touched.first_name && "error"}
                            />
                            {errors.first_name && touched.first_name && (
                                <div className="input-feedback">{errors.first_name}</div>
                            )}
                            </td>
                    </tr>
                    <tr>
                        <th>Last name:</th>
                        <td>
                        <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Enter your last name"
                                value={values.last_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.last_name && touched.last_name && "error"}
                            />
                            {errors.last_name && touched.last_name && (
                                <div className="input-feedback">{errors.last_name}</div>
                            )}

                        </td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.email && touched.email && "error"}
                        />
                        {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )}
                        </td>
                    </tr>
                    <tr>
                        <th>Jobs Count:</th>
                        <td>
                            <input
                                    id="jobs_count"
                                    name="jobs_count"
                                    type="text"
                                    placeholder="Enter your job number"
                                    value={values.jobs_count}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.jobs_count && touched.jobs_count && "error"}
                                />
                                {errors.jobs_count && touched.jobs_count && (
                                    <div className="input-feedback">{errors.jobs_count}</div>
                                )}
                            </td>
                    </tr>
                    <tr>
                        <th>Active</th>
                        <td>
                            <input
                                        id="active"
                                        name="active"
                                        type="text"
                                        placeholder="Enter your status"
                                        value={values.active}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.active && touched.active && "error"}
                                    />
                                    {errors.active && touched.active && (
                                        <div className="input-feedback">{errors.active}</div>
                                    )}
                         </td>
                    </tr>
                    <tr>
                        <th>Slack username</th>
                        <td>
                            <input
                                id="slack_username"
                                name="slack_username"
                                type="text"
                                placeholder="Enter your slask user name"
                                value={values.slack_username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.slack_username && touched.slack_username && "error"}
                            />
                            {errors.slack_username && touched.slack_username && (
                                <div className="input-feedback">{errors.slack_username}</div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        
        {/* <Link to= {'/api/v2/users'}> */}
            <button type="submit">
            Add user
            </button>
         {/* </Link>   */}
         
      

        </form>
      );
    }}
  </Formik>
);

  export default ValidatedCreateUserForm;
  