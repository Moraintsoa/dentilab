import React, { useEffect, useState, useMemo } from 'react';
import { Box, Grid, Paper, Typography, Divider, Chip, Link } from "@mui/material";
import { Odontogram } from "react-odontogram";
import api from '../../../shared/services/Api';
import { useParams } from 'react-router-dom';
import { Add, Bolt, Build, Cancel, Diamond, Done, Error, Healing, MedicalServices, Warning } from '@mui/icons-material';

const MonChip = ({ statut, allConditions }) => {
  const condition = allConditions.find(c => c.statut === statut);
  return (
    <Chip icon={condition?.icon} color={condition?.color} label={condition?.label} variant='outlined' />
  );
};

export const Odontogramme = () => {
  const { id } = useParams();
  const [odontogrammeData, setOdontogrammeData] = useState([]);
  const [selectedTeeth, setSelectedTeeth] = useState(null);


  const all_condition = useMemo(() => [
    { statut: "sain", label: "Sain", fill: "#E5E7EB", outline: "#6B7280", icon: <Done fontSize='small' />, color: "success" },
    { statut: "carie", label: "Carie", fill: "#433e3e", outline: "#121111", icon: <Error fontSize='small' />, color: "error" },
    { statut: "plombe", label: "Plombé", fill: "#FBBF24", outline: "#B45309", icon: <Build fontSize='small' />, color: "warning" },
    { statut: "absente", label: "Absente", fill: "#e5e7eb00", outline: "#6b728000", icon: <Cancel fontSize='small' />, color: "disabled" },
    { statut: "couronne", label: "Couronne", fill: "#FACC15", outline: "#B45309", icon: <Diamond fontSize='small' />, color: "warning" },
    { statut: "implant", label: "Implant", fill: "#22C55E", outline: "#166534", icon: <MedicalServices fontSize='small' />, color: "success" },
    { statut: "obturee", label: "Obturée", fill: "#3B82F6", outline: "#1D4ED8", icon: <Healing fontSize='small' />, color: "info" },
    { statut: "fracturee", label: "Fracturée", fill: "#EF4444", outline: "#B91C1C", icon: <Warning fontSize='small' />, color: "error" },
    { statut: "devitalisee", label: "Dévitalisée", fill: "#A78BFA", outline: "#5B21B6", icon: <Bolt fontSize='small' />, color: "secondary" },
    { statut: "bridge", label: "Bridge", fill: "#9CA3AF", outline: "#374151", icon: <Link fontSize='small' />, color: "default" },
  ], []);

  // Chargement des données
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

  // Calculer les conditions pour react-odontogram
  // On utilise useMemo pour éviter que l'odontogramme ne re-render inutilement
  const formattedConditions = useMemo(() => {
    return all_condition.map(condition => {
      const dents = odontogrammeData
        .filter(dent => dent.statut_actuel === condition.statut)
        .map(dent => `teeth-${dent.numero}`);

      if (dents.length === 0) return null;

      return {
        label: condition.label,
        teeth: dents,
        fillColor: condition.fill,
        outlineColor: condition.outline
      };
    }).filter(Boolean);
  }, [odontogrammeData, all_condition]);

  // Gestion du clic sur une dent
  const handleToothClick = (selectedList) => {
    if (selectedList && selectedList.length > 0) {
      const fdiNumber = selectedList[0]?.notations?.fdi;
      const found = odontogrammeData.find(dent => String(dent.numero) === String(fdiNumber));
      setSelectedTeeth(found || null);
    } else {
      setSelectedTeeth(null);
    }
  };

  // Contenu du Tooltip
  const renderTooltip = (payload) => {
    const tooth = odontogrammeData.find(d => `teeth-${d.numero}` === payload.id);
    return (
      <Box sx={{ p: 1, minWidth: 120, border: '1px solid #ccc' }}>
        <Typography variant="body2" fontWeight="bold">
          {tooth?.nom_complet || "Dent inconnue"}
        </Typography>
        <Typography variant="caption" display="block">
          Statut: {tooth?.statut_actuel || "sain"}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          N° FDI: {tooth?.numero}
        </Typography>
      </Box>
    );
  };

  return (
    <Grid container spacing={3} sx={{alignItems: 'flex-start' }}>
      {/* Colonne de Gauche : Légende */}
      {/* <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Légende</Typography>
          <Divider sx={{ mb: 2 }} />
          {all_condition.map((c) => (
            <Box key={c.statut} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: c.fill, border: `1px solid ${c.outline}`, mr: 1, borderRadius: '4px' }} />
              <Typography variant="body2">{c.label}</Typography>
            </Box>
          ))}
        </Paper>
      </Grid> */}

      {/* Colonne Centrale : L'Odontogramme */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width:'65%' }}>
          <Odontogram
            onChange={handleToothClick}
            teethConditions={formattedConditions}
            tooltip={{
              placement: "top",
              content: renderTooltip
            }}
            singleSelect
          />
        </Box>
      </Grid>

      {/* Colonne de Droite : Détails */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper sx={{ p: 2, }}>
          {selectedTeeth && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <Typography variant="h6" gutterBottom>Dent {selectedTeeth?.numero}</Typography>
            <Typography variant="body2"> {selectedTeeth?.nom_complet}</Typography>
            <MonChip statut={selectedTeeth.statut_actuel} allConditions={all_condition} />
          </Box>}
          <Divider sx={{ my: 2 }} />
          {selectedTeeth ? (
            <Box>
              
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
              Sélectionnez une dent sur le schéma pour voir ses informations.
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};