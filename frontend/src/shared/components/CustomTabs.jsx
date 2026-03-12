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
                TabIndicatorProps={{
                    style: {
                        display: 'none',
                    }
                }}
                sx={{
                    bgcolor: 'background.paper',
                    width: 'fit-content',
                    maxWidth: '100%',
                    minHeight: 20,
                    borderRadius: 1,
                    '& .MuiTabs-root': { px: 1 },
                }}
            >
                {NAV_TABS.map((tab, i) => (
                    <Tab
                        key={tab.to}
                        component={NavLink}
                        to={tab.to}
                        icon={tab.icon}
                        iconPosition="start"
                        label={tab.label}
                        sx={{
                            minHeight: 20,
                            px: 3,
                            fontWeight: 700,
                            gap: 1,
                            fontSize: 13,
                            textTransform: 'none',
                            color: 'text.secondary',
                            transition: 'all 0.2s',
                            '&.Mui-selected': {
                                color: theme.palette.primary.main,

                                bgcolor: alpha(theme.palette.primary.main, 0.06),
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
