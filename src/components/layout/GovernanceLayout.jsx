import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LockIcon from '@mui/icons-material/Lock';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const DRAWER_WIDTH = 240;

const navSections = [
  {
    title: 'Data Governance',
    icon: <StorageIcon fontSize="small" />,
    open: true,
    items: [
      { label: 'PII Information Classification', active: true },
      { label: 'Data Dictionary' },
      { label: 'Data Lineage' },
    ],
  },
  {
    title: 'KPI Governance',
    icon: <AssessmentIcon fontSize="small" />,
    items: [{ label: 'KPI Catalog' }],
  },
  {
    title: 'Access Controls',
    icon: <LockIcon fontSize="small" />,
    items: [{ label: 'Role Management' }],
  },
];

/**
 * Enterprise governance shell: sidebar + top header + content area.
 */
function GovernanceLayout({ children, title, subtitle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState({ 'Data Governance': true });

  const toggleSection = (sectionTitle) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1f2937' }}>
          Governance Portal
        </Typography>
      </Box>
      <Divider />
      <List dense sx={{ flex: 1, py: 1 }}>
        <ListItemButton sx={{ py: 0.75 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: '0.8125rem' }} />
        </ListItemButton>

        {navSections.map((section) => (
          <Box key={section.title}>
            <ListItemButton onClick={() => toggleSection(section.title)} sx={{ py: 0.75 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>{section.icon}</ListItemIcon>
              <ListItemText
                primary={section.title}
                primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: 600 }}
              />
              {openSections[section.title] ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )}
            </ListItemButton>
            <Collapse in={openSections[section.title] ?? section.open} unmountOnExit>
              <List component="div" disablePadding dense>
                {section.items.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{
                      pl: 4,
                      py: 0.5,
                      backgroundColor: item.active ? '#fff8e1' : 'transparent',
                      borderLeft: item.active ? '3px solid #f9a825' : '3px solid transparent',
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: '0.75rem',
                        fontWeight: item.active ? 600 : 400,
                        color: item.active ? '#1f2937' : '#4b5563',
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f6f8' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          backgroundColor: '#ffffff',
          color: '#1f2937',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: 48, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              sx={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#f9a825',
                letterSpacing: '-0.02em',
              }}
            >
              Sun Life
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Philippines
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SecurityIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
              <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                MOHAMMAD SHAKEEB FAIZAN
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid #e5e7eb',
              backgroundColor: '#fafbfc',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: '48px',
          p: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5, fontSize: '0.8125rem' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {children}
      </Box>
    </Box>
  );
}

export default GovernanceLayout;
