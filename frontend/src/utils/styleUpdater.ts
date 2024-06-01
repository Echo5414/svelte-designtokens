import type { Tokens } from '../utils/localStorage';

export function updateCssVariables(tokens: { [key: string]: Tokens }) {
  const root = document.documentElement;

  // Clear existing variables
  for (let i = root.style.length - 1; i >= 0; i--) {
    const prop = root.style[i];
    if (prop.startsWith('--')) {
      root.style.removeProperty(prop);
    }
  }

  // Helper function to resolve references
  function resolveColorReference(referenceId: string): string | null {
    for (const collection of Object.values(tokens)) {
      if (collection.color[referenceId]) {
        return collection.color[referenceId].$value;
      }
    }
    return null;
  }

  // Set new variables
  Object.keys(tokens).forEach((collectionName) => {
    const collection = tokens[collectionName];

    // Colors
    Object.keys(collection.color).forEach((key) => {
      const token = collection.color[key];
      const varName = `--${collectionName}-color-${token.$extensions?.[import.meta.env.VITE_EXTENSION_NAMESPACE]?.name ?? key}`;
      let value = token.$value;

      if (token.$extensions?.[import.meta.env.VITE_EXTENSION_NAMESPACE]?.reference) {
        const referenceId = token.$extensions[import.meta.env.VITE_EXTENSION_NAMESPACE]?.reference;
        if (referenceId) {
          const resolvedValue = resolveColorReference(referenceId);
          if (resolvedValue) {
            value = resolvedValue;
          }
        }
      }

      if (value) {
        root.style.setProperty(varName, value);
      } else {
        root.style.removeProperty(varName);
      }
    });
  });
}
