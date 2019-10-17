import React, { useState, useEffect} from 'react';

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
        <Field type='text' name='name' placeholder='Name' />
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
        
        <Field type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}

        <Field type="text" name="password" placeholder="Password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}


      </Form>
    
    
    
    
    
    
    </div>
  )







}
