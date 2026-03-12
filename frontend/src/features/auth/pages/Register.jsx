import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    TextField, Button, IconButton, FormControl, InputLabel, OutlinedInput,
    InputAdornment, MenuItem, Alert, Typography, CardContent,
    Box, Container, Paper, useTheme, alpha, CircularProgress,
    Grid
} from "@mui/material";
import {
    VisibilityRounded, VisibilityOffRounded,
    EmailOutlined, LockOutlined,PhoneOutlined,
    BusinessOutlined,
    PlaceOutlined,
} from "@mui/icons-material";
import api from "../../../shared/services/Api";

export const Register = () => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        nom_cabinet: "",
        password: "",
        passwordConfirm: "",
        phone_number: "",
        adresse: "",
        role: "CABINET",
    });

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const togglePasswordConfirmVisibility = () => setShowPasswordConfirm((prev) => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updatedFormData = { ...prev, [name]: value };
            return updatedFormData;
        });
    };

    const requiredFields = {
        email: "Email",
        nom_cabinet: "Nom du cabinet",
        password: "Mot de passe",
        passwordConfirm: "Confirmer le mot de passe",
        phone_number: "Téléphone",
        adresse: "Adresse",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Vérifier si tous les champs sont remplis
        for (const key in requiredFields) {
            if (!formData[key]) {
                setError(`Le champ ${requiredFields[key]} est requis.`);
                return;
            }
        }

        // Vérifier l'email
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(formData.email)) {
            setError("L'email n'est pas valide.");
            return;
        }

        // Vérifier la longueur du mot de passe
        if (formData.password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        // Vérifier si les mots de passe correspondent
        if (formData.password !== formData.passwordConfirm) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        // Envoyer les données
        setLoading(true);
        try {
            await api.post("auth/register/", formData);
            setError(null);
            setSuccess("Votre demande d'inscription a été enregistrée avec succès.");
            setFormData({
                email: "",
                nom_cabinet: "",
                password: "",
                passwordConfirm: "",
                phone_number: "",
                adresse: "",
                role: "CABINET",
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(theme.palette.primary.light, 0.1),
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={10}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            backgroundColor: theme.palette.primary.main
                        }}
                    />
                    <Grid container component={CardContent} spacing={2} sx={{ p: 4 }}>
                        <Grid container size={{ xs: 12, sm: 12, md: 4 }} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid size={12} textAlign={'center'}>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        borderRadius: '50%',
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        mb: 2
                                    }}
                                >
                                    <img
                                        src="/logo.svg"
                                        alt="Logo"
                                        style={{
                                            width: 100,
                                            height: 100,
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                    Complétez le formulaire pour créer votre compte
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container size={{ xs: 12, sm: 12, md: 8 }} component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
                            <Grid size={12} textAlign={'center'}>
                                <Typography
                                    mb={3}
                                    variant="h5"
                                    component="h1"
                                    fontWeight="bold"
                                    color="primary.main"
                                    gutterBottom>
                                    Inscription
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined color="action" />
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Nom du cabinet"
                                    name="nom_cabinet"
                                    value={formData.nom_cabinet}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BusinessOutlined color="action" />
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Mot de passe *</InputLabel>
                                    <OutlinedInput
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LockOutlined color="action" />
                                            </InputAdornment>
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                                    {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Mot de passe"
                                        sx={{ borderRadius: 2 }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Confirmer le mot de passe *</InputLabel>
                                    <OutlinedInput
                                        name="passwordConfirm"
                                        type={showPasswordConfirm ? "text" : "password"}
                                        value={formData.passwordConfirm}
                                        onChange={handleChange}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LockOutlined color="action" />
                                            </InputAdornment>
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePasswordConfirmVisibility} edge="end">
                                                    {showPasswordConfirm ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirmer le mot de passe"
                                        sx={{ borderRadius: 2 }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Téléphone"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneOutlined color="action" />
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Adresse"
                                    name="adresse"
                                    value={formData.adresse}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PlaceOutlined color="action" />
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid size={12}>
                                    {error && (
                                        <Alert
                                            severity="error"
                                            sx={{
                                                borderRadius: 2,
                                                '& .MuiAlert-icon': { alignItems: 'center' }
                                            }}
                                        >
                                            {error}
                                        </Alert>
                                    )}
                                    {success && (
                                        <Alert
                                            severity="success"
                                            sx={{
                                                borderRadius: 2,
                                                '& .MuiAlert-icon': { alignItems: 'center' }
                                            }}
                                        >
                                            {success}
                                        </Alert>
                                    )}
                                </Grid>

                                <Grid container size={{ xs: 12 }}>
                                    <Grid size={{ xs: 12, md: 12, lg: 6 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            disabled={loading}
                                            sx={{
                                                py: 1.5,
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : "Enregistrer la demande"}
                                        </Button>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 12, lg: 6 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mt: 2 }}>
                                            <NavLink
                                                to="/login"
                                                style={{
                                                    textDecoration: 'none',
                                                    color: theme.palette.primary.main,
                                                    fontWeight: 500
                                                }}
                                            >
                                                Vous avez déjà un compte ?
                                            </NavLink>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};