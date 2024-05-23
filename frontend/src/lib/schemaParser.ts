import schemas from './schemas.json';
import { v4 as uuidv4 } from 'uuid';
import type { DesignToken, TokenType } from './types';

// Define a generic interface for token properties
interface TokenProperty {
  type: string | string[];
  required: boolean;
  [key: string]: any;
}

// Define an interface for the token schema
interface TokenSchema {
  id: {
    $type: TokenType;
    $description: TokenProperty;
    $value: TokenProperty;
    $extensions: TokenProperty;
  };
}

// Parse the JSON schemas
export function parseSchemas(): Record<string, TokenSchema> {
  const parsedSchemas: Record<string, TokenSchema> = {};

  for (const [key, value] of Object.entries(schemas)) {
    parsedSchemas[key] = value as TokenSchema;
  }

  return parsedSchemas;
}

// Initialize tokens based on the schemas
export function initializeTokens(): DesignToken[] {
  const tokens: DesignToken[] = [];

  for (const [type, schema] of Object.entries(parseSchemas())) {
    const token: DesignToken = {
      id: uuidv4(),
      name: type,
      type: schema.id.$type,
      value: schema.id.$value.type === 'object' ? {} : '',
      $description: schema.id.$description.required ? '' : null,
      $extensions: schema.id.$extensions.required ? {} : null,
    };

    tokens.push(token);
  }

  return tokens;
}
