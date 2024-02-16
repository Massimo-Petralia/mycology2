import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdManagementService {
  constructor() {}

  idState = {
    currentID: <string | null>null,
    previousID: <string | null>null,
  };

  getIdStateValue() {
    return this.idState;
  }
}
