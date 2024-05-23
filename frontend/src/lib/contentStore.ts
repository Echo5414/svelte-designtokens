import { createStore } from './createStore';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import type { ContentItem, ContentType, Store } from './types';

export const contentStore = createStore<ContentItem, ContentType>({
  key: 'contentItems',
  createDefaultItem: (type: ContentType, customProps = {}) => ({
    id: uuidv4(),
    type,
    content: '', // Default content, customizable via customProps
    ...customProps
  })
}) as unknown as Store<ContentItem>; // Ensure contentStore implements Store<ContentItem>
