
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';


const Form = styled(Stack)`
  padding: 16px;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

const ErrorText = styled.p`
  color: red;
  margin: 0;
  font-size: 12px;
`;

const SuccessText = styled.p`
  color: green;
  margin: 0;
  font-size: 12px;
`;


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState("");

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setStatus('Signed in successfully!');
      // Redirect the user to the main page once signed in
      // You can use React Router for this or any other method you prefer
    } catch (error) {
      console.error(error);
      setStatus('Failed to sign in. Please try again.');
      // Handle the error
    }
  };

  return (
    <Form direction="row" spacing={2} justifyContent="space-between">
      <TextField
        label="Email"
        type="email"
        inputProps={{ "data-testid": "emailInputField" }}
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <TextField
        label="Password"
        type="password"
        inputProps={{ "data-testid": "passwordInputField" }}
        variant="outlined"
        fullWidth
        value={password}
        onChange={(p) => setPassword(p.currentTarget.value)}
      />
      <Button variant="contained" onClick={logIn}>
        Log-in
      </Button>
      {status && <p>{status}</p>}
    </Form>
  );
}
  

export default LoginPage;
