// CSS Module declarations (committed — expo-env.d.ts is git-ignored)

// CSS Modules — used by animated-icon.web.tsx
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Plain CSS side-effect imports — used by theme.ts via @/global.css
declare module '*.css' {}
