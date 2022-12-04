/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

const path = require("path");
module.exports = {
  siteMetadata: {
    title: "Jia Wei",
    description:
      "I'm a front-end developer passionate about building simple, beautiful and responsive website",
    sign: "I build simple website",
    contact: "leongjw98@gmail.com",
    whatsapp: "https://wa.link/s1uxa5",
    github: "https://github.com/jia-wei-00",
    linkedin: "https://www.linkedin.com/in/leong-jia-wei-/",
  },

  plugins: [
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-breakpoints",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": path.resolve(__dirname, "src/components"),
          "@images": path.resolve(__dirname, "src/images"),
          "@pages": path.resolve(__dirname, "src/pages"),
          "@styles": path.resolve(__dirname, "src/styles"),
        },
        extensions: ["js"],
      },
    },
  ],
};
