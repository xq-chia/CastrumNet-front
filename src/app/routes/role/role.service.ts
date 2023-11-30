import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: _HttpClient) { }

  fetchAllRoles(): Observable<any[]> {
    return this.http.get('/role');
  }
}
