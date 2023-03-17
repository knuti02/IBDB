import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

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

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [inputValid, setInputValid] = useState(true);

  const darkmode = useSelector((state) => state.darkmode.value);

  const addUser = async () => {
    if (validateInput()) {
      setInputValid(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setStatus("Bruker lagt til");
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setStatus("Noe gikk galt:(");

          // ..
        });
    } else {
      setInputValid(false);
    }
  };

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);
    const validPassword = password.length > 7;
    return validEmail && validPassword;
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      addUser();
    }
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="1920px"
      bgcolor={darkmode ? "#3e3e42" : "#fffff"}
    >
      <Box bgcolor={darkmode ? "#3e3e42" : "#fffff"} zIndex={20}>
        <Stack justifyContent="center" alignItems="center">
          <Box marginTop="16px">
            <TextField
              style={{
                paddingBottom: "10px",
              }}
              sx={{ input: { backgroundColor: darkmode ? "black" : "white" } }}
              label="Email"
              type="email"
              inputProps={{ "data-testid": "emailInputField" }}
              variant="filled"
              error={!inputValid}
              helperText={!inputValid ? "Invalid email format" : ""}
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <TextField
              style={{ paddingBottom: "10px" }}
              label="Password"
              sx={{ input: { backgroundColor: darkmode ? "black" : "white" } }}
              type="password"
              inputProps={{ "data-testid": "passwordInputField" }}
              variant="filled"
              error={!inputValid}
              helperText={!inputValid ? "Password must be at least 8 characters" : ""}
              fullWidth
              value={password}
              onChange={(p) => setPassword(p.currentTarget.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="contained" onClick={addUser}>
              Add User
            </Button>
            {status.length > 0 &&
              (status === "Bruker lagt til" ? <SuccessText>{status}</SuccessText> : <ErrorText>{status}</ErrorText>)}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignUpPage;
