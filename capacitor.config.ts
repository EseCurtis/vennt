import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ventt.dezrektech',
  appName: 'ventt-io',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
