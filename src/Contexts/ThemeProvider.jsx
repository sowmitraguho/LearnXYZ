import React, { useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
    return (
        <ThemeContext value={{theme, setTheme}}>
            {children}
        </ThemeContext>
    );
};

export default ThemeProvider;