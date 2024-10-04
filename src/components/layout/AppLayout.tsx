/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/components/AppLayout.tsx
 * PROGRAM NAME   : AppLayout.tsx
 *                : レイアウト：アプリレイアウト
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';

import SideBar from '../common/SideBar';

const drawerWidth = 240;


export default function AppLayo() {

  //-----------------------------------------//
  // useState：状態管理
  //-----------------------------------------//
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  //-----------------------------------------//
  // ドロワークローズ関数
  //-----------------------------------------//
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  //-----------------------------------------//
  // ドロワーアニメーション終了時関数
  //-----------------------------------------//
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  //-----------------------------------------//
  // ドロワートグル関数
  //-----------------------------------------//
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <Box sx={{ display: "flex", bgcolor: (theme) => theme.palette.grey[100], minHeight: "100vh" }}>

      <CssBaseline />

      {/* ヘッダー */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            {/* ハンバガーメニュー */}
            <MenuIcon />

          </IconButton>

          <Typography variant="h6" noWrap component="div">
            TypeScript x React 家計簿
          </Typography>

        </Toolbar>

      </AppBar>

      {/* サイドバー */}
      <SideBar
        drawerWidth = {drawerWidth}
        mobileOpen = {mobileOpen}
        handleDrawerClose = {handleDrawerClose}
        handleDrawerTransitionEnd = {handleDrawerTransitionEnd}
      />

      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Outlet />

      </Box>

    </Box>
  );
}
