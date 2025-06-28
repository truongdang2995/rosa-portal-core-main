
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentFont: string;
  setFont: (font: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentFont, setCurrentFont] = useState<string>('Inter');
  const [fontSize, setFontSize] = useState<string>('medium');
  
  // Load preferences from localStorage on initial render
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const storedFont = localStorage.getItem('font');
    const storedFontSize = localStorage.getItem('fontSize');
    
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === 'true');
    }
    
    if (storedFont) {
      setCurrentFont(storedFont);
    }
    
    if (storedFontSize) {
      setFontSize(storedFontSize);
    }
  }, []);
  
  // Update the document's class when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);
  
  // Update the document's font when currentFont changes
  useEffect(() => {
    document.documentElement.style.fontFamily = currentFont;
    localStorage.setItem('font', currentFont);
  }, [currentFont]);
  
  // Update the document's font size when fontSize changes
  useEffect(() => {
    const rootFontSize = (() => {
      switch (fontSize) {
        case 'small': return '14px';
        case 'medium': return '16px';
        case 'large': return '18px';
        default: return '16px';
      }
    })();
    
    document.documentElement.style.fontSize = rootFontSize;
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const setFont = (font: string) => {
    setCurrentFont(font);
  };
  
  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        currentFont,
        setFont,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
