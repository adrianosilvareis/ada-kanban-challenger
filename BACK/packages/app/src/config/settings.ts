import { NotFoundError } from '@/http-status/not-found-error';

export function getEnvOrDefault(envName: string, defaultValue: string): string {
  return process.env[envName] ?? defaultValue;
}

export function getEnvOrThrow(envName: string): string {
  const value = process.env[envName];
  if (value === undefined) {
    throw new NotFoundError(`Enviroment ${envName} not found!`);
  }
  return value;
}

export const EXPRESS_PORT = Number(getEnvOrDefault('EXPRESS_PORT', '5000'));
