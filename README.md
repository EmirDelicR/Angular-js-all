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
- [Event Binding](#event-binding)
- [Life Cycle](#life-cycle-hook)
- [Services](#services)
- [Dependency Injection](#injection)

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
# Generate sub component
ng g c component-name/sub-component-name
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

#### custom attribute

```console
ng g d name
```

```js
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}

/* In app.module.ts */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HighlightDirective } from './directive/highlight.directive';

@NgModule({
  declarations: [
    HighlightDirective
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

```html
<p appHighlight>Testing!</p>
```

**_If you styling element is better to use this approach_**

[Renderer2](https://angular.io/api/core/Renderer2)

```js
import { Directive, Renderer2, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      'blue'
    );
  }
}
```

#### HostListener

```js
import {
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      'blue'
    );
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      'transparent'
    );
  }
}
```

#### HostBinding

Use HostBinding for property change on element to omit Renderer2

```js
import {
  Directive,
  ElementRef,
  HostListener,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective {
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = 'transparent';
  }
}

```

#### custom structural

```js
import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
```

```html
<p *appUnless="value"></p>
```

[TOP](#content)

## event-binding

#### props parent-childe

To bind element from parent to child

**_Parent_**

```html
<app-server-element
  *ngFor="let element of serverElements"
  [element]="element"
></app-server-element>
```

**_Childe _**

```js
import { Component, OnInit, Input } from '@angular/core';

export class ServerElementComponent implements OnInit {
  /* @Input decorator allows that childe receive prop */
  @Input() element: { type: string, name: string, content: string };
}
```

#### Add alias

**_Parent_**

```html
<app-server-element
  *ngFor="let element of serverElements"
  [serverElement]="element"
></app-server-element>
```

**_Childe _**

```js
import { Component, OnInit, Input } from '@angular/core';

export class ServerElementComponent implements OnInit {
  /* @Input decorator allows that childe receive prop */
  @Input('serverElement') element: {
    type: string,
    name: string,
    content: string
  };
}
```

#### props childe-parent

**_Parent_**

```html
<app-cockpit (serverCreated)="onServerAdded($event)"></app-cockpit>
```

```js
onServerAdded(serverData: { name: string; content: string }) {
  this.serverElements.push({
    type: 'server',
    name: serverData.name,
    content: serverData.content
  });
}
```

**_Childe_**

```js
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

export class CockpitComponent implements OnInit {
  /* Add Output decorator and EventEmitter */
  @Output() serverCreated = new EventEmitter<{
    name: string;
    content: string;
  }>();

  newServerName = '';
  newServerContent = '';

  onAddServer() {
    this.serverCreated.emit({
      name: this.newServerName,
      content: this.newServerContent
    });
  }
}
```

#### Local reference

```html
<!-- #serverName can be only used in html File -->
<input type="text" #serverName />

<button (click)="onAddServer(serverName)">
  Add Server
</button>
```

```js
onAddServer(serverName: HTMLInputElement) {
  this.serverCreated.emit({
    name: serverName.value,
    content: this.newServerContent
  });
}
```

#### @ViewChilde

This alow you to access data from input directly in .ts file

```js
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

export class CockpitComponent implements OnInit {
  @ViewChild('serverContent', { static: true })
  serverContentInput: ElementRef;

  /* You can use @ContentChilde to access innerText of element */

  onAddServer(serverName: HTMLInputElement) {
    this.serverCreated.emit({
      name: serverName.value,
      content: this.serverContentInput.nativeElement.value
    });
  }
}
```

#### ng-content

Use to pass props as childe element to component

**_Parent_**

```html
<app-cockpit><p>Test</p></app-cockpit>
```

**_Childe_**

```html
<ng-content></ng-content>
```

[TOP](#content)

## life-cycle-hook

- **_ngOnChanges_** - called after input element is changed (receive argument)
- **_ngOnInit_** - called once on initialized
- **_ngDoCheck_** - on every change detection
- **_ngAfterContentInit_** - after ng-content has in view
- **_ngAfterContentChecked_** - after content is checked
- **_ngAfterViewInit_** - after view and childe are initialized
- **_ngAfterViewChecked_** - after view and childe view is checked
- **_ngOnDestroy_** - after component is destroyed

[TOP](#content)

## services

```js
/* create a service */
export class LoggingService {
  logStatusChange(status: string) {
    console.log(`A server status changed, new status: ${status}`);
  }
}
```

```js
/* Use it in component */
import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../services/logging.services';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {
  constructor(private loggingService: LoggingService) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.loggingService.logStatusChange(accountStatus);
  }
}

```

[TOP](#content)

## injection

Inject service into other service

```js
import { LoggingService } from './logging.services';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {
  accounts = [];

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.loggingService.logStatusChange(status);
  }

}

```

[TOP](#content)
