'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'blue-highlights' | 'mint-condition' | 'mint-dark'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')

    useEffect(() => {
        // Check local storage or system preference on mount
        const savedTheme = localStorage.getItem('theme') as Theme
        if (savedTheme) {
            setTheme(savedTheme)
        } else {
            // Default to dark if no preference found
            setTheme('dark')
        }
    }, [])

    useEffect(() => {
        // Update attribute and persistence when theme changes
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
