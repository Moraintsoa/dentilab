import { ArrowBack } from '@mui/icons-material'
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { HeaderPagesBackArrow } from '../../../shared/components/HeaderPages'

export const PatientForm = () => {
    const theme = useTheme()
    return (
        <Box>
            <HeaderPagesBackArrow
                title={`Ajout de Patient`}
                description={`Enregistrer les informations du patient`}
                urlparent={'/patients'}
            />
            <Typography variant='h4' >PatientForm</Typography>
        </Box>
    )
}
