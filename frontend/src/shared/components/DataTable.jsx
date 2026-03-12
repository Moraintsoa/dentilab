import {
    Box,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TablePagination,
    Typography,
    Card,
    CardContent,
    useTheme,
    useMediaQuery,
    Divider,
} from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import React, { useState } from 'react'

/**
 * DataTable — composant de tableau réutilisable
 *
 * @param {object[]}  rows              — données à afficher
 * @param {object[]}  columns           — définition des colonnes
 *   @param {string}    columns[].key        — clé dans l'objet row (ou identifiant unique)
 *   @param {string}    columns[].label      — libellé de l'en-tête
 *   @param {function}  [columns[].render]   — (row) => ReactNode  rendu personnalisé de la cellule
 *   @param {string}    [columns[].align]    — 'left' | 'center' | 'right'  (défaut: 'left')
 *   @param {boolean}   [columns[].hideOnMobile] — masquer cette colonne sur mobile
 *
 * @param {string}    [searchPlaceholder]  — placeholder du champ de recherche
 * @param {function}  [searchFilter]       — (row, query) => bool  logique de recherche personnalisée
 *
 * @param {object[]}  [filters]            — filtres déroulants supplémentaires
 *   @param {string}    filters[].key        — clé unique du filtre
 *   @param {string}    filters[].label      — libellé du Select
 *   @param {string[]}  filters[].options    — valeurs possibles
 *   @param {function}  filters[].match      — (row, value) => bool
 *
 * @param {function}  [mobileCard]         — (row) => ReactNode  rendu mobile personnalisé
 *                                           Si absent, rendu générique automatique
 *
 * @param {number[]}  [rowsPerPageOptions] — défaut : [5, 10, 25]
 * @param {number}    [defaultRowsPerPage] — défaut : 5
 * @param {string}    [emptyMessage]       — message si aucun résultat
 */

// ─── Rendu mobile générique (fallback si mobileCard non fourni) ────────────────
const GenericMobileCard = ({ row, columns, theme }) => (
    <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: theme.palette.background.paper }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            {columns.map((col, i) => {
                const value = col.render ? col.render(row) : row[col.key]
                if (i === 0) return (
                    <Typography key={col.key} fontSize={14} fontWeight={600} mb={1}>
                        {value}
                    </Typography>
                )
                return (
                    <Box key={col.key} sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        <Typography fontSize={12} color="text.secondary">{col.label}</Typography>
                        <Typography fontSize={13}>{value}</Typography>
                    </Box>
                )
            })}
        </CardContent>
    </Card>
)

// ─── Vue Desktop ───────────────────────────────────────────────────────────────
const DesktopTable = ({ rows, columns, emptyMessage, theme, onRowClick }) => (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
        <Table size="small">
            <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.background.paper }}>
                    {columns.map(col => (
                        <TableCell
                            key={col.key}
                            align={col.align || 'left'}
                            sx={{ fontWeight: 600 }}
                        >
                            {col.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={columns.length} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                ) : (
                    rows.map((row, i) => (
                        <TableRow key={row.id ?? i} onClick={() => onRowClick?.(row)}
                            sx={{ cursor: onRowClick ? 'pointer' : 'default', "&:hover": { backgroundColor: 'rgba(0,0,0,0.1)' } }} >
                            {columns.map(col => (
                                <TableCell key={col.key} align={col.align || 'left'}>
                                    {col.render ? col.render(row) : (
                                        <Typography fontSize={13}>{row[col.key]}</Typography>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </TableContainer>
)

// ─── Vue Mobile ────────────────────────────────────────────────────────────────
const MobileView = ({ rows, columns, mobileCard, emptyMessage, theme }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, }}>
        {rows.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                {emptyMessage}
            </Typography>
        ) : (
            rows.map((row, i) => (
                mobileCard
                    ? mobileCard(row)
                    : <GenericMobileCard key={row.id ?? i} row={row} columns={columns} theme={theme} />
            ))
        )}
    </Box>
)

// ─── Composant principal ────────────────────────────────────────────────────────
export const DataTable = ({
    rows = [],
    columns = [],
    searchPlaceholder = 'Rechercher...',
    searchFilter,
    filters = [],
    mobileCard,
    rowsPerPageOptions = [5, 10, 25],
    defaultRowsPerPage = 5,
    emptyMessage = 'Aucun résultat trouvé',
    onRowClick,
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [search, setSearch] = useState('')
    const [filterValues, setFilterValues] = useState(
        Object.fromEntries(filters.map(f => [f.key, 'Tous']))
    )
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)

    const handleFilterChange = (key, value) => {
        setFilterValues(prev => ({ ...prev, [key]: value }))
        setPage(0)
    }

    const filteredRows = rows.filter(row => {
        // Recherche textuelle
        const matchSearch = search === '' || (
            searchFilter
                ? searchFilter(row, search)
                : Object.values(row).some(v =>
                    String(v).toLowerCase().includes(search.toLowerCase())
                )
        )
        // Filtres déroulants
        const matchFilters = filters.every(f =>
            filterValues[f.key] === 'Tous' || f.match(row, filterValues[f.key])
        )
        return matchSearch && matchFilters
    })

    const pageRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    return (
        <Box>
            {/* Barre de recherche + filtres */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', bgcolor: theme.palette.background.paper, p: 2, borderRadius: 2 }}>
                <TextField
                    size="small"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(0) }}
                    sx={{ flexGrow: 1, minWidth: 180, bgcolor: theme.palette.background.paper, borderRadius: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        )
                    }}
                />
                {filters.map(f => (
                    <FormControl key={f.key} size="small" sx={{ minWidth: 140, bgcolor: theme.palette.background.paper, borderRadius: 1 }}>
                        <InputLabel>{f.label}</InputLabel>
                        <Select
                            value={filterValues[f.key]}
                            label={f.label}
                            onChange={e => handleFilterChange(f.key, e.target.value)}
                        >
                            <MenuItem value="Tous">Tous</MenuItem>
                            {f.options.map(opt => (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))}
            </Box>

            {/* Contenu : table ou cards selon écran */}
            {isMobile
                ? <MobileView rows={pageRows} columns={columns} mobileCard={mobileCard} emptyMessage={emptyMessage} theme={theme} />
                : <DesktopTable rows={pageRows} columns={columns} emptyMessage={emptyMessage} theme={theme} onRowClick={onRowClick} />
            }

            {/* Pagination */}
            <TablePagination
                component="div"
                count={filteredRows.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value)); setPage(0) }}
                rowsPerPageOptions={rowsPerPageOptions}
                labelRowsPerPage={isMobile ? '' : 'Lignes :'}
                labelDisplayedRows={({ from, to, count }) => `${from}–${to} sur ${count}`}
                sx={{ mt: 1, "& .MuiTablePagination-root": { cursor: 'pointer' } }}
            />
        </Box>
    )
}