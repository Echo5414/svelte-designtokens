import { createStore } from './createStore';
import { v4 as uuidv4 } from 'uuid';
import type { ContentItem, ContentType, Store } from './types';
import { defaultContentValues, defaultContentItems } from './defaultValues';

export const contentStore = createStore<ContentItem, ContentType>({
  key: 'contentItems',
  createDefaultItem: (type: ContentType, customProps = {}) => ({
    id: uuidv4(),
    type,
    content: defaultContentValues[type] || '',
    ...customProps
  }),
  defaultItems: defaultContentItems
}) as unknown as Store<ContentItem>;
