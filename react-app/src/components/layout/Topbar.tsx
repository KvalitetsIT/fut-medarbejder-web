import { AppBar, Toolbar, IconButton, Typography, Box, Chip, Button, Divider } from "@mui/material";
import { useState, useContext } from "react";
import { theme } from "../../config/theme";
import MenuIcon from '@mui/icons-material/Menu';
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import keycloak from "../../feature/authentication/Keycloak";
import { LoginOutlined } from "@mui/icons-material";
import { Can } from "../../feature/authentication/logic/Can";
import { Asset, Operation } from "../../feature/authentication/config/ability";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

interface TopbarProps { width: number | string, logo?: JSX.Element, mobileOpen?: boolean, setMobileOpen?: (open: boolean) => void, sidebarDisabled?: boolean }
export function Topbar(props: TopbarProps) {

    const { width, setMobileOpen, mobileOpen, sidebarDisabled } = props

    const handleDrawerToggle = () => setMobileOpen ? setMobileOpen(!mobileOpen ?? false) : {};


    const user = useContext(UserContext)

    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAuth(event.target.checked);
    };
    
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (careTeamId: string) => {
        user!.careTeamId = careTeamId;
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: { sm: theme.palette.primary.main, md: sidebarDisabled ? theme.palette.primary.main : theme.palette.background.default },
                width: { md: sidebarDisabled ? `100%` : `calc(100% - ${width}px)` },
                ml: { sm: `${width}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open menu"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: sidebarDisabled ? 'none' : { md: 'none' } }}
                >

                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: sidebarDisabled ? 'flex' : 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    
                    {props.logo}
                  
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                <Button
                        onClick={handleMenu}
                        sx={{ my: 2, color: 'blue', display: 'block', textTransform: 'none' }}
                        
                    >
                        Careteam A Grp6                   
                    </Button>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    
                        <Divider orientation="vertical" flexItem />
                        <IconButton sx={{ p: 0 }} onClick={handleMenu}>
                            <Chip color="secondary" icon={<TagFacesIcon />} /* avatar={<Avatar>{user?.firstName?.charAt(0)}</Avatar>} */ label={user?.name} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                <MenuItem onClick={() => handleClose("135884")}>Careteam A Grp6</MenuItem>
                
              </Menu>
                    { 
                    //<Can ability={user?.getAbility()} I={Operation.READ} a={Asset.PUBLIC}>
                    //    <IconButton sx={{ p: 0 }} onClick={() => keycloak.login({})}>
                    //        <Chip clickable color="secondary" icon={<LoginOutlined />} /* avatar={<Avatar>{user?.firstName?.charAt(0)}</Avatar>} */ label={"Login"} />
                    //    </IconButton>
                    //</Can>
                    }
                </Box>

            </Toolbar>
        </AppBar>
    )

}
