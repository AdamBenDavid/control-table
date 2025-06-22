// @ts-check
import { Styling } from 'agrippa';
import { defineConfig } from 'agrippa';

export default defineConfig({
  options: {
    baseDir: './src',
    styling: Styling.SCSS,
    styleFileOptions: {
      module: true,
    },
  },
});
