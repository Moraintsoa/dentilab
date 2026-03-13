import { alpha, Box, Chip, Divider, Paper, Tooltip, Typography, useTheme } from '@mui/material'
import React from 'react'

const MonChip = ({ statut, allConditions }) => {
    const condition = allConditions.find(c => c.statut === statut)
    if (!condition) return null
    return (
        <Chip
            icon={condition.icon}
            color={condition.color}
            label={condition.label}
            variant="outlined"
            size="medium"
        />
    )
}

const StatCard = ({ count, label, color }) => {
    const theme = useTheme()
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(color, 0.1),
            border: `1px solid ${alpha(color, 0.25)}`,
            borderRadius: 2,
            p: 1.5,
            gap: 0.25,
        }}>
            <Typography variant="h6" fontWeight={700} sx={{ color, lineHeight: 1 }}>
                {count}
            </Typography>
            <Typography variant="caption" color="text.secondary" textAlign="center">
                {label}
            </Typography>
        </Box>
    )
}

export const Dentdetailcard = ({ selectedTeeth, allConditions, odontogrammeData, countByStatut = {} }) => {
    const theme = useTheme()

    const categorizeTeeth = (teethData) => {
        return teethData.reduce((acc, item) => {
            const label = item.label.toLowerCase()
            if (label === 'sain') acc.sain.push(...item.teeth)
            else if (['carie', 'fracturée'].includes(label)) acc.a_traiter.push(...item.teeth)
            else if (['plombé', 'obturée', 'couronne', 'dévitalisée', 'implant'].includes(label)) acc.soignee.push(...item.teeth)
            else if (['absente', 'bridge'].includes(label)) acc.absent.push(...item.teeth)
            return acc
        }, { sain: [], a_traiter: [], soignee: [], absent: [] })
    }

    const { sain, a_traiter, soignee, absent } = categorizeTeeth(odontogrammeData)

    return (
        <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
            {selectedTeeth ? (
                <>
                    {/* Infos dent */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Box sx={{
                            width: 52, height: 52,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.primary.main, 0.12),
                            border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Typography variant="h6" fontWeight={700} color="primary">
                                {selectedTeeth.numero}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                            {selectedTeeth.nom_complet}
                        </Typography>
                        <MonChip statut={selectedTeeth.statut_actuel} allConditions={allConditions} />
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Modifier l'état */}
                    <Typography variant="caption" fontWeight={600} color="text.disabled" sx={{ mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                        Modifier l'état
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                        {allConditions.map(c => {
                            const isActive = selectedTeeth.statut_actuel === c.statut
                            return (
                                <Tooltip title={c.label} placement="top" key={c.statut}>
                                    <Chip
                                        icon={c.icon}
                                        color={c.color}
                                        label={c.label}
                                        variant={isActive ? 'filled' : 'outlined'}
                                        size="medium"
                                        clickable
                                        onClick={() => { }}
                                        sx={{
                                            fontWeight: isActive ? 600 : 400,
                                            width: '100%',
                                            boxShadow: isActive ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.4)}` : 'none',
                                            transition: 'all 0.15s',
                                        }}
                                    />
                                </Tooltip>
                            )
                        })}
                    </Box>
                </>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body2" color="text.disabled" textAlign="center" fontStyle="italic" sx={{ pt: 1 }}>
                        Sélectionnez une dent pour voir ses détails.
                    </Typography>

                    <Divider />

                    <Typography variant="caption" fontWeight={600} color="text.disabled" sx={{ textTransform: 'uppercase', letterSpacing: 0.8 }}>
                        Résumé
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                        <StatCard count={sain.length} label="Saines" color={theme.palette.success.main} />
                        <StatCard count={soignee.length} label="Soignées" color={theme.palette.warning.main} />
                        <StatCard count={a_traiter.length} label="À traiter" color={theme.palette.error.main} />
                        <StatCard count={absent.length} label="Absentes" color={theme.palette.text.disabled} />
                    </Box>
                    <Divider />
                    <Typography variant="caption" fontWeight={600} color="text.disabled" sx={{ textTransform: 'uppercase', letterSpacing: 0.8 }}>
                        Légende
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                        {allConditions.map((c) => (
                            <Box key={c.statut} sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                px: 1.25, py: 0.75,
                                borderRadius: 1.5,
                                bgcolor: countByStatut[c.statut] > 0 ? alpha(theme.palette.action.selected, 0.08) : 'transparent',
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                                    <Box sx={{
                                        width: 14, height: 14, borderRadius: '3px',
                                        bgcolor: c.fill, border: `1.5px solid ${c.outline}`,
                                        flexShrink: 0,
                                    }} />
                                    <Typography variant="body2">{c.label}</Typography>
                                </Box>
                                {countByStatut[c.statut] > 0 && (
                                    <Typography variant="caption" fontWeight={600} color="text.secondary"
                                        sx={{ bgcolor: 'action.hover', borderRadius: 1, px: 0.75, py: 0.25 }}>
                                        {countByStatut[c.statut]}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Paper>
    )
}