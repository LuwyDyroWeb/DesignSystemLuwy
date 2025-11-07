import type { Preview } from '@storybook/react-vite'

import '@luwy-dyro/tokens/css/preset.css';

import '../src/ld-button.css';

import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;