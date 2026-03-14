import React from 'react'
import { HeaderPages } from '../../../shared/components/HeaderPages'
import { ApartmentOutlined, CreditCardOutlined, EditLocationAltOutlined, LockOutline, LockOutlined, NotificationsActiveOutlined, ReceiptLongOutlined, SettingsOutlined, WatchLaterOutlined } from '@mui/icons-material'
import { Box, useTheme } from '@mui/material'
import { CustomTabs } from '../../../shared/components/CustomTabs'
import { Outlet } from 'react-router-dom'

export const Parametres = () => {
    const NAV_TABS = [
        { label: 'Cabinet', to: 'cabinet', icon: <ApartmentOutlined fontSize="small" /> },
        { label: 'Sécurité', to: 'securite', icon: <LockOutlined fontSize="small" /> },
        { label: 'Tarifs', to: 'tarifs', icon: <CreditCardOutlined fontSize="small" /> },
        { label: 'Horaires', to: 'horaires', icon: <WatchLaterOutlined fontSize="small" /> },
        { label: 'Facturation', to: 'facturation', icon: <ReceiptLongOutlined fontSize="small" /> },
        { label: 'Notifications', to: 'notifications', icon: <NotificationsActiveOutlined fontSize="small" /> },
    ]
    const theme = useTheme()
    return (
        <>
            <HeaderPages icon={<SettingsOutlined sx={{ color: theme.palette.primary.main }} fontSize="medium" />} title={'Paramètres'} description={'Configurez votre cabinet et vos préférences'} />
            <CustomTabs NAV_TABS={NAV_TABS} />
            <Box sx={{ mt: 2 }}>
                <Outlet />
            </Box>
        </>
    )
}
