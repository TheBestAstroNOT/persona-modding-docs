// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Persona Modding Docs',
  tagline: 'Welcome to the world of Persona Modding!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://persona-modding-docs.netlify.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AnimatedSwine37', // Usually your GitHub org/user name.
  projectName: 'persona-modding-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({ docPath }) => {
            if (!docPath) {
              return "https://persona-modding-docs.netlify.app/admin"; // Default to admin page
            }
        
            const parts = docPath.split('/');
            const folder = parts.length > 1 ? parts[0] : 'documentation'; // Default to "documentation" if no subfolder
            // @ts-ignore
            const filename = parts.pop().replace('.mdx', '').replace('.md', ''); // Ensure no file extension
        
            return `https://persona-modding-docs.netlify.app/admin/#/collections/${folder}/entries/${filename}`;
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({ blogPath }) => {
            if (!blogPath) {
              return "https://persona-modding-docs.netlify.app/admin/#/collections/blog";
            }
        
            // Extract the filename without extension
            const parts = blogPath.split("/");
            // @ts-ignore
            const filename = parts.pop().replace(".mdx", "").replace(".md", "");
        
            return `https://persona-modding-docs.netlify.app/admin/#/collections/blog/entries/${filename}`;
          },
            
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Persona Modding Docs',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'Sidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/AnimatedSwine37/persona-modding-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
