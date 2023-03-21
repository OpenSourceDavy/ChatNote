import React, { useEffect, useState, useRef, useCallback } from 'react';

import Chatroom from "../components/chatRoom";
import { Inter } from 'next/font/google'
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Divider, CircularProgress,  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';
import { IconButton, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import 'react-quill/dist/quill.snow.css';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useRouter } from "next/router";
import Loadable from 'react-loadable';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {saveAs} from "file-saver";
import pdfMake from 'pdfmake/build/pdfmake';
import htmlToPdfmake from 'html-to-pdfmake';
import PropTypes from "prop-types";
import htmlDocx from 'html-docx-js/dist/html-docx';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import jsPDF from 'jspdf';
const LoadableReactQuill = Loadable({
    loader: () => import('react-quill'),
    loading: () => <CircularProgress />,
});

// const LoadableHtmlDocx = Loadable({
//     loader: () => import('html-docx-js/dist/html-docx'),
//     loading: () => <CircularProgress />,
// });

// const LoadableFileSaver = Loadable<{ saveAs: typeof import('file-saver').saveAs }>({
//     loader: async () => {
//         const { saveAs } = await import('file-saver');
//         return { saveAs };
//     },
//     loading: () => <CircularProgress />,
// });
// const LoadableJsPDF = Loadable({
//     loader: () => import('jspdf'),
//     loading: () => <CircularProgress />,
// });
//
// const LoadablePdfMake = Loadable({
//     loader: () => import('pdfmake/build/pdfmake'),
//     loading: () => <CircularProgress />,
// });
//
// const LoadableHtmlToPdfMake = Loadable({
//     loader: () => import('html-to-pdfmake'),
//     loading: () => <CircularProgress />,
// });

const ReactQuill = LoadableReactQuill;
// const htmlDocx = LoadableHtmlDocx;
// const jsPDF = LoadableJsPDF;

const StyledAppBar = styled(AppBar)(({ theme }) => ({

    background: 'linear-gradient(135deg, #f5f5f5 0%, rgba(63,181,171,0.25) 100%)',
    boxShadow:  '0 5px 15px rgba(0, 0, 0, 0.3)',
}));

const ChatRoomWrapper = styled(Box)(({ theme }) => ({
    elevation:4,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: 'linear-gradient(135deg, #f5f5f5 0%, rgba(63,181,171,0.25) 100%)',
    padding: theme.spacing(2),
    overflowY: 'auto',
    marginRight: theme.spacing(1),
    width: '54vw', // Set a fixed width
    minWidth: '54vw', // Make sure the width doesn't shrink below the fixed width
    maxWidth: '54vw'

}));
const BackgroundWrapper = styled(Box)({
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundImage: `url('/bg-image.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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
const NotesWrapper = styled(Box)(({ theme }) => ({
    elevation:4,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    // color: 'rgb(29,45,35)',
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(2),
    overflowY: 'auto',
    marginLeft: theme.spacing(1),
    width:'41vw', // Set a fixed width
    minWidth: '41vw', // Make sure the width doesn't shrink below the fixed width
    maxWidth: '41vw',
    borderRadius: '5px', // Add border radius
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add box shadow

}));

const quillToolbarOptions = [
    [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['direction', { 'align': [] }],
    ['link', 'image', 'video', 'formula'],
    ['clean'],
];

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
}));


interface TextProps {
    children: React.ReactNode;
}

const Text: React.FC<TextProps> = (props) => {
    return null;
};

const StyledLink = styled('a')(({ theme }) => ({
    paddingRight: "1vw",
    color: '#f5f5f5',
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'none',
    },
}));

const StyledDialogContent = styled(DialogContent)({
    minWidth: 300,
});

const MainPage: React.FC = () => {
    const router = useRouter();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [userMail, setUsermail] = useState<string | string[]>(router.query.mail || '');
    const [downanchorEl, setdownAnchorEl] = useState<null | HTMLElement>(null);
    const [openFeedbackDialog, setOpenFeedbackDialog] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setdownAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setdownAnchorEl(null);
    };
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const notesContentRef = useRef<string>('');

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMenuCloseLogout = () => {
        setAnchorEl(null);
        router.push("/");
    };
    const StyledReactQuill = styled(ReactQuill)(({ theme }) => ({
        theme:"snow",
        border: '1px solid #e0e0e0',

        minHeight: 'calc(100% - 16px)',
        '& .ql-editor': {
            minHeight: 'calc(100% - 44px)',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

        },
    }));
    const handleQuillChange = useCallback((content: string) => {
        notesContentRef.current = content;
    }, []);
    const downloadNotesAsWord = () => {
        const contentHtml = notesContentRef.current;
        const converted = htmlDocx.asBlob(contentHtml);
        saveAs(converted, 'notes.docx');
    };
    const downloadNotesAsPDF = () => {
        const contentHtml = notesContentRef.current;
        const pdfContent = htmlToPdfmake(contentHtml);
        const docDefinition: TDocumentDefinitions = {
            content: [
                {
                    stack: pdfContent,
                } as Content,
            ],
            defaultStyle: {
                font: 'Roboto',
            },
        };

        pdfMake.createPdf(docDefinition).download('notes.pdf');
    };

    const sendFeedback = () => {
        const feedback = { userMail, message };
        fetch(`http://175.24.204.121:9091/feedbacks`, {
            method: "POST",
            mode: 'cors',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feedback)

        }).then(res => res.json())
            .then((res) => {
                if (res.code === '1') {
                    alert("Your feedbacks was successfully sent");
                    setOpenFeedbackDialog(false);
                }
                else {
                    alert("sent failed");
                }

            });
    };

    return (
        <BackgroundWrapper>
            <StyledAppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"

                        sx={{
                            flexGrow: 1,
                            fontFamily: 'Great Vibes, cursive',
                            color: 'black',


                        }}
                    >
                        ChatNote
                    </Typography>

                    <a style={{
                        paddingRight: "1vw",
                        color: '#f5f5f5',
                        textDecoration: 'underline',
                        cursor: 'pointer',

                    }} href="https://github.com/OpenSourceDavy/ChatNote" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <StyledLink onClick={() => setOpenFeedbackDialog(true)}>
                        Share your feedbacks
                    </StyledLink>

                    <Dialog
                        open={openFeedbackDialog}
                        onClose={() => setOpenFeedbackDialog(false)}
                        aria-labelledby="feedback-dialog-title"
                        aria-describedby="feedback-dialog-description"
                    >
                        <DialogTitle id="feedback-dialog-title">We value your feedbacks!</DialogTitle>
                        <StyledDialogContent>
                            <DialogContentText id="feedback-dialog-description">
                                Please enter your feedback below:
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="feedback"
                                label="Feedback"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </StyledDialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenFeedbackDialog(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={sendFeedback} color="primary" variant="contained">
                                Send
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="user status"
                        aria-controls="user-status-menu"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                    >
                        <PersonIcon />
                    </IconButton>
                    <Menu
                        id="user-status-menu"
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'user-status-menu',
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleMenuCloseLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>

            </StyledAppBar>
            <Box display="flex" height="calc(100vh - 64px)" paddingTop={1}>
                <ChatRoomWrapper component={Paper} >
                    <Typography variant="h6">ChatRoom</Typography>
                    <StyledDivider />
                    <Chatroom />
                </ChatRoomWrapper>
                <NotesWrapper component={Paper} >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            NoteBook
                        </Typography>
                        <IconButton
                            color="primary"
                            onClick={handleClick}
                            size="small"
                            edge="end"
                        >
                            <GetAppIcon/>
                        </IconButton>
                        <Menu
                            anchorEl={downanchorEl}
                            keepMounted
                            open={!!downanchorEl}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => { handleClose(); downloadNotesAsWord(); }}>Download as .docx</MenuItem>
                            <MenuItem onClick={() => { handleClose(); downloadNotesAsPDF(); }}>Download as .pdf</MenuItem>
                        </Menu>
                    </Box>
                    <StyledDivider />
                    <StyledReactQuill
                        value={notesContentRef.current}
                        onChange={handleQuillChange}
                        modules={{ toolbar: quillToolbarOptions }}
                    />
                </NotesWrapper>
            </Box>
        </BackgroundWrapper>
    );
}
export default MainPage;