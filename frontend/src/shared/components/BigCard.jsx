import { MoneyOutlined } from '@mui/icons-material'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import StatsChart from './CustomBarChart'

export const BigCard = ({ icon, title, children }) => {
    const theme = useTheme()
    return (
        <Grid size={{xs:12, sm:12 ,md:12, lg:6}} sx={{
            mt: 3,
            p: 2.5,
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: theme.shadows[1],
        }}>
            <Box sx={{ display: 'flex' }} >
                <Box sx={{ mr: 1 }}>
                    {icon}
                </Box>
                <Typography variant="body1" fontWeight={600} gutterBottom>
                    {title}
                </Typography>
            </Box>
            <Box sx={{ height: 300, }} >
                {children}
            </Box>
        </Grid>
    )
}
