import { defaultTheme } from "@vuepress/theme-default";
import { searchPlugin } from "@vuepress/plugin-search";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { pwaPlugin } from "@vuepress/plugin-pwa";
import { seoPlugin } from "vuepress-plugin-seo2";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  
  base: "/learning-kotlin-multiplatform/",
  port: 3000,

  head: [
    ["link", { rel: "icon", href: "/learning-kotlin-multiplatform/favicon.ico" }],
    [
      "link",
      { rel: "manifest", href: "/learning-kotlin-multiplatform/manifest.webmanifest" },
    ],
    ["meta", { name: "theme-color", content: "#bf4092" }],
  ],

  theme: defaultTheme({
        logo: 'logo_worldline.png',

        sidebar: [
          { text: 'Home', link: '/' },
          "/overview/",
          "/configure/",
          "/ui/",
          "/nav/",
          "/res/",
          "/arch/",
          "/network/",
          "/preferences/",
          "/database/",


        ], 
  }),

  plugins: [
    seoPlugin({
      hostname: "https://worldline.github.io/learning-kotlin-multiplatform",
    }),
  ],
});
