import { Box, Grid, Avatar, Chip, IconButton, Typography, useTheme, alpha, Tooltip } from '@mui/material'
import { MoreVertOutlined, GroupOutlined, PersonAddAltOutlined, LocalHospitalOutlined, CalendarTodayOutlined, OpenInNewOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { HeaderPages } from '../../../shared/components/HeaderPages'
import { StatsCard } from '../../../shared/components/StatsCard'
import { DataTable } from '../../../shared/components/DataTable'
import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'
import api from '../../../shared/services/Api'

const STATUT_COLORS = {
  'Actif': 'success',
  'En traitement': 'warning',
  'Inactif': 'default',
}
const columns = [
  {
    key: 'patient',
    label: 'Patient',
    width: 240,
    render: (row) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            fontSize: 15,
            fontWeight: 600,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {row.prenom?.[0] || '?'}
          {row.nom?.[0] || '?'}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap fontWeight={600}>
            {row.prenom} {row.nom}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            Âge: {Math.floor((new Date() - new Date(row.date_naissance)) / 31557600000)} ans
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    key: 'telephone',
    label: 'Téléphone',
    width: 140,
    render: (row) => (
      <Typography variant="body2" fontFamily="monospace">
        {row.telephone}
      </Typography>
    ),
  },
  {
    key: 'genre',
    label: 'Genre',
    width: 140,
    render: (row) => (
      <Typography variant="body2" color="text.secondary">
        {row.genre}
      </Typography>
    ),
  },
  {
    key: 'actions',
    label: '',
    width: 120,
    align: 'right',
    render: (row) => (
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
        <Tooltip title="Details du patient">
          <NavLink to={`/patients/${row.id}`} onClick={(e) => e.stopPropagation()} style={{ textDecoration: 'none' }}>
            <IconButton size="small" color="info"><OpenInNewOutlined fontSize="small" /></IconButton>
          </NavLink>
        </Tooltip>
        <Tooltip title="Modifier">
          <NavLink to={`/patients/${row.id}/edit`} onClick={(e) => e.stopPropagation()} style={{ textDecoration: 'none' }}>
            <IconButton size="small" color="info"><EditOutlined fontSize="small" /></IconButton>
          </NavLink>
        </Tooltip>
        <Tooltip title="Supprimer">
          <IconButton
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

// ─── Rendu mobile ──────────────────────────────────────────────────────────────

// ─── Page ──────────────────────────────────────────────────────────────────────
export const Patients = () => {
  const [patients, setPatients] = useState([])
  const Navigate = useNavigate()
  const theme = useTheme()

  const patientMobileCard = (row) => (
    <Box onClick={() => Navigate(`/patients/${row.id}`)} key={row.id} sx={{
      p: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper',
      borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ width: 36, height: 36, fontSize: 13, bgcolor: 'primary.main' }}>
          {row.prenom[0]}{row.nom[0]}
        </Avatar>
        <Box>
          <Typography fontSize={13} fontWeight={600}>{row.prenom} {row.nom}</Typography>
          <Typography fontSize={12} color="text.secondary">{row.telephone}</Typography>
          <Typography fontSize={12} color="text.secondary">
            {row.genre} - {Math.floor((new Date() - new Date(row.date_naissance)) / 31557600000)} ans
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
          <Tooltip title="Details du patient">
            <NavLink to={`/patients/${row.id}`} onClick={(e) => e.stopPropagation()} style={{ textDecoration: 'none' }}>
              <IconButton size="small" color="info"><OpenInNewOutlined fontSize="small" /></IconButton>
            </NavLink>
          </Tooltip>
          <Tooltip title="Modifier">
            <NavLink to={`/patients/${row.id}/edit`} onClick={(e) => e.stopPropagation()} style={{ textDecoration: 'none' }}>
              <IconButton size="small" color="info"><EditOutlined fontSize="small" /></IconButton>
            </NavLink>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton size="small" color="error"><DeleteOutline fontSize="small" /></IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('patient/patients/')
        setPatients(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement des patients:', error)
      }
    }
    fetchPatients()

  }, [])

  return (
    <Box>
      <HeaderPages
        icon={<GroupOutlined sx={{ color: theme.palette.primary.main }} fontSize="medium" />}
        title="Patients"
        description="Liste des patients"
        isButton={true}
        buttonText="Ajouter un patient"
        onClick={() => { }}
      />

      <Grid container spacing={2}>
        <StatsCard
          title="Total Patients"
          icon={<GroupOutlined sx={{ color: theme.palette.primary.main }} fontSize="small" />}
          statnumber={patients.length}
          description="Nombre total des patients du cabinet"
        />
        <StatsCard
          title="Nouveaux ce mois"
          icon={<PersonAddAltOutlined sx={{ color: theme.palette.primary.main }} fontSize="small" />}
          statnumber={patients.filter(p => {
            const createdAt = new Date(p.date_creation);
            const now = new Date();
            return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
          }).length}
          description="Nouveaux patients enregistrés ce mois"
        />
        <StatsCard
          title="En traitement"
          icon={<LocalHospitalOutlined sx={{ color: theme.palette.primary.main }} fontSize="small" />}
          statnumber={3}
          description="Patients en cours de traitement actif"
        />
        <StatsCard
          title="RDV aujourd'hui"
          icon={<CalendarTodayOutlined sx={{ color: theme.palette.primary.main }} fontSize="small" />}
          statnumber={7}
          description="Rendez-vous planifiés pour aujourd'hui"
        />
      </Grid>

      <Box sx={{ mt: 4 }}>
        <DataTable
          theme={theme}
          rows={patients.length > 0 ? patients : []}
          columns={columns}
          searchPlaceholder="Rechercher un patient..."
          onRowClick={(row) => Navigate(`/patients/${row.id}`)}
          searchFilter={(row, q) =>
            `${row.prenom} ${row.nom}`.toLowerCase().includes(q.toLowerCase()) ||
            row.telephone.includes(q)
          }
          filters={[
            {
              key: 'genre',
              label: 'Genre',
              options: ['Homme', 'Femme'],
              match: (row, val) => row.genre === val,
            }
          ]}
          mobileCard={patientMobileCard}
          emptyMessage="Aucun patient trouvé"
          sx={{ "& .MuiDataTable-row": { cursor: 'pointer' } }}
        />
      </Box>
    </Box>
  )
}