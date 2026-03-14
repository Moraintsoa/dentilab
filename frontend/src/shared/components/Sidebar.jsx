import {
    Avatar,
    Box,
    Drawer,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";

import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

import {
    CalendarMonthRounded,
    CategoryOutlined,
    DashboardOutlined,
    GroupOutlined,
    LocalHospitalOutlined,
    LogoutOutlined,
    QueryStatsOutlined,
    ReceiptLongOutlined,
    SettingsOutlined
} from "@mui/icons-material";

export const Sidebar = ({ open, onClose }) => {

    const { logout } = useAuth()
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        { icon: <DashboardOutlined />, label: "Dashboard", path: "/dashboard" },
        { icon: <GroupOutlined />, label: "Patients", path: "/patients" },
        { icon: <LocalHospitalOutlined />, label: "Consultation", path: "/consultations" },
        { icon: <CalendarMonthRounded />, label: "Rendez-vous", path: "/rendezvous" },
        { icon: <ReceiptLongOutlined />, label: "Facturation", path: "/facturation" },
        { icon: <CategoryOutlined />, label: "Inventaire", path: "/inventaire" },
        { icon: <QueryStatsOutlined />, label: "Rapports", path: "/rapports" },
        { icon: <SettingsOutlined />, label: "Paramètres", path: "/parametres" },
    ]

    return (
        <Grid
            sx={{
                width: open ? 240 : 60,
                height: "100%",
                transition: "width 0.3s",
                display: "flex",
                flexDirection: "column",
                bgcolor: theme.palette.primary.main,
                overflow: "hidden",
                flexShrink: 0,
            }}
        >
            <List
                subheader={
                    <ListSubheader
                        sx={{
                            height: 60,
                            ml: -0.9,
                            bgcolor: theme.palette.primary.main,
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Avatar src="/logo.svg" />
                        {open && (
                            <Typography sx={{ ml: 1, fontWeight: 700, color: theme.palette.text.tertiary }}>
                                Dentilab
                            </Typography>
                        )}
                    </ListSubheader>
                }
            >
                {menuItems.map((item, index) => {

                    const isActive = location.pathname.includes(item.path)

                    const button = (
                        <ListItemButton
                            key={index}
                            onClick={() => {
                                navigate(item.path)
                                if (onClose) onClose()
                            }}
                            sx={{
                                py: 1.5,
                                backgroundColor: isActive
                                    ? "rgba(255,255,255,0.15)"
                                    : "transparent",
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.1)"
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: theme.palette.text.tertiary, minWidth: 35 }}>
                                {item.icon}
                            </ListItemIcon>
                            {open && (
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{ fontSize: 14, color: theme.palette.text.tertiary }}
                                />
                            )}
                        </ListItemButton>
                    )

                    return open ? (
                        button
                    ) : (
                        <Tooltip key={index} title={item.label} placement="right">
                            {button}
                        </Tooltip>
                    )
                })}
            </List>

            {/* LOGOUT */}
            <Box sx={{ mt: "auto", mb: 1 }}>
                <ListItemButton onClick={logout} sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)"} }}>
                    <ListItemIcon sx={{ color: theme.palette.text.tertiary, minWidth: 35 }}>
                        <LogoutOutlined />
                    </ListItemIcon>
                    {open && (
                        <Typography sx={{ color: theme.palette.text.tertiary }}>
                            Logout
                        </Typography>
                    )}
                </ListItemButton>
            </Box>

        </Grid>
    )
}

export const SidebarInDrawer = ({ onClose, open }) => {
    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            sx={{
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box"
                }
            }}
        >
            <Sidebar open={true} onClose={onClose} />
        </Drawer>
    )
}