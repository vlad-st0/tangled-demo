import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../utils/auth.interceptor';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [TodoComponent],
  imports: [SharedModule, TodoRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class TodoModule {}
