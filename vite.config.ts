import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


import path from "node:path";
// https://vitejs.dev/config/
export default defineConfig({   
    css: {
        modules: {
          localsConvention: "camelCase",
          generateScopedName: "[name]__[local]__[hash:base64:5]" 
        }
      },
    plugins: [react()],
    resolve: {
        alias: {
            'app': path.resolve("./src/app/"),
            'entities': path.resolve("./src/entities/"),
            'features': path.resolve("./src/features/"),
            'pages': path.resolve("./src/pages/"),
            'shared': path.resolve("./src/shared/"),
            'widgets': path.resolve("./src/widgets/"),
          
        }
      }

});
