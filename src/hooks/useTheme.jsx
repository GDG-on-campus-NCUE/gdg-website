'use client';

// 使用 React Context 讓所有元件共享主題狀態
import { createContext, useContext } from 'react';

// 全站固定深色：<html data-theme="dark"> 已在 layout.jsx 由伺服器端輸出，這裡不再切換
const VALUE = { theme: 'dark', isLoaded: true };

const ThemeContext = createContext(VALUE);

export function ThemeProvider({ children }) {
    return <ThemeContext.Provider value={VALUE}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}
