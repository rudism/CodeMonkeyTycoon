import { Resource, ResourceMap } from './resource';

export class ResourceMeta {
  public resource: Resource;
  public crafted: number = 0;
  public total: number = 0;
  public globalTotal: number = 0;
  public delta: number = 0;
  public maxed: boolean = false;

  private _visible: boolean = null;
  private _hasCost: boolean = null;
  private _allResources: { [name: string]: ResourceMeta };

  constructor(resource: Resource, allResources: { [name: string]: ResourceMeta }) {
    this.resource = resource;
    this._allResources = allResources;
  }

  public get display(): string { return this.resource.display; }
  public get prefix(): string { return this.resource.prefix; }
  public get pluralText(): string[] { return this.resource.pluralText; }
  public get descText(): string { return this.resource.descText; }
  public get craftText(): string { return this.resource.craftText; }
  public get destroyText(): string { return this.resource.destroyText; }
  public get generators(): ResourceMap { return this.resource.generators; }
  public get modifiers(): ResourceMap { return this.resource.modifiers; }
  public get value(): ResourceMap { return this.resource.value; }
  public get attritionable(): boolean { return this.resource.attritionable; }
  public get restorable(): boolean { return this.resource.restorable; }

  public isVisible(): { visible: boolean, first?: boolean } {
    if(this._visible) return { visible: true };

    if(!this.display) return { visible: false };
    if(!this.resource.requirements) return { visible: true };

    let visible = true;
    for(let key in this.resource.requirements){
      if(this._allResources[key].globalTotal < this.resource.requirements[key]) {
        visible = false; break; }
    }

    if(visible) this._visible = true;
    return { visible: visible, first: visible };
  }

  public isCraftable(amount: number = 1): boolean {
    if(!this.craftText) return false;
    if(!this.value) return true;
    var craftable = true;
    for(let key in this.value){
      if(this._allResources[key].total < this.value[key] * amount * -1){
        craftable = false; break; }
    }
    return craftable;
  }

  public maxGeneratorApply(offsets: ResourceMap = null): number {
    if(!this.generators) return 0;
    let ratio = 1;
    for(let key in this.generators){
      if(this.generators[key] > 0) continue;
      var required = this.generators[key] * this.total * -1;
      var offset = (offsets && offsets[key]) ? offsets[key] : 0;
      var available = this._allResources[key].total + offset;
      if(available < required && (available / required) < ratio)
        ratio = available / required;
    }
    return this.total * ratio;
  }

  public incCrafted(amount: number = 1, offsets: ResourceMap = {}): boolean {
    // bail if it can't be afforded
    if(this.value){
      for(var key in this.value){
        if(this.value[key] < 0){
          let offset = offsets[key] ? offsets[key] : 0;
          var maxAmount = (this._allResources[key].total + offset) > 0
            ? (this._allResources[key].total + offset) / this.value[key] * -1
            : 0;
          if(maxAmount < amount)
          {
            return false;
          }
        }
      }
    }

    this.crafted += amount;
    if(this.crafted < 0) this.crafted = 0;
    if(amount > 0) this.globalTotal += amount;
    return true;
  }
}
