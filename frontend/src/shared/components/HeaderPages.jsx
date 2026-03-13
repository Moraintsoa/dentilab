import { Add, ArrowBack } from '@mui/icons-material'
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material'
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

export const HeaderPagesBackArrow = ({ title, description, isButton = false, onClick, buttonText, urlparent, navTab, children }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '0.5px solid',
            borderColor: 'divider',
            px: 2,
            py: 1.5,
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0}}>
                <IconButton
                    size="small"
                    onClick={() => navigate(urlparent)}
                    sx={{
                        borderColor: 'divider',
                        borderRadius: 1.5,
                        "&:hover":{
                            bgcolor: 'background.default',
                        }
                    }}
                >
                    <ArrowBack color="primary" fontSize="small" />
                </IconButton>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                    <Typography variant="body2" fontWeight={600}>{title}</Typography>
                    <Typography variant="caption" color="text.secondary">{description}</Typography>
                </Box>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* <CustomTabs NAV_TABS={navTab} /> */}
            {children}


            {isButton && (
                <>
                    <Divider orientation="vertical" flexItem />
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={onClick}
                        size="small"
                        sx={{ borderRadius: 1.5, px: 2, textTransform: 'none', flexShrink: 0 }}
                    >
                        {buttonText}
                    </Button>
                </>
            )}
        </Box>
    )
}
