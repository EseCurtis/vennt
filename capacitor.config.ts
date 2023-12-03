import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ventt.dezrektech',
  appName: 'ventt-io',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
