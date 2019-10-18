import React, { useState, useEffect} from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// need name, email, password, ToS (checkbox), submit button

const UserForm = ({ errors, touched, values, status }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    status && setUser(user => [...user, status]);
  }, [status]);

  return (
    <div className = 'userForm'>
      <h1>Welcome New User!</h1>
      <Form>
        <Field className = 'formField' type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
        
        <Field className = 'formField' type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}

        <Field className = 'formField' type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}

        <label className="checkbox-container">
          I have read and I understand the Terms of Service*
          <Field className = 'formField' 
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
          <span className="checkmark" />
          {touched.terms && errors.terms && (
            <p className="error">{errors.terms}</p>
          )}
        </label>
        
        <button type="submit">Submit!</button>

      </Form>
      
      {user.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
        </ul>
      ))}
    </div>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      terms: terms || false
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Gotta have a name!'),
    email: Yup.string().required('Gotta have an email!'),
    password: Yup.string().required('Gotta have a password!'),
    terms: Yup.bool().oneOf([true], 'You must accept!')
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

console.log("This is the HOC", FormikUserForm);

export default FormikUserForm;