import { LocalHospitalOutlined } from '@mui/icons-material'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

export const StatsCard = ({ title, statnumber, description, icon }) => {
    const theme = useTheme()
    return (
            <Grid size={{xs:12, sm: 6, md: 6, lg:3 }}>
                <Box
                    sx={{
                        p: 2.5,
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 2,
                        boxShadow: theme.shadows[1],
                        height: "100%"
                    }}
                >
                    <Box sx={{ display: 'flex' }} >
                        <Box>
                            <Typography variant="body2" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="h4" fontWeight={600} gutterBottom>{statnumber}</Typography>
                        </Box>
                        <Box sx={{ ml: 'auto' }}>
                            {icon}
                        </Box>
                    </Box>
                    <Typography variant="body3" color="text.secondary">
                        {description}
                    </Typography>
                </Box>
            </Grid>
    )
}
