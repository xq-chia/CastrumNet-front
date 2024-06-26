import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { multiTenantGuard, startPageGuard } from '@core';
import { authSimpleCanActivate } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserEditComponent } from './user/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [multiTenantGuard],
    children: [
      { path: '', redirectTo: 'workstation', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘', titleI18n: 'dashboard' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
     { path: 'user', loadChildren: () => import('./user/user.module').then((m) => m.UserModule) }, 
     { path: 'terminal', loadChildren: () => import('./terminal/terminal.module').then((m) => m.TerminalModule) },
     { path: 'role', loadChildren: () => import('./role/role.module').then((m) => m.RoleModule) },
     { path: 'host', loadChildren: () => import('./host/host.module').then((m) => m.HostModule) },
     { path: 'roleAssignment', loadChildren: () => import('./role-assignment/role-assignment.module').then((m) => m.RoleAssignmentModule) },
     { path: 'hostAssignment', loadChildren: () => import('./host-assignment/host-assignment.module').then((m) => m.HostAssignmentModule) },
     { path: 'workstation', loadChildren: () => import('./workstation/workstation.module').then((m) => m.WorkstationModule) },
     { path: 'profile', loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule) }]
  },
  // 空白布局
  // {
  //     path: 'blank',
  //     component: LayoutBlankComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
    ]
  },
  // 单页不包裹Layout
  { path: 'passport/callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash,
        // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
        // Pls refer to https://ng-alain.com/components/reuse-tab
        scrollPositionRestoration: 'top',
        bindToComponentInputs: true
      }
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
