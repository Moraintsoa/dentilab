import { Add, ArrowBack } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomTabs } from './CustomTabs'

export const HeaderPages = ({ icon, title, description, isButton = false, onClick, buttonText }) => {
    return (
        < Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {icon}
                    <Typography variant="h5" fontWeight={700}>{title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </Box>

            {isButton && (
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={onClick}
                    sx={{ borderRadius: 2, px: 2, py: 1, textTransform: "none" }}
                >
                    {buttonText}
                </Button>)}
        </Box >
    )
}

export const HeaderPagesBackArrow = ({ title, description, isButton = false, onClick, buttonText, urlparent, navTab }) => {
    const navigate = useNavigate()
    const theme = useTheme()
    return (
        < Grid container sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', mb: 3 }}>
            <Grid size={{ xs: 12, md: 3 }}>
                <Box sx={{ display: 'flex' }}>
                    <IconButton sx={{ mr: 1 }} onClick={() => navigate(urlparent)}>
                        <ArrowBack sx={{ color: theme.palette.primary.main }} fontSize="medium" />
                    </IconButton>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 1 }}>
                        <Typography variant="h6" fontWeight={700}>{title}</Typography>
                        <Typography variant="body2" color="text.secondary">{description}</Typography>
                    </Box>
                </Box>
            </Grid>
            <CustomTabs NAV_TABS={navTab} />
            {
                isButton && (
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={onClick}
                        sx={{ borderRadius: 2, px: 2, py: 1, textTransform: "none" }}
                    >
                        {buttonText}
                    </Button>)
            }
        </Grid >
    )
}

