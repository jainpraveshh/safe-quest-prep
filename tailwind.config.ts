import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced Alert-Driven Disaster Colors
        emergency: {
          DEFAULT: "hsl(var(--emergency))",
          foreground: "hsl(var(--emergency-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        // Disaster-Specific Colors
        flood: {
          DEFAULT: "hsl(var(--flood))",
          foreground: "hsl(var(--flood-foreground))",
        },
        earthquake: {
          DEFAULT: "hsl(var(--earthquake))",
          foreground: "hsl(var(--earthquake-foreground))",
        },
        cyclone: {
          DEFAULT: "hsl(var(--cyclone))",
          foreground: "hsl(var(--cyclone-foreground))",
        },
        fire: {
          DEFAULT: "hsl(var(--fire))",
          foreground: "hsl(var(--fire-foreground))",
        },
        // Enhanced Gamification Colors
        badge: {
          gold: "hsl(var(--badge-gold))",
          silver: "hsl(var(--badge-silver))",
          bronze: "hsl(var(--badge-bronze))",
          sparkle: "hsl(var(--achievement-sparkle))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'earthquake': 'var(--earthquake-gradient)',
        'fire': 'var(--fire-gradient)',
        'flood': 'var(--flood-gradient)',
        'cyclone': 'var(--cyclone-gradient)',
        'emergency-pulse': 'var(--emergency-pulse)',
        'alert-glow': 'var(--alert-glow)',
        'safe-zone': 'var(--safe-zone)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'emergency': 'var(--shadow-emergency)',
        'success': 'var(--shadow-success)',
        'warning': 'var(--shadow-warning)',
        'drill': 'var(--shadow-drill)',
        'pulse-ring': 'var(--pulse-ring)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "siren-flash": {
          "0%, 50%": { backgroundColor: "hsl(var(--siren-red))" },
          "25%, 75%": { backgroundColor: "hsl(var(--siren-blue))" },
        },
        "emergency-pulse": {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 hsla(0, 88%, 58%, 0.7)" },
          "70%": { transform: "scale(1.05)", boxShadow: "0 0 0 10px hsla(0, 88%, 58%, 0)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 hsla(0, 88%, 58%, 0)" },
        },
        "drill-active": {
          "0%, 100%": { borderColor: "hsl(var(--emergency))" },
          "50%": { borderColor: "hsl(var(--warning))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "siren-flash": "siren-flash 1s infinite",
        "emergency-pulse": "emergency-pulse 2s infinite",
        "drill-active": "drill-active 1.5s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
