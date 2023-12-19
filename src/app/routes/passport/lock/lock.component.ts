import { HttpContext } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, User, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ConnectableObservable, catchError, of } from 'rxjs';

@Component({
  selector: 'passport-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.less']
})
export class UserLockComponent {
  f = new FormGroup({
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  get user(): User {
    return this.settings.user;
  }

  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private settings: SettingsService,
    private router: Router,
    private http: _HttpClient,
    private msgSrv: NzMessageService,
    private startupSrv: StartupService
  ) {}

  submit(): void {
    this.f.controls.password.markAsDirty();
    this.f.controls.password.updateValueAndValidity();
    this.http.post(
        '/auth/login',
        {
          username: this.user.email,
          password: this.f.value.password
        },
        null,
        {
          context: new HttpContext().set(ALLOW_ANONYMOUS, true)
        }
    ).pipe(
      catchError(err => {
        this.msgSrv.error('Wrong Credential. Logging out');
        return of(null);
      })
    ).subscribe(res => {
      if (res == null) {
        this.tokenService.clear()
        this.router.navigate(['passport/login'])
        return ;
      }
      this.tokenService.set(res.data.user);
      this.startupSrv.load().subscribe(() => {
        let url = this.tokenService.referrer!.url || '/';
        if (url.includes('/passport')) {
          url = '/';
        }
        this.router.navigateByUrl(url);
      });
    })
  }
}
