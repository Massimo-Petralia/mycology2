import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedParametersService {
  constructor() {}
  page: number = 1;
  length: number = 0;

  isCreated: boolean = false
  isUpdated: boolean = false

}
