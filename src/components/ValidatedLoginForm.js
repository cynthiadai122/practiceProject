import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import "../styles/Login.css";
import * as Yup from 'yup';
import React from 'react';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const ValidatedLoginForm = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
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
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    
})}

    onSubmit={(values, { setSubmitting }) => {
      axios.post('/api/v2/users/tokens', {
        email: values.email,
        password: values.password
    })
    .then((response) => {
      console.log("response");
      if(response.data=="ok"){
        localStorage.setItem('token', response.headers.authorization);
        NotificationManager.success('Log in successful');
        window.location.href = '/api/v2/users/';
      }
      
    }, (error) => {
      NotificationManager.error('Invalid username or password');
    });
      setTimeout(() => {
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
          <label htmlFor="email">Email</label>
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
          

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
          />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}

        <button type="submit">
          Login
        </button>

        </form>
        <NotificationContainer/>
        </>
      );
    }}
  </Formik>
)
  
  export default ValidatedLoginForm;