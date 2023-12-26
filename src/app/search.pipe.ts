import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(args){
      return value.filter((item:any)=>item.msisdn.toString().indexOf(args) > -1 || item.agentBusinessName.toString().toUpperCase().indexOf(args) > -1
      || item.agentName.toString().toUpperCase().indexOf(args) > -1 || item.agentBusinessName.toString().toLowerCase().indexOf(args) > -1
      || item.agentName.toString().toLowerCase().indexOf(args) > -1   )
    }

    return value;
  }

}
