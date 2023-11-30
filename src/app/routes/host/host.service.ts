import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(private http: _HttpClient) { }

  fetchAllHosts() {
    return this.http.get('/host');
  }
}
