export interface ResourceMap {
  [name: string]: number
}

export class Resource {
  name: string;
  display?: string;
  pluralText: string;
  craftText?: string;
  destroyText?: string;
  appearText?: string;
  descText?: string;
  restorable?: boolean;
  attritionable?: boolean;
  requirements?: ResourceMap;
  value?: ResourceMap;
  generators?: ResourceMap;
}
