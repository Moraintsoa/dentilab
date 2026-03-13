import React, { useEffect, useState, useMemo } from 'react';
import { Box, Grid, Paper, Typography, Divider, Chip, Tooltip as MuiTooltip } from "@mui/material";
import { Odontogram } from "react-odontogram";
import api from '../../../shared/services/Api';
import { useParams } from 'react-router-dom';
import { Add, Bolt, Build, Cancel, Diamond, Done, Error, Healing, Link, MedicalServices, Warning } from '@mui/icons-material';
import { Dentdetailcard } from './Dentdetailcard';
import { alpha, useTheme } from '@mui/material';

export const Odontogramme = () => {
    const { id } = useParams();
    const theme = useTheme();
    const [odontogrammeData, setOdontogrammeData] = useState([]);
    const [selectedTeeth, setSelectedTeeth] = useState(null);

    const all_condition = useMemo(() => [
        { statut: "sain", label: "Sain", fill: "#E5E7EB", outline: "#6B7280", icon: <Done fontSize='small' />, color: "success" },
        { statut: "carie", label: "Carie", fill: "#433e3e", outline: "#121111", icon: <Error fontSize='small' />, color: "disabled" },
        { statut: "plombe", label: "Plombé", fill: "#FBBF24", outline: "#B45309", icon: <Build fontSize='small' />, color: "warning" },
        { statut: "absente", label: "Absente", fill: "#e5e7eb00", outline: "#6b728000", icon: <Cancel fontSize='small' />, color: "disabled" },
        { statut: "couronne", label: "Couronne", fill: "#FACC15", outline: "#B45309", icon: <Diamond fontSize='small' />, color: "warning" },
        { statut: "implant", label: "Implant", fill: "#22C55E", outline: "#166534", icon: <MedicalServices fontSize='small' />, color: "success" },
        { statut: "obturee", label: "Obturée", fill: "#3B82F6", outline: "#1D4ED8", icon: <Healing fontSize='small' />, color: "info" },
        { statut: "fracturee", label: "Fracturée", fill: "#EF4444", outline: "#B91C1C", icon: <Warning fontSize='small' />, color: "error" },
        { statut: "devitalisee", label: "Dévitalisée", fill: "#A78BFA", outline: "#5B21B6", icon: <Bolt fontSize='small' />, color: "secondary" },
        { statut: "bridge", label: "Bridge", fill: "#9CA3AF", outline: "#374151", icon: <Link fontSize='small' />, color: "default" },
    ], []);

    useEffect(() => {
        const fetchOdontogramme = async () => {
            try {
                const response = await api.get(`/patient/odontogrammes/${id}`);
                setOdontogrammeData(response.data.dents);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'odontogramme :", error);
            }
        };
        if (id) fetchOdontogramme();
    }, [id]);

    const formattedConditions = useMemo(() => {
        return all_condition.map(condition => {
            const dents = odontogrammeData
                .filter(dent => dent.statut_actuel === condition.statut)
                .map(dent => `teeth-${dent.numero}`);
            if (dents.length === 0) return null;
            return { label: condition.label, teeth: dents, fillColor: condition.fill, outlineColor: condition.outline };
        }).filter(Boolean);
    }, [odontogrammeData, all_condition]);

    const handleToothClick = (selectedList) => {
        if (selectedList?.length > 0) {
            const fdiNumber = selectedList[0]?.notations?.fdi;
            setSelectedTeeth(odontogrammeData.find(dent => String(dent.numero) === String(fdiNumber)) || null);
        } else {
            setSelectedTeeth(null);
        }
    };

    const renderTooltip = (payload) => {
        const tooth = odontogrammeData.find(d => `teeth-${d.numero}` === payload.id);
        const condition = all_condition.find(c => c.statut === tooth?.statut_actuel);
        return (
            <Paper elevation={3} sx={{ p: 1.5, minWidth: 140, borderRadius: 2 }}>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                    {tooth?.nom_complet || 'Dent inconnue'}
                </Typography>
                <Divider sx={{ my: 0.75 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.75 }}>
                    <Box sx={{
                        width: 10, height: 10, borderRadius: '50%',
                        bgcolor: condition?.fill || '#ccc',
                        border: `1px solid ${condition?.outline || '#999'}`,
                        flexShrink: 0,
                    }} />
                    <Typography variant="caption" color="text.secondary">
                        {condition?.label || tooth?.statut_actuel || 'Sain'}
                    </Typography>
                </Box>
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
                    N° FDI : {tooth?.numero}
                </Typography>
            </Paper>
        );
    };

    // Compte par statut pour la légende
    const countByStatut = useMemo(() => {
        return all_condition.reduce((acc, c) => {
            acc[c.statut] = odontogrammeData.filter(d => d.statut_actuel === c.statut).length;
            return acc;
        }, {});
    }, [odontogrammeData, all_condition]);

    return (
        <Grid container spacing={3}>
            

            {/* Odontogramme */}
            <Grid size={{ xs: 12, md: 9 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                <Box elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 3, width: '50%', display: 'flex', justifyContent: 'center' }}>
                    <Odontogram
                        onChange={handleToothClick}
                        teethConditions={formattedConditions}
                        tooltip={{ placement: "top", content: renderTooltip }}
                        singleSelect
                    />
                </Box>
            </Grid>

            {/* Détail dent */}
            <Grid size={{ xs: 12, md: 3 }}>
                <Dentdetailcard
                    selectedTeeth={selectedTeeth}
                    allConditions={all_condition}
                    odontogrammeData={formattedConditions}
                    countByStatut={countByStatut}
                />
            </Grid>
        </Grid>
    );
};









// import React, { useEffect, useState, useMemo } from 'react';
// import { Box, Grid, Paper, Typography, Divider, Chip, Link } from "@mui/material";
// import { Odontogram } from "react-odontogram";
// import api from '../../../shared/services/Api';
// import { useParams } from 'react-router-dom';
// import { Add, Bolt, Build, Cancel, Diamond, Done, Error, Healing, MedicalServices, Warning } from '@mui/icons-material';
// import { Dentdetailcard } from './Dentdetailcard';


// export const Odontogramme = () => {
//   const { id } = useParams();
//   const [odontogrammeData, setOdontogrammeData] = useState([]);
//   const [selectedTeeth, setSelectedTeeth] = useState(null);


//   const all_condition = useMemo(() => [
//     { statut: "sain", label: "Sain", fill: "#E5E7EB", outline: "#6B7280", icon: <Done fontSize='small' />, color: "success" },
//     { statut: "carie", label: "Carie", fill: "#433e3e", outline: "#121111", icon: <Error fontSize='small' />, color: "disabled" },
//     { statut: "plombe", label: "Plombé", fill: "#FBBF24", outline: "#B45309", icon: <Build fontSize='small' />, color: "warning" },
//     { statut: "absente", label: "Absente", fill: "#e5e7eb00", outline: "#6b728000", icon: <Cancel fontSize='small' />, color: "disabled" },
//     { statut: "couronne", label: "Couronne", fill: "#FACC15", outline: "#B45309", icon: <Diamond fontSize='small' />, color: "warning" },
//     { statut: "implant", label: "Implant", fill: "#22C55E", outline: "#166534", icon: <MedicalServices fontSize='small' />, color: "success" },
//     { statut: "obturee", label: "Obturée", fill: "#3B82F6", outline: "#1D4ED8", icon: <Healing fontSize='small' />, color: "info" },
//     { statut: "fracturee", label: "Fracturée", fill: "#EF4444", outline: "#B91C1C", icon: <Warning fontSize='small' />, color: "error" },
//     { statut: "devitalisee", label: "Dévitalisée", fill: "#A78BFA", outline: "#5B21B6", icon: <Bolt fontSize='small' />, color: "secondary" },
//     { statut: "bridge", label: "Bridge", fill: "#9CA3AF", outline: "#374151", icon: <Link fontSize='small' />, color: "default" },
//   ], []);

//   // Chargement des données
//   useEffect(() => {
//     const fetchOdontogramme = async () => {
//       try {
//         const response = await api.get(`/patient/odontogrammes/${id}`);
//         setOdontogrammeData(response.data.dents);
//       } catch (error) {
//         console.error("Erreur lors de la récupération de l'odontogramme :", error);
//       }
//     };
//     if (id) fetchOdontogramme();
//   }, [id]);

//   // Calculer les conditions pour react-odontogram
//   // On utilise useMemo pour éviter que l'odontogramme ne re-render inutilement
//   const formattedConditions = useMemo(() => {
//     return all_condition.map(condition => {
//       const dents = odontogrammeData
//         .filter(dent => dent.statut_actuel === condition.statut)
//         .map(dent => `teeth-${dent.numero}`);

//       if (dents.length === 0) return null;

//       return {
//         label: condition.label,
//         teeth: dents,
//         fillColor: condition.fill,
//         outlineColor: condition.outline
//       };
//     }).filter(Boolean);
//   }, [odontogrammeData, all_condition]);

//   // Gestion du clic sur une dent
//   const handleToothClick = (selectedList) => {
//     if (selectedList && selectedList.length > 0) {
//       const fdiNumber = selectedList[0]?.notations?.fdi;
//       const found = odontogrammeData.find(dent => String(dent.numero) === String(fdiNumber));
//       setSelectedTeeth(found || null);
//     } else {
//       setSelectedTeeth(null);
//     }
//   };

//   // Contenu du Tooltip
//   const renderTooltip = (payload) => {
//     const tooth = odontogrammeData.find(d => `teeth-${d.numero}` === payload.id);
//     return (
//       <Box sx={{ p: 1, minWidth: 120, border: '1px solid #ccc' }}>
//         <Typography variant="body2" fontWeight="bold">
//           {tooth?.nom_complet || "Dent inconnue"}
//         </Typography>
//         <Typography variant="caption" display="block">
//           Statut: {tooth?.statut_actuel || "sain"}
//         </Typography>
//         <Typography variant="caption" color="textSecondary">
//           N° FDI: {tooth?.numero}
//         </Typography>
//       </Box>
//     );
//   };

//   return (
//     <Grid container spacing={4}>
//       {/* Colonne de Gauche : Légende */}
//       <Grid size={{ xs: 12, md: 3 }}>
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>Légende</Typography>
//           <Divider sx={{ mb: 2 }} />
//           {all_condition.map((c) => (
//             <Box key={c.statut} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//               <Box sx={{ width: 16, height: 16, bgcolor: c.fill, border: `1px solid ${c.outline}`, mr: 1, borderRadius: '4px' }} />
//               <Typography variant="body2">{c.label}</Typography>
//             </Box>
//           ))}
//         </Paper>
//       </Grid>

//       {/* Colonne Centrale : L'Odontogramme */}
//       <Grid size={{ xs: 12, md: 'grow' }} sx={{justifyContent: 'center', justifyItems:'center',}}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems:'center', md:{width: '30%'} }}>
//           <Odontogram
//             onChange={handleToothClick}
//             teethConditions={formattedConditions}
//             tooltip={{
//               placement: "top",
//               content: renderTooltip
//             }}
//             singleSelect
//           />
//         </Box>
//       </Grid>

//       {/* Colonne de Droite : Détails */}
//       <Grid size={{ xs: 12, md: 3 }}>
//         <Dentdetailcard selectedTeeth={selectedTeeth} allConditions={all_condition} odontogrammeData={formattedConditions} />
//       </Grid>
//     </Grid>
//   );
// };