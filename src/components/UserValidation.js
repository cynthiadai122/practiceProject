import * as Yup from 'yup';

export const userValidation = {
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
    .matches(/([a-z ,.'-])/, "Please enter valid slack name.")
  };