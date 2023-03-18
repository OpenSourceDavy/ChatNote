import React, { useState } from 'react';
import Chatroom from "./chatRoom";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
    Divider, CircularProgress, Link,
} from '@mui/material';
import { styled } from '@mui/system';
import { IconButton, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCallback } from 'react';
import { useRef } from 'react';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';

import GetAppIcon from '@mui/icons-material/GetApp';
import * as PropTypes from "prop-types";
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';




const StyledAppBar = styled(AppBar)(({ theme }) => ({

    background: 'linear-gradient(135deg, #f5f5f5 0%, rgba(63,181,171,0.25) 100%)',
    boxShadow: theme.shadows ? theme.shadows[8] : '0 5px 15px rgba(0, 0, 0, 0.3)',
}));

const ChatRoomWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: 'linear-gradient(135deg, #f5f5f5 0%, rgba(63,181,171,0.25) 100%)',
    padding: theme.spacing(2),
    overflowY: 'auto',
    marginRight: theme.spacing(1),
    width: '800px', // Set a fixed width
    minWidth: '800px', // Make sure the width doesn't shrink below the fixed width
    maxWidth: '800px'
}));
const BackgroundWrapper = styled(Box)({
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundImage: `url(${process.env.PUBLIC_URL + '/bg-image.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
});
const NotesWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    // color: 'rgb(29,45,35)',
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(2),
    overflowY: 'auto',
    marginLeft: theme.spacing(1),
    width: '600px', // Set a fixed width
    minWidth: '600px', // Make sure the width doesn't shrink below the fixed width
    maxWidth: '600px',
    borderRadius: '5px', // Add border radius
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add box shadow
}));
const quillToolbarOptions = [
    [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['direction', { 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
];


const StyledDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
}));

function Text(props) {
    return null;
}

Text.propTypes = {children: PropTypes.node};

function MainPage() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const [anchorEl, setAnchorEl] = useState(null);

    const [notesContent, setNotesContent] = useState('');
    const [downanchorEl, setdownAnchorEl] = useState(null);

    const handleClick = (event) => {
        setdownAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setdownAnchorEl(null);
    };
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const notesContentRef = useRef('');

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const StyledReactQuill = styled(ReactQuill)(({ theme }) => ({
        border: '1px solid #e0e0e0',

        minHeight: 'calc(100% - 16px)',
        '& .ql-editor': {
            minHeight: 'calc(100% - 44px)',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

        },
    }));
    const handleQuillChange = useCallback((content) => {
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
        const docDefinition = {
            content: [
                {
                    stack: pdfContent,
                },
            ],
            defaultStyle: {
                font: 'Roboto',
            },
        };
        pdfMake.createPdf(docDefinition).download('notes.pdf');
    };


    return (

            <BackgroundWrapper>
            <StyledAppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'Great Vibes, cursive',
                            color: 'black',
                        }}
                    >
                        ChatNote
                    </Typography>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={()=>{alert(" plz send you feedbacks to davy3232323@gmail.com")}}
                        style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                        Share your feedbacks
                    </Link>
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
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'user-status-menu',
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>

            </StyledAppBar>
            <Box display="flex" height="calc(100vh - 64px)" paddingTop={1}>
                <ChatRoomWrapper component={Paper} elevation={4} >
                    <Typography variant="h6">ChatRoom</Typography>
                    <StyledDivider />
                    <Chatroom/>
                </ChatRoomWrapper>
                <NotesWrapper component={Paper} elevation={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Notes
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
                            open={Boolean(downanchorEl)}
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
                        theme="snow"
                        modules={{ toolbar: quillToolbarOptions }}
                    />


                </NotesWrapper>
            </Box>
            </BackgroundWrapper>

    );
}

export default MainPage;
