import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import React, {useEffect, useState} from 'react';
import { ReactNode } from 'react';
import {
    Container,
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
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSpring, animated } from 'react-spring';


import md5 from "js-md5";

import ParticlesBg, { Props } from 'particles-bg';

const DynamicParticlesBg = dynamic<Props>(() => import('particles-bg').then((mod) => mod.default), {
    ssr: false,
});

import {BackgroundWrapper,WebsiteTitle,StyledContainer,StyledForm,StyledButton,StyledPaper} from './index'


interface CopyrightProps {
    [key: string]: ReactNode;
}

function Copyright(props: CopyrightProps) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                ChatNote powered by ChatGPT
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const LoginPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cell, setCell] = useState<string>('');
    const [nameerror, setnameError] = useState<string>("");
    const [passerror, setpassError] = useState<string>("");
    const [mailerror, setmailError] = useState<string>("");
    const [cellerror, setcellError] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>('');
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);


    useEffect(() => {
        setPasswordsMatch(password === confirmedPassword);
    }, [password, confirmedPassword]);

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
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

                }
                else {
                    alert("sign up failed")
                }

            })


    }

    const formAnimation : any = useSpring({
        from: { opacity: 0, transform: 'translate3d(0, -50px, 0)' },
        to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        config: { duration: 1000 },
    }) ;

    return (
        <BackgroundWrapper>
            <DynamicParticlesBg type="cobweb" num={50} color="#ffffff" bg={true} />
            <StyledContainer  maxWidth="xs">
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
                                helperText={cellerror}
                            />
                            <StyledButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!passwordsMatch}
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
                    <Copyright  />
                </animated.div>
            </StyledContainer>

        </BackgroundWrapper>
    );
}

export default LoginPage;

