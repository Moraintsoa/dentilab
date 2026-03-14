import { EmailOutlined, LockOutlined, PasswordOutlined, SaveOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { alpha, Box, Button, Grid, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { SectionCard } from './SectionCard'

// ─────────────────────────────────────────────
// Indicateur de force du mot de passe
// ─────────────────────────────────────────────
const PasswordStrength = ({ password }) => {
    const theme = useTheme()
    const checks = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ]
    const score  = checks.filter(Boolean).length
    const labels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort']
    const colors = [
        theme.palette.error.main,
        theme.palette.warning.main,
        theme.palette.warning.light,
        theme.palette.success.light,
        theme.palette.success.main,
    ]
    return (
        <Box>
            <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
                {[0, 1, 2, 3].map(i => (
                    <Box key={i} sx={{
                        flex: 1, height: 4, borderRadius: 2,
                        bgcolor: i < score ? colors[score] : alpha(theme.palette.divider, 0.4),
                        transition: 'background-color 0.3s',
                    }} />
                ))}
            </Box>
            <Typography variant="caption" sx={{ color: colors[score] }}>
                {labels[score]}
                {score < 4 && (
                    <span style={{ color: theme.palette.text.secondary }}>
                        {' — '}
                        {!checks[0] && 'min. 8 caractères · '}
                        {!checks[1] && 'une majuscule · '}
                        {!checks[2] && 'un chiffre · '}
                        {!checks[3] && 'un caractère spécial'}
                    </span>
                )}
            </Typography>
        </Box>
    )
}

// ─────────────────────────────────────────────
// Helpers communs
// ─────────────────────────────────────────────
const fieldSx = { '& .MuiOutlinedInput-root': { borderRadius: 2 } }

const adornmentStart = (icon) => ({
    startAdornment: (
        <InputAdornment position="start">
            {React.cloneElement(icon, { fontSize: 'small', sx: { color: 'text.disabled' } })}
        </InputAdornment>
    ),
})

// ─────────────────────────────────────────────
// Sous-formulaire : changement d'email
// ─────────────────────────────────────────────
const EmailForm = () => {
    const [data, setData]       = useState({ email: ''})
    const [error, setError]     = useState(null)
    const [success, setSuccess] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
        if (error)   setError(null)
        if (success) setSuccess(null)
    }


    const canSubmit     = data.email

    const handleSubmit = () => {
        if (!canSubmit) return
        // TODO : appel API
        setSuccess('Adresse email mise à jour.')
        setData({ email: '' })
    }

    return (
        <SectionCard
            icon={<EmailOutlined fontSize="small" />}
            title="Adresse email"
            badge="Identifiant"
        >
            <Grid container spacing={2} alignItems="flex-start">
                <Grid size={12}>
                    <TextField
                        fullWidth
                        name="email"
                        label="Nouvel email *"
                        type="email"
                        value={data.email}
                        onChange={handleChange}
                        InputProps={adornmentStart(<EmailOutlined />)}
                        sx={fieldSx}
                    />
                </Grid>
                <Grid size={{ xs: 12}} sx={{ display: 'flex', alignItems: 'flex-start', pt: '2px' }}>
                    <Button
                        fullWidth
                        variant="contained"
                        disableElevation
                        disabled={!canSubmit}
                        onClick={handleSubmit}
                        startIcon={<SaveOutlined fontSize="small" />}
                        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, height: 56 }}
                    >
                        Mettre à jour
                    </Button>
                </Grid>
            </Grid>

            {success && (
                <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                    ✓ {success}
                </Typography>
            )}
        </SectionCard>
    )
}

// ─────────────────────────────────────────────
// Sous-formulaire : changement de mot de passe
// ─────────────────────────────────────────────
const PasswordForm = () => {
    const [data, setData]       = useState({ password: '', new_password: '', confirm_new_password: '' })
    const [showPwd, setShowPwd] = useState({ password: false, new_password: false, confirm_new_password: false })
    const [error, setError]     = useState(null)
    const [success, setSuccess] = useState(null)

    const togglePwd = (field) => setShowPwd(prev => ({ ...prev, [field]: !prev[field] }))

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
        if (error)   setError(null)
        if (success) setSuccess(null)
    }

    const pwdAdornment = (field) => ({
        startAdornment: (
            <InputAdornment position="start">
                <LockOutlined fontSize="small" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
        ),
        endAdornment: (
            <InputAdornment position="end">
                <IconButton size="small" onClick={() => togglePwd(field)} edge="end">
                    {showPwd[field] ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
            </InputAdornment>
        ),
    })

    const pwdMismatch = !!data.confirm_new_password && data.confirm_new_password !== data.new_password
    const canSubmit   = data.password && data.new_password && data.confirm_new_password && !pwdMismatch

    const handleSubmit = () => {
        if (!canSubmit) return
        // TODO : appel API
        setSuccess('Mot de passe mis à jour.')
        setData({ password: '', new_password: '', confirm_new_password: '' })
    }

    return (
        <SectionCard
            icon={<PasswordOutlined fontSize="small" />}
            title="Mot de passe"
            badge="Sécurité"
        >
            <Grid container spacing={2} alignItems="flex-start">
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        name="password"
                        label="Mot de passe actuel *"
                        type={showPwd.password ? 'text' : 'password'}
                        value={data.password}
                        onChange={handleChange}
                        InputProps={pwdAdornment('password')}
                        sx={fieldSx}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        name="new_password"
                        label="Nouveau mot de passe *"
                        type={showPwd.new_password ? 'text' : 'password'}
                        value={data.new_password}
                        onChange={handleChange}
                        InputProps={pwdAdornment('new_password')}
                        sx={fieldSx}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        name="confirm_new_password"
                        label="Confirmer le nouveau *"
                        type={showPwd.confirm_new_password ? 'text' : 'password'}
                        value={data.confirm_new_password}
                        onChange={handleChange}
                        error={pwdMismatch}
                        helperText={pwdMismatch ? 'Les mots de passe ne correspondent pas' : ' '}
                        InputProps={pwdAdornment('confirm_new_password')}
                        sx={fieldSx}
                    />
                </Grid>
            </Grid>

            {/* Indicateur de force */}
            {data.new_password && (
                <Box sx={{ mt: 1 }}>
                    <PasswordStrength password={data.new_password} />
                </Box>
            )}

            {/* Bouton soumission */}
            <Box sx={{ }}>
                {success && (
                    <Typography variant="caption" color="success.main" sx={{ alignSelf: 'center', mr: 2 }}>
                        ✓ {success}
                    </Typography>
                )}
                <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                    startIcon={<SaveOutlined fontSize="small" />}
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, height: 56 }}
                >
                    Changer le mot de passe
                </Button>
            </Box>
        </SectionCard>
    )
}

// ─────────────────────────────────────────────
// Composant exporté principal
// ─────────────────────────────────────────────
export const SecuriteForm = () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: {md:'1fr 1fr'}, gap: 2 }}>
        <EmailForm />
        <PasswordForm />
    </Box>
)