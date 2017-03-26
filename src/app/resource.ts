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

  // when will the resource become available for purchase?
  requirements?: ResourceMap;

  // how much does this directly add to other resources
  value?: ResourceMap;

  // automatically generated resources by this resource
  generators?: ResourceMap;
}
