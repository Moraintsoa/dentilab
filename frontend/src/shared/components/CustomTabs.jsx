import { alpha, Grid, Tab, Tabs, useTheme } from '@mui/material'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export const CustomTabs = ({ NAV_TABS }) => {
    const theme = useTheme()
    const { pathname } = useLocation()
    const activeIndex = NAV_TABS.findIndex(tab => pathname.includes(tab.to))

    return (
        <Tabs
            value={activeIndex === -1 ? 0 : activeIndex}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{
                flex: 1,
                minHeight: 36,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                '& .MuiTabs-flexContainer': {
                    gap: 0.5,
                },
                '& .MuiTabs-scrollButtons': {
                    width: 28,
                    '&.Mui-disabled': { opacity: 0, width: 0 },
                },
            }}
        >
            {NAV_TABS.map((tab) => (
                <Tab
                    key={tab.to}
                    component={NavLink}
                    to={tab.to}
                    icon={tab.icon}
                    iconPosition="start"
                    label={tab.label}
                    sx={{
                        minHeight: 36,
                        px: 2,
                        gap: 0.75,
                        fontWeight: 400,
                        fontSize: 13,
                        textTransform: 'none',
                        color: 'text.secondary',
                        borderRadius: 1.5,
                        transition: 'all 0.15s',
                        '&.Mui-selected': {
                            fontWeight: 500,
                            color: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                        },
                        '&:hover': {
                            color: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.04),
                        },
                    }}
                />
            ))}
        </Tabs>
    )
}