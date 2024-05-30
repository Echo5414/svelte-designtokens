import { config } from 'dotenv';
config();
export const EXTENSION_NAMESPACE: string = process.env.EXTENSION_NAMESPACE || 'default.namespace';
