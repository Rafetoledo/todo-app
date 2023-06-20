import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})




export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("List") || '[]');
  constructor(){}

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public deleteTask(event: number): void{
    this.taskList.splice(event, 1);
  }

  public deleteAll(): void{
    this.taskList = [];
  }

  public addTask(event: string){
    this.taskList.push({task: event, checked: false });

  }

  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Task esta vazia, deseja deletar?");

      if(confirm){
        this.deleteTask(index);
      }
    }
  }

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("List", JSON.stringify(this.taskList));
    }
  }









}

