import React, {useEffect, useMemo, useState} from 'react';

import {
    Container,
    Box,
    TextField,
    Typography,
    Button,
    Link,
    Stack,
    Avatar,
    Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import { LockOutlined } from '@mui/icons-material';
import axios from 'axios';
import ParticlesBg from 'particles-bg';
import { useSpring, animated } from 'react-spring';
import {useNavigate} from "react-router-dom";
import md5 from 'js-md5'
import {BackgroundWrapper,WebsiteTitle,StyledContainer,StyledForm,StyledButton,StyledPaper} from './loginlayer'



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                ChatNote powered by ChatGPT
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function SignupPage() {
    const[name,setName]=useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrorText, setPasswordErrorText] = React.useState("");
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')
    const[cell,setCell]=useState('')
    const [nameerror, setnameError] = useState("");
    const [nameCheckError, setnameCheckError] = useState("");
    const [passerror, setpassError] = useState("");
    const [mailerror, setmailError] = useState("");
    const [cellerror, setcellError] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        setPasswordsMatch(password === confirmedPassword);
    }, [password, confirmedPassword]);
    // const checkEmail = (e) => {
    //
    //     fetch(`/checkmail`,{
    //
    //         method:"POST",
    //         mode: 'cors',
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify({email})
    //
    //     }).then(res=>res.json())
    //         .then((res)=>{
    //             if(res.code===0){
    //                 setmailError("Email not Avaliable");
    //
    //             }
    //             else{
    //                 setmailError("");
    //             }
    //         })
    //
    // }
    const checkPasswords = (event) => {
        if (password !== confirmPassword) {

            setPasswordErrorText("Passwords do not match");
            event.preventDefault();
        } else {
            setPasswordErrorText("");
        }
    }

    const handleSignup = (e) => {
            e.preventDefault();
            const encryptedPassword = md5(password);
            const user={name,cell,email,encryptedPassword}

            console.log(user)
            fetch(`http://175.24.204.121:9091/register`,{
                method:"POST",
                mode: 'cors',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)

            }).then(res=>res.json())
                .then((res)=>{
                    if (res.code==='1'){alert("register successfully");

                        nav('/')}
                    else {
                        alert("sign up failed")
                    }

                })


    }

    const formAnimation = useSpring({
        from: { opacity: 0, transform: 'translate3d(0, -50px, 0)' },
        to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        config: { duration: 1000 },
    });

    return (
        <BackgroundWrapper>
            <ParticlesBg type="cobweb" num={50} color="#ffffff" bg={true} />
            <StyledContainer component="main" maxWidth="xs">
                <animated.div style={formAnimation}>
                    <WebsiteTitle>ChatNote</WebsiteTitle>
                    <StyledPaper>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <StyledForm onSubmit={handleSignup}>
                            <TextField
                                margin="normal"

                                fullWidth
                                id="Name"
                                label="Name"
                                name="Name"
                                autoComplete="name"
                                required={true}
                                value={name}
                                autoFocus={true}

                                onChange={(e)=>{setName(e.target.value)}}
                                error={nameerror}
                                helperText={nameerror}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                error={passerror}
                                helperText={passerror}
                            />
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                autoComplete="new-password"
                                error={!passwordsMatch}
                                helperText={!passwordsMatch ? 'Passwords do not match' : ''}
                                value={confirmedPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Email-Address"
                                label="Email-Address"
                                type="Email-Address"
                                id="Email-Address"
                                autoComplete="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                error={mailerror}
                                helperText={mailerror}
                                // onBlur={(e)=>checkEmail(e)}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Cell"
                                label="Cell"
                                type="Cell"
                                id="Cell"
                                autoComplete="tel"
                                value={cell}
                                onChange={(e)=>setCell(e.target.value)}
                                error={cellerror}
                                helperText={cellerror}
                            />
                            <StyledButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!passwordsMatch}
                                on
                            >
                                Sign Up
                            </StyledButton>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Link href="/" variant="body2">
                                    Back to Login
                                </Link>
                            </Stack>
                        </StyledForm>
                    </StyledPaper>
                </animated.div>
            </StyledContainer>
        </BackgroundWrapper>
    );
}

export default SignupPage;
