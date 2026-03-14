import { Approval, Apps, AssignmentIndOutlined, ReceiptLongOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { HeaderPagesBackArrow } from '../../../shared/components/HeaderPages'
import { Outlet, useParams } from 'react-router-dom'
import { CustomTabs } from '../../../shared/components/CustomTabs'
import api from '../../../shared/services/Api'

const NAV_TABS = [
    { label: 'Odontogramme', to: 'odontogramme', icon: <Apps fontSize="small" /> },
    { label: 'Historique de consultations', to: 'historiqueconsultations', icon: <Approval fontSize="small" /> },
    { label: 'Facturations du patient', to: 'facturations', icon: <ReceiptLongOutlined fontSize="small" /> },
    { label: 'Informations du patient', to: 'informations', icon: <AssignmentIndOutlined fontSize="small" /> },
]

export const DetailPatient = () => {
    const [patientDetails, setPatientDetails] = useState(null);
    const { id } = useParams()

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {

                const response = await api.get(`/patient/patients/${id}`);
                setPatientDetails(response.data);
            } catch (error) {
                console.error('Error fetching patient details:', error)
            }
        }

        fetchPatientDetails();
    }, [id])
    return (
        <Box>
            <HeaderPagesBackArrow
                title={`${patientDetails?.prenom} ${patientDetails?.nom}`}
                description={`${patientDetails?.genre} · ${Math.floor((new Date() - new Date(patientDetails?.date_naissance)) / 31557600000)} ans`}
                urlparent={'/patients'}
            >
                <CustomTabs NAV_TABS={NAV_TABS} />
            </HeaderPagesBackArrow>

            <Box sx={{ mt: 2 }}>
                <Outlet />
            </Box>

        </Box>
    )
}