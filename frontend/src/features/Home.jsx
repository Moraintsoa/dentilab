import {
    Grid,
    Typography,
    Box,
    useTheme,
    IconButton
} from "@mui/material"

import React, { useEffect, useState } from "react"
import { useAuth } from "../shared/hooks/useAuth"
import { Sidebar, SidebarInDrawer } from "../shared/components/Sidebar"
import { Outlet } from "react-router-dom"

import {
    MenuOpenOutlined,
    MenuOutlined
} from "@mui/icons-material"

export const Home = () => {

    const { user } = useAuth()
    const theme = useTheme()

    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    const toggleSidebar = () => setSidebarOpen(prev => !prev)

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 900
            setIsMobile(mobile)
            if (mobile) setSidebarOpen(false)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <Grid container sx={{ height: "100vh", flexWrap: "nowrap", overflow: "hidden" }}>

            {!isMobile && <Sidebar open={sidebarOpen} />}

            {isMobile && (
                <SidebarInDrawer
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
            )}

            <Grid
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        height: 60,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.background.paper,
                    }}
                >
                    <IconButton onClick={toggleSidebar}>
                        {sidebarOpen && !isMobile
                            ? <MenuOpenOutlined sx={{ color: theme.palette.primary.main }} />
                            : <MenuOutlined sx={{ color: theme.palette.primary.main }} />
                        }
                    </IconButton>

                    <Box textAlign="right">
                        <Typography fontWeight={600} fontSize={14}>
                            {user?.cabinet}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                            {user?.email}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default, overflowY: "auto" }}>
                    <Outlet />
                </Box>

            </Grid>

        </Grid>
    )
}