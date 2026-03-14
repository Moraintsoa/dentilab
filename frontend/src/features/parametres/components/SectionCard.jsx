import { useTheme } from '@emotion/react'
import { alpha, Box, Chip, Paper, Typography } from '@mui/material'
import React from 'react'

// ─────────────────────────────────────────────
// Composant section réutilisable
// ─────────────────────────────────────────────
export const SectionCard = ({ icon, title, badge, children }) => {
    const theme = useTheme()
    return (
        <Paper
            elevation={0}
            variant="outlined"
            sx={{
                borderRadius: 3,
                mb: 3,
                overflow: 'hidden',
                borderColor: alpha(theme.palette.divider, 0.6),
                transition: 'box-shadow 0.2s',
                '&:hover': {
                    boxShadow: `0 4px 24px ${alpha(theme.palette.primary.main, 0.06)}`,
                },
            }}
        >
            {/* Header coloré */}
            <Box
                sx={{
                    px: 2.5,
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box
                        sx={{
                            width: 32, height: 32, borderRadius: 1.5,
                            bgcolor: alpha(theme.palette.primary.main, 0.12),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: theme.palette.primary.main,
                        }}
                    >
                        {icon}
                    </Box>
                    <Typography variant="body2" fontWeight={700} color="text.primary">
                        {title}
                    </Typography>
                </Box>
                {badge && (
                    <Chip
                        label={badge}
                        size="small"
                        sx={{
                            height: 22,
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            border: 'none',
                        }}
                    />
                )}
            </Box>

            {/* Contenu */}
            <Box sx={{ p: 2.5 }}>
                {children}
            </Box>
        </Paper>
    )
}
