import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { pwaPlugin } from "@vuepress/plugin-pwa";
import { seoPlugin } from "@vuepress/plugin-seo";
import { searchPlugin } from "@vuepress/plugin-search";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { mediumZoomPlugin } from "@vuepress/plugin-medium-zoom";
import { kotlinPlayground, mdEnhancePlugin } from "vuepress-plugin-md-enhance";


export default defineUserConfig({


  shouldPrefetch: false,
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
        repo: 'https://github.com/worldline/learning-kotlin-multiplatform',
        repoLabel: '⭐ Contribute!',
   

        sidebar: [
          { text: 'Home', link: '/' },
          "/0.language/",
          "/1.overview/",
          "/2.configure/",
          "/3.ui/",
          "/4.nav/",
          "/5.res/",
          "/6.arch/",
          "/7.connect/",
          "/8.preferences/",
          "/9.database/",
        ], 
  }),

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  plugins: [
    seoPlugin({
      hostname: "https://worldline.github.io/learning-kotlin-multiplatform",
    }),
    searchPlugin({
      locales: {
        "/": {
          placeholder: "Search...",
        },
      },
    }),
    pwaPlugin({
      update: "hint",
      cacheHTML: true,
      manifest: {
        icons: [
          {
            src: "/learning-kotlin-multiplatform/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/learning-kotlin-multiplatform/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    mdEnhancePlugin({
      kotlinPlayground : true,
    }),

  ]
  });