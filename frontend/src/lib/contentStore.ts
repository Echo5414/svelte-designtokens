import { createStore } from './createStore';
import { v4 as uuidv4 } from 'uuid';
import type { ContentItem, ContentType } from './types';
import { defaultContentItems } from './defaultValues';

export const contentStore = createStore<ContentItem>({
  key: 'contentItems',
  createDefaultItem: (type: string, customProps = {}) => ({
    id: uuidv4(),
    type: type as ContentType,  // Cast type to ContentType
    content: customProps.content || '',
    ...customProps
  }),
  defaultItems: { default: defaultContentItems },
});
