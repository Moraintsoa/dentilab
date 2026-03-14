import {
    ApartmentOutlined,
    EditLocationAltOutlined,
    FmdGoodOutlined,
    MapOutlined,
    PhoneOutlined,
    PublicOutlined,
    SaveOutlined,
} from '@mui/icons-material'
import {
    Alert,
    alpha,
    Box,
    Button,
    Grid,
    InputAdornment,
    MenuItem,
    TextField,
    Typography,
    useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import paysData from '../../../data/madagascar_collectivites.json'
import { SectionCard } from './SectionCard'

// ─────────────────────────────────────────────
// Helpers JSON
// ─────────────────────────────────────────────
// const getPays = () => paysData.madagascar.pays
const getProvinces = () =>
    paysData.madagascar.provinces.map(p => p.nom)

const getRegions = (provinceName) => {
    const province = paysData.madagascar.provinces.find(p => p.nom === provinceName)
    return province ? province.regions.map(r => r.nom) : []
}

const getDistricts = (provinceName, regionName) => {
    const province = paysData.madagascar.provinces.find(p => p.nom === provinceName)
    const region = province?.regions.find(r => r.nom === regionName)
    return region ? region.districts.map(d => d.nom) : []
}

const getCommunes = (provinceName, regionName, districtName) => {
    const province = paysData.madagascar.provinces.find(p => p.nom === provinceName)
    const region = province?.regions.find(r => r.nom === regionName)
    const district = region?.districts.find(d => d.nom === districtName)
    return district ? district.communes.map(c => c.nom) : []
}

const getFokontany = (provinceName, regionName, districtName, communeName) => {
    const province = paysData.madagascar.provinces.find(p => p.nom === provinceName)
    const region = province?.regions.find(r => r.nom === regionName)
    const district = region?.districts.find(d => d.nom === districtName)
    const commune = district?.communes.find(c => c.nom === communeName)
    return commune ? commune.fokontany : []
}

// ─────────────────────────────────────────────
// State initial
// ─────────────────────────────────────────────
const INITIAL_STATE = {
    nom_cabinet: '',
    telephone: '',
    pays: '',
    province: '',
    region: '',
    district: '',
    commune: '',
    fokontany: '',
    adresse: '',
}

// ─────────────────────────────────────────────
// Composant principal
// ─────────────────────────────────────────────
export const CabinetForm = () => {
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    // Cascade de reset géographique
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => {
            const updated = { ...prev, [name]: value }
            if (name === 'province') { updated.region = ''; updated.district = ''; updated.commune = ''; updated.fokontany = '' }
            if (name === 'region') { updated.district = ''; updated.commune = ''; updated.fokontany = '' }
            if (name === 'district') { updated.commune = ''; updated.fokontany = '' }
            if (name === 'commune') { updated.fokontany = '' }
            return updated
        })
        if (error) setError(null)
        if (success) setSuccess(null)
    }



    // Options dynamiques
    const optionsMap = {
        pays: ['Madagascar'],
        province: getProvinces(),
        region: getRegions(formData.province),
        district: getDistricts(formData.province, formData.region),
        commune: getCommunes(formData.province, formData.region, formData.district),
        fokontany: getFokontany(formData.province, formData.region, formData.district, formData.commune),
    }

    const isDisabled = (name) => ({
        province: !formData.pays,
        region: !formData.province,
        district: !formData.region,
        commune: !formData.district,
        fokontany: !formData.commune,
    }[name] ?? false)

    // Helper pour les TextField communs
    const fieldSx = { '& .MuiOutlinedInput-root': { borderRadius: 2 } }

    const adornment = (icon) => ({
        startAdornment: (
            <InputAdornment position="start">
                {React.cloneElement(icon, { fontSize: 'small', sx: { color: 'text.disabled' } })}
            </InputAdornment>
        ),
    })

    return (
        <Box>
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError(null)}>  {error}   </Alert>}
            {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setSuccess(null)}>{success} </Alert>}

            {/* ── Section 1 : Informations du cabinet ─────────── */}
            <SectionCard
                icon={<ApartmentOutlined fontSize="small" />}
                title="Informations du cabinet"
                badge="Profil public"
            >
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth name="nom_cabinet" label="Nom du cabinet *"
                            value={formData.nom_cabinet} onChange={handleChange}
                            InputProps={adornment(<ApartmentOutlined />)} sx={fieldSx} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth name="telephone" label="Téléphone *" type="tel"
                            value={formData.telephone} onChange={handleChange}
                            InputProps={adornment(<PhoneOutlined />)} sx={fieldSx} />
                    </Grid>
                </Grid>
            </SectionCard>

            {/* ── Section 2 : Localisation ────────────────────── */}
            <SectionCard
                icon={<EditLocationAltOutlined fontSize="small" />}
                title="Localisation du cabinet"
            >
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth select name="pays" label="Pays *"
                            value={formData.pays} onChange={handleChange}
                            InputProps={{ ...adornment(<PublicOutlined />) }}
                            sx={{ fieldSx, }}>
                            {optionsMap.pays.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </TextField>
                    </Grid>
                    {/* Province */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth select name="province" label="Province *"
                            value={formData.province} onChange={handleChange}
                            disabled={isDisabled('province')}
                            InputProps={adornment(<MapOutlined />)} sx={fieldSx}>
                            {optionsMap.province.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </TextField>
                    </Grid>

                    {/* Région */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth select name="region" label="Région *"
                            value={formData.region} onChange={handleChange}
                            disabled={isDisabled('region')}
                            InputProps={adornment(<MapOutlined />)} sx={fieldSx}>
                            {optionsMap.region.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </TextField>
                    </Grid>

                    {/* District */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth select name="district" label="District *"
                            value={formData.district} onChange={handleChange}
                            disabled={isDisabled('district')}
                            InputProps={adornment(<ApartmentOutlined />)}
                            sx={fieldSx}>
                            {optionsMap.district.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </TextField>
                    </Grid>

                    {/* Commune */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth select name="commune" label="Commune *"
                            value={formData.commune} onChange={handleChange}
                            disabled={isDisabled('commune')}
                            InputProps={adornment(<FmdGoodOutlined />)} sx={fieldSx}>
                            {optionsMap.commune.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </TextField>
                    </Grid>

                    {/* Fokontany */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth select name="fokontany" label="Fokontany *"
                            value={formData.fokontany} onChange={handleChange}
                            disabled={isDisabled('fokontany')}
                            InputProps={adornment(<FmdGoodOutlined />)} sx={fieldSx}>
                            {optionsMap.fokontany.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </TextField>
                    </Grid>

                    {/* Adresse */}
                    <Grid size={12}>
                        <TextField fullWidth name="adresse" label="Adresse exacte *"
                            value={formData.adresse} onChange={handleChange}
                            placeholder='Lot Vs 0011'
                            InputProps={adornment(<FmdGoodOutlined />)} sx={fieldSx} />
                    </Grid>

                </Grid>
            </SectionCard>



            {/* ── Actions ─────────────────────────────────────── */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 1 }}>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={()=>{}}
                    startIcon={<SaveOutlined fontSize="small" />}
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, height: 56 }}
                >
                    Enregistrer les modifications
                </Button>
            </Box>
        </Box>
    )
}