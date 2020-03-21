# Angular-js-all

Angular js guide

**_Useful links_**

[Angular Documentation](https://angular.io/docs)

[Angular CLI](https://angular.io/cli)

## content

- [CLI](#cli)
- [Add library, debugger, prettier, VS plugins](#library)
- [Components](#components)
- [Data binding](#databinding)
- [Directives](#directives)

## cli

[CLI](https://github.com/angular/angular-cli/wiki)

#### Update npm

```console
sudo npm install -g npm
```

#### Update Angular CLI

```console
sudo npm uninstall -g angular-cli @angular/cli
npm cache clean
sudo npm install -g @angular/cli
```

#### Create a project

```console
ng new my-first-project
```

[TOP](#content)

## library

```console
npm i --save bootstrap@3
```

In angular.json

```js
"styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "src/styles.css"
],
```

#### Set single quote

```js
/* In .editorconfig file */
quote_type = single;
```

#### Set Google chrome debugger

[Setup](https://www.freecodecamp.org/news/how-to-set-up-the-debugger-for-chrome-extension-in-visual-studio-code-c0b3e5937c01/)

```js
/* In launch.json */
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:4200",
      /* Point to your project */
      "webRoot": "${workspaceFolder}/a-basic"
    }
  ]
}
```

#### VS Code plugins

- Angular Snippets (Version 9)
- Angular Language Service

[TOP](#content)

#### Angular Dev Tool

**_Augury_**

## components

Create **_name.component.ts_** file

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {}
```

Create **_name.component.html_** file

```html
<h1>My first component</h1>
```

In **_app/app.module.ts_** add

```js
import { ServerComponent } from './server/server.component';

@NgModule({
  declarations: [AppComponent, ServerComponent]
})
```

In **_src/app.component.html_** file

```html
<app-server></app-server>
```

#### Create component with CLI

```console
ng generate component component-name
# OR
ng g c component-name
```

[TOP](#content)

## databinding

**_String Interpolation_**

```js
export class ServerComponent {
  serverId = 10;
  status = 'Offline';

  getServerStatus(): string {
    return this.status;
  }
}
```

```html
<p>Server with ID {{ serverId }} is {{ getServerStatus() }}</p>
```

**_Property binding_**

```js
export class ServersComponent implements OnInit {
  allowNewServer = false;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }
}
```

```html
<button [disabled]="!allowNewServer">Add Server</button>
```

**_Event binding_**

```js
onChangeServerStatus() {
    this.serverStatus = 'Up';
}

onUpdate(event: Event): void {
    const element = event.target as HTMLInputElement;
    console.log(element.value);
}
```

```html
<button
  class="btn btn-primary"
  [disabled]="!allowNewServer"
  (click)="onChangeServerStatus()"
></button>

<input (input)="onUpdate($event)" />
```

**_Two way binding_**

In **_app.module.ts_ you must add**

```js
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [BrowserModule, FormsModule],
})s
```

```js
export class ServersComponent implements OnInit {
  someInput = '';
}
```

```html
<input [(ngModel)]="someInput" />
<p>{{ someInput }}</p>
```

[TOP](#content)

## directives

#### ngif

```html
<!-- set show property in class to true/false -->
<p *ngIf="show">It will show me</p>

<!-- if else -->
<p *ngIf="show; else noServer">It will show me</p>
<ng-template #noServer>
  <p>This will be else</p>
</ng-template>
```

#### mgStyle

```html
<!-- make a function that return string or just add string-->
<p [ngStyle]="{ backgroundColor: getColor() }">This is red paragraph</p>
```

#### ngClass

```html
<!-- make a function that return string or just add string-->
<p [ngClass]="{ className: serverStatus === 'online' }">
  This is red paragraph
</p>
```

#### ngFor

```html
<app-server *ngFor="let item of [1, 2, 3]; let key = index"
  >{{ item }} {{ index }}</app-server
>
```

[TOP](#content)
