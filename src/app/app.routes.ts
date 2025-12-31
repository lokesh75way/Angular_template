import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';
import { ProductsComponent } from './components/products/products.component';
import { EditProductFormComponent } from './components/edit-product-form/edit-product-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginFormComponent } from './components/login-form/login-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dashboard' }
  },
  {
    path: 'login',
    component: LoginFormComponent,
    data: { title: 'Login' }
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { title: 'Users Management' }
  },
  {
    path: 'users/edit/:id',
    component: EditUserFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'Edit User' }
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Products' }
  },
  {
    path: 'products/edit/:id',
    component: EditProductFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'Edit Product' }
  },
  {
    path: 'todos',
    loadChildren: () => import('./modules/todos/todos.module').then((m) => m.TodosModule),
    canActivate: [AuthGuard],
    data: { title: 'Todos' }
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];