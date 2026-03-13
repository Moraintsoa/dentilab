import React, { useEffect, useState } from 'react'
import {
    Box, Button, CircularProgress, Divider, FormControl, FormControlLabel,
    FormLabel, Grid, InputAdornment, MenuItem, Paper, Radio, RadioGroup,
    TextField, Typography, Alert, IconButton, useTheme, alpha
} from '@mui/material'
import {
    PersonOutlined, CakeOutlined, PhoneOutlined, MedicalServicesOutlined,
    ShieldOutlined, BadgeOutlined, ArrowBack, Save, PersonAddAlt1Outlined
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../shared/services/Api'
import { useAuth } from '../../../shared/hooks/useAuth'
import { HeaderPagesBackArrow } from '../../../shared/components/HeaderPages'

const FIELD_SECTIONS = [
    {
        title: 'Informations personnelles',
        icon: <PersonOutlined fontSize="small" />,
        fields: [
            { name: 'prenom', label: 'Prénom', type: 'text', icon: <PersonOutlined />, size: { xs: 12, md: 6 }, required: true },
            { name: 'nom', label: 'Nom', type: 'text', icon: <PersonOutlined />, size: { xs: 12, md: 6 }, required: true },
            { name: 'date_naissance', label: 'Date de naissance', type: 'date', icon: <CakeOutlined />, size: { xs: 12, md: 6 }, required: true },
            { name: 'telephone', label: 'Téléphone', type: 'tel', icon: <PhoneOutlined />, size: { xs: 12, md: 6 }, required: true },
        ]
    },
    {
        title: 'Informations médicales',
        icon: <MedicalServicesOutlined fontSize="small" />,
        fields: [
            { name: 'allergies', label: 'Allergies', type: 'textarea', size: { xs: 12 }, rows: 3 },
            { name: 'antecedents', label: 'Antécédents médicaux', type: 'textarea', size: { xs: 12 }, rows: 3 },
        ]
    },
    {
        title: 'Assurance & Administratif',
        icon: <ShieldOutlined fontSize="small" />,
        fields: [
            { name: 'mutuelle', label: 'Mutuelle', type: 'text', icon: <ShieldOutlined />, size: { xs: 12, md: 6 } },
            { name: 'numero_securite_sociale', label: 'N° Sécurité sociale', type: 'text', icon: <BadgeOutlined />, size: { xs: 12, md: 6 } },
        ]
    }
]

const INITIAL_STATE = {
    prenom: '', nom: '', date_naissance: '', genre: 'Homme',
    telephone: '', allergies: '', antecedents: '',
    mutuelle: '', numero_securite_sociale: '',
}

export const PatientForm = () => {
    const { user } = useAuth()
    const theme = useTheme()
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id)

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(isEdit)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    // Charger les données si mode édition
    useEffect(() => {
        if (!isEdit) return
        const fetchPatient = async () => {
            try {
                const response = await api.get(`/patient/patients/${id}/`)
                const p = response.data
                setFormData({
                    prenom: p.prenom || '',
                    nom: p.nom || '',
                    date_naissance: p.date_naissance || '',
                    genre: p.genre || 'Homme',
                    telephone: p.telephone || '',
                    allergies: p.allergies || '',
                    antecedents: p.antecedents || '',
                    mutuelle: p.mutuelle || '',
                    numero_securite_sociale: p.numero_securite_sociale || '',
                })
            } catch {
                setError('Impossible de charger les données du patient.')
            } finally {
                setFetchLoading(false)
            }
        }
        fetchPatient()
    }, [id, isEdit])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (error) setError(null)
        if (success) setSuccess(null)
    }

    const validate = () => {
        if (!formData.prenom.trim()) return 'Le prénom est requis.'
        if (!formData.nom.trim()) return 'Le nom est requis.'
        if (!formData.date_naissance) return 'La date de naissance est requise.'
        if (!formData.telephone.trim()) return 'Le téléphone est requis.'
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationError = validate()
        if (validationError) { setError(validationError); return }

        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            if (isEdit) {
                await api.patch(`/patient/patients/${id}/`, formData)
                setSuccess('Patient mis à jour avec succès.')
            } else {
                await api.post('/patient/patients/', formData)
                setSuccess('Patient créé avec succès.')
                setFormData(INITIAL_STATE)
            }
        } catch (err) {
            const data = err.response?.data
            if (data && typeof data === 'object') {
                const messages = Object.entries(data)
                    .map(([key, val]) => `${key} : ${Array.isArray(val) ? val.join(', ') : val}`)
                    .join(' | ')
                setError(messages)
            } else {
                setError('Une erreur est survenue.')
            }
        } finally {
            setLoading(false)
        }
    }

    if (fetchLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {/* Header */}
            {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <IconButton
                    size="small"
                    onClick={() => navigate(-1)}
                    sx={{ border: '0.5px solid', borderColor: 'divider', borderRadius: 1.5, bgcolor: 'background.paper' }}
                >
                    <ArrowBack fontSize="small" />
                </IconButton>
                <Box>
                    <Typography variant="body1" fontWeight={600}>
                        {isEdit ? 'Modifier le patient' : 'Nouveau patient'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {isEdit ? 'Mettez à jour les informations du patient' : 'Remplissez le formulaire pour créer un patient'}
                    </Typography>
                </Box>
            </Box> */}
            <HeaderPagesBackArrow
                title={isEdit ? 'Modifier le patient' : 'Nouveau patient'}
                description={isEdit ? 'Mettez à jour les informations du patient' : 'Remplissez le formulaire pour créer un patient'}
                urlparent={'/patients'}
            ></HeaderPagesBackArrow>

            <Grid container spacing={3}>
                {/* Colonne principale */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {FIELD_SECTIONS.map((section, si) => (
                        <Paper key={si} elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, mb: 3 }}>
                            {/* Titre section */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Box sx={{
                                    width: 30, height: 30, borderRadius: 1.5,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: theme.palette.primary.main,
                                }}>
                                    {section.icon}
                                </Box>
                                <Typography variant="body2" fontWeight={600}>
                                    {section.title}
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 2.5 }} />

                            <Grid container spacing={2}>
                                {section.fields.map((field) => (
                                    <Grid key={field.name} size={field.size}>
                                        <TextField
                                            fullWidth
                                            name={field.name}
                                            label={field.label + (field.required ? ' *' : '')}
                                            type={field.type === 'textarea' ? 'text' : field.type}
                                            multiline={field.type === 'textarea'}
                                            rows={field.rows}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                                            InputProps={field.icon ? {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        {React.cloneElement(field.icon, { fontSize: 'small', sx: { color: 'text.disabled' } })}
                                                    </InputAdornment>
                                                )
                                            } : undefined}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    ))}
                </Grid>

                {/* Colonne latérale */}
                <Grid size={{ xs: 12, md: 4 }}>
                    {/* Genre */}
                    <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Box sx={{
                                width: 30, height: 30, borderRadius: 1.5,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: theme.palette.primary.main,
                            }}>
                                <PersonAddAlt1Outlined fontSize="small" />
                            </Box>
                            <Typography variant="body2" fontWeight={600}>Genre</Typography>
                        </Box>
                        <Divider sx={{ mb: 2.5 }} />
                        <FormControl>
                            <RadioGroup name="genre" value={formData.genre} onChange={handleChange} row>
                                {['Homme', 'Femme'].map(g => (
                                    <FormControlLabel
                                        key={g} value={g} label={g}
                                        control={<Radio size="small" />}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Paper>

                    {/* Résumé & Actions */}
                    <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, position: 'sticky', top: 16 }}>
                        <Typography variant="body2" fontWeight={600} gutterBottom>Résumé</Typography>
                        <Divider sx={{ mb: 2 }} />

                        {[
                            { label: 'Prénom', value: formData.prenom },
                            { label: 'Nom', value: formData.nom },
                            { label: 'Genre', value: formData.genre },
                            { label: 'Naissance', value: formData.date_naissance },
                            { label: 'Téléphone', value: formData.telephone },
                        ].map(({ label, value }) => (
                            <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, gap: 1 }}>
                                <Typography variant="caption" color="text.disabled">{label}</Typography>
                                <Typography variant="caption" fontWeight={500} color={value ? 'text.primary' : 'text.disabled'}
                                    sx={{ textAlign: 'right', maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {value || '—'}
                                </Typography>
                            </Box>
                        ))}

                        <Divider sx={{ my: 2 }} />

                        {error && (
                            <Alert severity="error" sx={{ mb: 2, borderRadius: 2, fontSize: 12 }}>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert severity="success" sx={{ mb: 2, borderRadius: 2, fontSize: 12 }}>
                                {success}
                            </Alert>
                        )}

                        <Button
                            fullWidth type="submit" variant="contained"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Save fontSize="small" />}
                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, py: 1.25 }}
                        >
                            {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le patient'}
                        </Button>

                        <Button
                            fullWidth variant="text" onClick={() => navigate(-1)}
                            sx={{ mt: 1, borderRadius: 2, textTransform: 'none', color: 'text.secondary' }}
                        >
                            Annuler
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}





// import { ArrowBack } from '@mui/icons-material'
// import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material'
// import React from 'react'
// import { HeaderPagesBackArrow } from '../../../shared/components/HeaderPages'

// export const PatientForm = () => {
//     const theme = useTheme()
//     return (
//         <Box>
//             <HeaderPagesBackArrow
//                 title={`Ajout de Patient`}
//                 description={`Enregistrer les informations du patient`}
//                 urlparent={'/patients'}
//             />
//             <Typography variant='h4' >PatientForm</Typography>
//         </Box>
//     )
// }
