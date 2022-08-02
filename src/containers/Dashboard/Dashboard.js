import { Box, Typography, Container } from '@mui/material';
import React from 'react';

function Dashboard(props) {
    return (
        <Box component="main">
            <Container>
                <Typography variant='h4'>
                    Dashboard
                </Typography>
            </Container>
        </Box>
    );
}

export default Dashboard;