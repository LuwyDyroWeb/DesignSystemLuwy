import type { StorybookConfig } from '@storybook/react-vite';
// import tailwind from '@tailwindcss/vite';


const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  
  async viteFinal(config) {
  
    return config;
  },
};
export default config;