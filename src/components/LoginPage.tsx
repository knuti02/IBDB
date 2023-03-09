
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';


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
  const [admin, setAdmin] = useState(false)

  const navigate = useNavigate()

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setStatus('Signed in successfully!');
      if (email == "admin@admin.admin") {
        setAdmin(true)
      }
      navigate("/")
      // Redirect the user to the main page once signed in
      // You can use React Router for this or any other method you prefer
    } catch (error) {
      console.error(error);
      setStatus('Failed to sign in. Please try again.');
      // Handle the error
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      logIn();
    }
  }

  return (
    <Box justifyContent="center" alignItems="center" width="100%" height="100%">
      <Form justifyContent="center" alignItems="center" direction="row" spacing={2} border={1}>
        <Stack justifyContent="center" alignItems="center">
          <TextField
            style = {{paddingBottom: "10px"}}
            label="Email"
            type="email"
            inputProps={{ "data-testid": "emailInputField" }}
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <TextField
            style = {{paddingBottom: "10px"}}
            label="Password"
            type="password"
            inputProps={{ "data-testid": "passwordInputField" }}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(p) => setPassword(p.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="contained" onClick={logIn}>
            Log-in
          </Button>
          {status && <p>{status}</p>}
        </Stack>
      </Form>
    </Box>
  );
}
  

export default LoginPage;
