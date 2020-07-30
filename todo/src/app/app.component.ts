import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Todo } from './../models/todo.model';

@Component({
  selector: 'app-root', // <app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public mode: string = 'list'; // toda vez que for lista, vai apresentar uma configuração no html
  public todos: Todo[] = []; // criando vareavel do tipo: (any) com valor []vazio
  // modifiquei o tipo de "any" para a classe que eu criei. [TODO]

  public title: String = 'Minhas Tarefas';
  public form: FormGroup;
  
  /**
   *  O método construtor é chamado, toda vez que o AppComponent inicia.
   */
  constructor(private fb: FormBuilder) {// instancia do formBuilder 
    this.form = this.fb.group({ // criando grupo no formBuilder
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,        
      ])]
    }); 
      this.load(); // Buscando dados do localStorage
  }
  // Criando ações para os buttons
  add (){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save(); // salva e persisti os  dados adcionado para o localStorage
    this.clear();
  }
clear(){
  this.form.reset();

}
remove(todo: Todo) {
  const index = this.todos.indexOf(todo);
  if(index !== -1){
    this.todos.splice(index, 1);
  }
  this.save();
}
markAsDone(todo: Todo) {
  todo.done = true;
  this.save();

}
markAsUndone(todo: Todo) {
  todo.done = false;
  this.save();
 }

 // salvando informação no localStorage // e convertendo JSON para string
save(){
 const data = JSON.stringify(this.todos);
 localStorage.setItem('todos', data); // setando item (setItem)
 this.mode = 'list'; // salva e retorna para pagina de nova tarefa
  }

  // buscando informação do localStorage para aplicação
load(){
  const data = localStorage.getItem('todos'); // buscando iTem (getItem)
  if(data){
    this.todos =JSON.parse(data);  // const items = JSON.parse(data); // convertendo "string" para "JSON"

  }else {
    this.todos = [];
    }  
  }

  changeMode(mode: string){
    this.mode = mode;
  }
}

