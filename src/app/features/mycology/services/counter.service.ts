import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  constructor() { }

  private counter : number = 0

  increamentCounter(){
    this.counter++
  }

  getCounterValue(): number{
    return this.counter
  }

 idState ={ 
  currentID: <string | null>null,
  previousID: <string | null>null 
}
}
