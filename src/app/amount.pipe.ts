import { Pipe, PipeTransform } from '@angular/core';

import { Resource } from './resource';
import { GameEngineService } from './game-engine.service';

@Pipe({name: 'amount'})
export class AmountPipe implements PipeTransform {
  constructor(public engine: GameEngineService) {}

  transform(value: number, suffixes: string[], showSuffix?: boolean, decimals: number = 2): string {
    if(value <= 0) return showSuffix ? suffixes[0] : '0.00';

    var suffix = suffixes[0];
    var denom = 1;
    if(value > 1000 && suffixes[1]){
      suffix = suffixes[1];
      denom = 1000;
    } else if(value > 1000000 && suffixes[2]){
      suffix = suffixes[2];
      denom = 1000000;
    } else if(value > 1000000000 && suffixes[3]){
      suffix = suffixes[3];
      denom = 1000000000;
    }

    if(showSuffix) return suffix;

    var n = new Number(value / denom);
    return n.toFixed(decimals);
  }
}
