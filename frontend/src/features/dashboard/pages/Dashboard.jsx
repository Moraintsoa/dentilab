import { Add, CalendarMonthRounded, CategoryOutlined, CurrencyExchangeOutlined, DashboardOutlined, GroupOutlined, LocalHospitalOutlined, MoneyOffCsredOutlined, MoneyOutlined, PersonAddAltOutlined, ReceiptLongOutlined } from '@mui/icons-material'
import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import { HeaderPages } from '../../../shared/components/HeaderPages'
import { StatsCard } from '../../../shared/components/StatsCard'
import CustomBarChart from '../../../shared/components/CustomBarChart'
import { BigCard } from '../../../shared/components/BigCard'
import LineChart from '../../../shared/components/CustomLineChart'
import CustomLineChart from '../../../shared/components/CustomLineChart'

export const Dashboard = () => {
    const theme = useTheme()

    return (
        <Box>
            <HeaderPages
                icon={<DashboardOutlined sx={{ color: theme.palette.primary.main }} fontSize="medium" />}
                title={'Dashboard'}
                description={"Vue d'ensemble de votre cabinet"}
            />

            {/* STATS CARDS */}
            <Grid container spacing={2}>
                <StatsCard
                    title={"Patients"}
                    statnumber={150}
                    description={"+12 ce mois"}
                    icon={<GroupOutlined sx={{ color: theme.palette.primary.main }} fontSize="medium" />}
                />
                <StatsCard
                    title={"Consultations aujourd'hui"}
                    statnumber={30}
                    description={"3 en attente"}
                    icon={<CalendarMonthRounded sx={{ color: theme.palette.primary.main }} fontSize="medium" />}
                />
                <StatsCard
                    title={"Factures impayées"}
                    statnumber={10}
                    description={"230 000 Ar"}
                    icon={<ReceiptLongOutlined sx={{ color: theme.palette.primary.main }} fontSize="medium" />}
                />
                <StatsCard
                    title={"Stock faible"}
                    statnumber={5}
                    description={"articles en alerte"}
                    icon={<CategoryOutlined sx={{ color: theme.palette.primary.main }} fontSize="medium" />}
                />
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <BigCard icon={<CurrencyExchangeOutlined sx={{ color: theme.palette.primary.main }} fontSize="medium" />} title={"Finance mensuelle (Ar)"}>
                    <CustomBarChart />
                </BigCard>
                <BigCard icon={<PersonAddAltOutlined sx={{ color: theme.palette.primary.main }} fontSize="medium" />} title={"Nombre des patients mensuelle"}>
                    <CustomLineChart/>
                </BigCard>
            </Grid>
        </Box>
    )
}