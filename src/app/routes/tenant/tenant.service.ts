import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  constructor(private http: _HttpClient) { }

  fetchAllTenants() {
    return this.http.get('/tenants');
  }
}
