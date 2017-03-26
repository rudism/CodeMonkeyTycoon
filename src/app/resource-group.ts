import { Resource } from './resource';

export class ResourceGroup {
  name: string;
  displayWhole?: boolean;
  resources: Resource[];
}
