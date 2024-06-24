import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType:"prompt",
  includeAssests:["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest:{
      name:"Recipes",
      short_name:"Recipes",
      description:"Keep recipe ratings and suggestions",
      icons:[{
              src: "/android-chrome-192x192.png",
              sizes:"192x192",
              type:"image/png"
          },
          {
              src:"/android-chrome-512x512.png",
              sizes:"512x512",
              type:"image/png"
          },
          {
              src: "/apple-touch-icon.png",
              sizes:"180x180",
              type:"image/png"
          },
          {
              src: "/maskable_icon.png",
              sizes:"512x512",
              type:"image/png",
              purpose:"any maskable"
          }
      ],
      theme_color:"#2564eb",
      background_color:"#f5f5f5",
      display:"standalone",
      scope:"/",
      start_url:"/",
      orientation:"portrait"
  }
}

export default defineConfig({
  base: "/",
  plugins: [react(), VitePWA(manifestForPlugIn)],
  preview: {
      port: 80,
      strictPort: true,
  },
  server: {
      port: 80,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:80",
  },
});
