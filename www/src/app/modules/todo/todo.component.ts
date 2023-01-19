import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ITodo } from './todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  public formArray = new FormArray<FormGroup>([]);

  getTodos() {
    this.http.get<any>(`${environment.apiUrl}/todo`).subscribe({
      next: (res) => {
        for (let todo of res.todos) {
          this.formArray.push(
            new FormGroup({
              id: new FormControl(todo.id),
              title: new FormControl(todo.title),
              note: new FormControl(todo.note),
              completed: new FormControl(todo.completed),
              priority: new FormControl(todo.priority),
            })
          );
        }
      },
    });
  }

  addTodo() {
    this.formArray.push(
      new FormGroup({
        id: new FormControl(0),
        title: new FormControl(''),
        note: new FormControl(''),
        completed: new FormControl(false),
        priority: new FormControl(false),
      })
    );
  }

  createTodo(todo: FormGroup) {
    this.http
      .post<any>(`${environment.apiUrl}/todo`, { todo: todo.value })
      .subscribe({
        next: (res) => {
          todo.controls['id'].setValue(res.todo.id);
        },
      });
  }

  updateTodo(todo: FormGroup) {
    this.http
      .patch<any>(`${environment.apiUrl}/todo/${todo.controls['id'].value}`, {
        todo: todo.value,
      })
      .subscribe();
  }

  deleteTodo(todo: ITodo, index: number) {
    if (todo.id != 0) {
      this.http.delete<any>(`${environment.apiUrl}/todo/${todo.id}`).subscribe({
        next: () => {
          this.formArray.removeAt(index);
        },
        error: (err) => {
          alert(err.message);
        },
      });
    } else {
      this.formArray.removeAt(index);
    }
  }

  setPriority(todo: FormGroup) {
    todo.controls['priority'].setValue(!todo.controls['priority'].value);
    if (todo.controls['id'].value != 0) {
      this.updateTodo(todo);
    }
  }

  setCompleted(todo: FormGroup) {
    todo.controls['completed'].setValue(!todo.controls['completed'].value);
    if (todo.controls['id'].value != 0) {
      this.updateTodo(todo);
    } else {
      this.createTodo(todo);
    }
  }
}
