import React, { useState } from 'react';

import {
    Container,
    Box,
    TextField,
    Typography,
    Button,
    Link,
    Stack,
    Avatar,
    Paper, AppBar, Toolbar,
} from '@mui/material';
import { styled } from '@mui/system';
import { LockOutlined } from '@mui/icons-material';
import axios from 'axios';
import ParticlesBg from 'particles-bg';
import { useSpring, animated } from 'react-spring';
import md5 from "js-md5";
import {useNavigate} from "react-router-dom";

const BackgroundWrapper = styled('div')({
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/bg-image.jpg'})`,
    backgroundSize: '150% 150%',
    backgroundPosition: 'center',
    animation: 'backgroundMove 30s infinite alternate',
    '@keyframes backgroundMove': {
        '0%': {
            backgroundPosition: 'left top',
        },
        '50%': {
            backgroundPosition: 'right bottom',
        },
        '100%': {
            backgroundPosition: 'left top',
        },
    },
});
const WebsiteTitle = styled(Typography)(({ theme }) => ({
    fontFamily: "'Roboto', sans-serif",
    fontSize: '2.5rem',
    fontWeight: 600,
    color: 'rgb(45,29,29)',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    marginBottom: theme.spacing(4),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,

}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows ? theme.shadows[8] : '0 5px 15px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Increase transparency by reducing the alpha value (0.6)
}));

const StyledForm = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));
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
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        let encryptedPassword = md5(password);
        const user={email,encryptedPassword}
        fetch(`http://localhost:9091/login`,{
            method:"POST",
            mode: 'cors',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)

        }).then(res=>res.json())
            .then((res)=>{
                if (res.code==='1') {
                    alert("signin successfully");
                    console.log(res.data.email)
                    nav('/userLayout', {state: {mail: res.data.email}});
                }
                else {
                    alert("sign up failed")
                }

            })

    };

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
                            Sign in
                        </Typography>
                        <StyledForm onSubmit={handleSubmit}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <StyledButton type="submit" fullWidth variant="contained" color="primary">
                                Sign in
                            </StyledButton>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Link href="/signup" variant="body2">
                                    Forgot your password?
                                </Link>
                                <Link href="/signup" variant="body2">
                                    Don't have an account?
                                </Link>
                            </Stack>
                            <Link href="/userlayout" variant="body2" color={"rgb(45,29,29)"}>
                                Don't wanna sign in? fine. Click here to enter ^ ^
                            </Link>
                        </StyledForm>
                    </StyledPaper>
                    <Copyright sx={{ mt: 5 }} />
                </animated.div>
            </StyledContainer>

        </BackgroundWrapper>
    );
}

export default LoginPage;
