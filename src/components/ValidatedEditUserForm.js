
import { Formik,Field } from 'formik';
import "../styles/Login.css";
import * as Yup from 'yup';
import axios from 'axios';
import React from 'react';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { userValidation } from "./UserValidation";
import RadioGroupField from '@bit/anthea_srl.dynamic-components.fields.radio-group-field';

const ValidatedEditUserForm= ({user}) => (
  <Formik
    initialValues={{ first_name: user.first_name, last_name: user.last_name, email: user.email, jobs_count:user.jobs_count, active:user.active, slack_username:user.slack_username }}
 
    validationSchema={Yup.object().shape(userValidation)}
    onSubmit={(values, { setSubmitting }) => {
        const token = localStorage.getItem('token');
        axios.patch(`/api/v2/users/${user.id}`,{ first_name:values.first_name, last_name:values.last_name, email:values.email,jobs_count:values.jobs_count,
           slack_username:values.slack_username, active:values.active,
        },
        { 
            headers: {
                authorization: token ,
            }
        }
            ).then((response) => {
                console.log("respose edit",response);
                if(response.statusText=="OK"){
                  NotificationManager.success('Edit user successfully!');
                }
                
              }, (error) => {
                NotificationManager.error('Edit user failed');
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
          <>
        <form onSubmit={handleSubmit}>
             <table className="table table-striped">
                <tbody>
                    <tr>
                        <th>User ID:</th>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <th>First name</th>
                        <td>
                            <input
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
                        <Field 
						name="active" 
                        component={RadioGroupField}
                        value={values.active}
                        onChange={handleChange}
                        onBlur={handleBlur}
						options={[
							["true", "True"],
							["false", "False"],
						]}
					/>
                         </td>
                    </tr>
                    <tr>
                        <th>Slack username</th>
                        <td>
                            <input  
                                name="slack_username"
                                type="text"
                                placeholder="Enter your slack user name"
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
        <button type="submit" disabled={isSubmitting}>
          Edit user
        </button>

        </form>
        <NotificationContainer/>
        </>
      );
    }}
  </Formik>
);
  export default ValidatedEditUserForm;
