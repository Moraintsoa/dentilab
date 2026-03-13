// features/auth/pages/Login.jsx
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../shared/hooks/useAuth";
import AuthService from "../services/ApiServices";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Alert,
    Typography,
    CardContent,
    CircularProgress,
    Paper,
    Container,
    useTheme,
    alpha
} from '@mui/material';
import { VisibilityRounded, VisibilityOffRounded, LockOutlined, EmailOutlined, ArrowForward } from '@mui/icons-material';

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("L'email et le mot de passe sont requis.");
            return;
        }

        setLoading(true);

        try {
            const data = await AuthService.login({
                email,
                password
            });

            login(data);

            navigate("/");

        } catch (error) {
            if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else {
                setError("Email ou mot de passe incorrect.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={10}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative',
                        // bgcolor: theme.palette.secondary.main,
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                        }}
                    />
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ mb: 2, textAlign: 'center' }}>
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
                            <Typography
                                variant="h5"
                                component="h1"
                                fontWeight="bold"
                                color="primary.main"
                                gutterBottom
                            >
                                Bienvenue
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Connectez-vous pour accéder à votre cabinet dentaire
                            </Typography>
                        </Box>
                        <Box component={'form'} onSubmit={handleLogin} >

                            <FormControl fullWidth margin="normal" variant="outlined" sx={{ mb: 2.5 }}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <OutlinedInput
                                    id="email"
                                    type="email"
                                    value={email}
                                    placeholder='dr.rakotondrabe@gmail.com'
                                    onChange={(e) => setEmail(e.target.value)}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <EmailOutlined color="action" />
                                        </InputAdornment>
                                    }
                                    label="Email"
                                    sx={{ borderRadius: 2 }}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal" variant="outlined" sx={{ mb: 1 }}>
                                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    placeholder='********'
                                    onChange={(e) => setPassword(e.target.value)}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LockOutlined color="action" />
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Mot de passe"
                                    sx={{ borderRadius: 2 }}
                                />
                            </FormControl>
                            {error && (
                                <Alert
                                    severity="error"
                                    sx={{
                                        my: 1,
                                        borderRadius: 2,
                                        '& .MuiAlert-icon': { alignItems: 'center' }
                                    }}
                                >
                                    {error}
                                </Alert>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'end', mb: 3 }}>
                                <NavLink
                                    to="/reset"
                                    style={{
                                        textDecoration: 'none',
                                        color: theme.palette.primary.main,
                                        fontWeight: 500
                                    }}
                                >
                                    Mot de passe oublié ?
                                </NavLink>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type='submit'
                                disabled={loading}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
                            </Button>
                        </Box>
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <NavLink
                                to="/register"
                                style={{
                                    textDecoration: 'none',
                                    color: theme.palette.primary.main,
                                    fontWeight: 500,
                                    display: 'inline-flex',
                                    alignItems: 'center'
                                }}
                            >
                                S'inscrire
                                <ArrowForward sx={{ fontSize: 18, mr: 0.5 }} />
                            </NavLink>
                        </Box>
                    </CardContent>
                </Paper>
            </Container>
        </Box>
    );
};