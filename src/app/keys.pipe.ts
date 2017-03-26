import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value: Object): any[] {
    var keys: any[] = [];
    for(var key in Object.keys(value)){
      keys.push(key);
    }
    return keys;
  }
}
