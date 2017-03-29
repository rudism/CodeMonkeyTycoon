import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'amount'})
export class AmountPipe implements PipeTransform {
  transform(value: number, suffixes: string[], showSuffix: boolean = false, decimals: number = 2): string {
    if(!suffixes) return new Number(value).toFixed(decimals);
    if(value <= 0) return showSuffix
      ? suffixes[0]
      : new Number(0).toFixed(decimals);

    var suffix = suffixes[0];
    var denom = 1;
    if(value >= 1000 && suffixes[1]){
      suffix = suffixes[1];
      denom = 1000;
    } else if(value >= 1000000 && suffixes[2]){
      suffix = suffixes[2];
      denom = 1000000;
    } else if(value >= 1000000000 && suffixes[3]){
      suffix = suffixes[3];
      denom = 1000000000;
    }

    if(showSuffix) return suffix;

    var n = new Number(value / denom);
    return n.toFixed(decimals);
  }
}
