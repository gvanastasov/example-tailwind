/**
 * @description Every section of the config file is optional, 
 * so you only have to specify what you’d like to change. Any 
 * missing sections will fall back to Tailwind’s default 
 * configuration. 
 * https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js 
 * 
 * @type {import('tailwindcss').Config} 
 */
module.exports = {
  /**
   * The content section is where you configure the paths to 
   * all of your HTML templates, JS components, and any other 
   * files that contain Tailwind class names.
   * https://tailwindcss.com/docs/content-configuration
   */
  content: ["./src/index.ejs", "./src/sections/**/*.ejs"],

  /**
   * The theme section is where you define your color palette, 
   * fonts, type scale, border sizes, breakpoints — anything 
   * related to the visual design of your site.
   * https://tailwindcss.com/docs/theme
   */
  theme: {
    extend: {
      aspectRatio: {
        'custom': '0.5 / 1'
      },
      colors: {
        'placeholder': '#ccc',
      },
      listStyleImage: {
        checkmark: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNCAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjMzhiZGY4Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy42ODUuMTUzYS43NTIuNzUyIDAgMCAxIC4xNDMgMS4wNTJsLTggMTAuNWEuNzUuNzUgMCAwIDEtMS4xMjcuMDc1bC00LjUtNC41YS43NS43NSAwIDAgMSAxLjA2LTEuMDZsMy44OTQgMy44OTMgNy40OC05LjgxN2EuNzUuNzUgMCAwIDEgMS4wNS0uMTQzWiIgLz48L3N2Zz4=")'
      },
      content: {
        lorem: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
      }
    },

    container: {
      center: true,
      padding: '2rem'
    },
  },

  /**
   * he plugins section allows you to register plugins with Tailwind that can be 
   * used to generate extra utilities, components, base styles, or custom variants.
   */
  // plugins: [],

  /**
   * The presets section allows you to specify your own custom base configuration 
   * instead of using Tailwind’s default base configuration.
   */
  // presets: [],

  /**
   * The prefix option allows you to add a custom prefix to all of Tailwind’s 
   * generated utility classes. This can be really useful when layering Tailwind 
   * on top of existing CSS where there might be naming conflicts.
   */
  // prefix: 'tw',

  /**
   * The important option lets you control whether or not Tailwind’s utilities 
   * should be marked with !important. This can be really useful when using Tailwind 
   * with existing CSS that has high specificity selectors.
   */
  // important: true,

  /**
   * The separator option lets you customize which character should be used to 
   * separate modifiers (screen sizes, hover, focus, etc.) from utility names 
   * (text-center, items-end, etc.).
   */
  // separator: '_',

  /**
   * The corePlugins section lets you completely disable classes that Tailwind 
   * would normally generate by default if you don’t need them for your project.
   */
  // corePlugins: {
  //   preflight: false,
  // }
}

