# Angular-js-all

Angular js guide

**_Useful links_**

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [Renderer2](https://angular.io/api/core/Renderer2)
- [Official Docs](https://rxjs-dev.firebaseapp.com/)
- [RxJS Series](https://academind.com/learn/javascript/understanding-rxjs/)
- [Updating to RxJS 6](https://academind.com/learn/javascript/rxjs-6-what-changed/)
- [Validators as Directive](https://angular.io/api?type=directive)
- [Validators](https://angular.io/api/forms/Validators)

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
- [Routing](#routing)
- [Observables](#observables)
- [Forms](#forms)

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

## routing

In app-routing.module.ts

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './users/user/user.component';
import { HomeComponent } from './home/home.component';
import { ServerComponent } from './servers/server/server.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'servers', component: ServerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

In app.component

```html
<li role="presentation" class="active">
  <a [routerLink]="['/']">Home</a>
</li>
<li role="presentation"><a [routerLink]="['/servers']">Servers</a></li>
<li role="presentation"><a [routerLink]="['/users']">Users</a></li>

<router-outlet></router-outlet>
```

#### Set link tabs active class

```html
<li
  role="presentation"
  routerLinkActive="active"
  [routerLinkActiveOptions]="{ exact: true }"
>
  <a [routerLink]="['/']">Home</a>
</li>
<li role="presentation" routerLinkActive="active">
  <a [routerLink]="['/servers']">Servers</a>
</li>
<li role="presentation" routerLinkActive="active">
  <a [routerLink]="['/users']">Users</a>
</li>
```

#### Navigate programmatically

```html
<button class="btn btn-primary" (click)="onLoadServers()">Load Servers</button>
```

```js
import { Router } from '@angular/router';

export class HomeComponent {
  constructor(private router: Router) {}
  onLoadServers() {
    // ... some code
    this.router.navigate(['/servers']);
  }
}

```

#### Passing and fetching parameters

```js
/* Set route in app-router.module.ts */
const routes: Routes = [{ path: 'users/:id/:name', component: UserComponent }];

/* Access in component */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

export class UserComponent implements OnInit {
  user: { id: number; name: string };
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params.id,
      name: this.route.snapshot.params.name
    };

    /* This allows to listen the changes on route */
    this.route.params.subscribe((params: Params) => {
      this.user.id = params.id;
      this.user.name = params.name;
    });
  }
}
```

#### Passing and fetching queries

```js
/* in app-router.module.ts */
const routes: Routes = [
  { path: 'servers/:id/edit', component: EditServerComponent }
];

/* Programmatically in component */
this.router.navigate(['/servers', id, 'edit'], {
  queryParams: { alowEdit: '1' },
  fragment: 'loading'
});
```

```html
<a
  [routerLink]="['/servers', 5, 'edit']"
  [queryParams]="{ allowEdit: 1 }"
  fragment="loading"
  >Name</a
>
```

To access

```js
ngOnInit() {
  const id = +this.route.snapshot.params.id;
  this.server = this.serversService.getServer(id);

  this.route.params.subscribe((params: Params) => {
    this.server = this.serversService.getServer(+params.id);
  });
}
```

#### Nested routes

```js
/* in app-router.module.ts */
const routes: Routes = [
  {
    path: 'servers',
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ]
  }
];

/*
add <router-outlet></router-outlet> in parent component
*/
```

#### Guards

```js
/* Create file auth-guard.service.ts */
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    });
  }
}
```

```js
/* Create auth.service.ts */
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    /* Just to fake server request */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 2000);
    });
  }
}
```

```js
/* In app-routing.module.ts */
const routes: Routes = [
  {
    path: 'servers',
    canActivate: [AuthGuardService],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ]
  }
];
```

```js
/* In app.module.ts */
@NgModule({
  providers: [ServersService, AuthGuardService, AuthService]
})
```

**_Childe Guard_**

```js
/* In auth-guard.services.ts */
canActivateChild(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean {
  return this.canActivate(route, state);
}
```

```js
/* In app-routing.module.ts */
const routes: Routes = [
  {
    path: 'servers',
    canActivateChilde: [AuthGuardService],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ]
  }
];
```

**_ Not allow user to leave route _**

```js
/* Create can-deactivated-guard.service.ts file */
import { Observable } from 'rxjs';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
```

```js
/* in app-routing.module.ts */
const routes: Routes = [
  {
    path: 'servers',
    canActivateChild: [AuthGuardService],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent },
      {
        path: ':id/edit',
        component: EditServerComponent,
        /* Add this guard to specific route */
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];
```

```js
/* Register in app.module.ts file */
@NgModule({
  providers: [CanDeactivateGuard],
})
```

```js
/* In component */
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivated-guard.service';
import { Observable } from 'rxjs';

export class EditServerComponent implements CanComponentDeactivate {
  allowEdit = false;
  changesSaved = false;

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    const isInputDifferent =
      this.serverName !== this.server.name ||
      this.serverStatus !== this.server.status;

    if (isInputDifferent && !this.changesSaved) {
      return confirm('Do you want to discard the changes ?');
    }

    return true;
  }
}
```

#### Passing static and dynamic data to route

**_static_**

```js
const routes: Routes = [
  {
    path: '**',
    component: ErrorPageComponent,
    /* Static message */
    data: { message: 'Page not found!' }
  }
];
/* Access in component */
this.errorMessage = this.route.snapshot.data.message;
```

**_dynamic_**

```js
/* create a service like server-resolver.service.ts */
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params.id);
  }
}
```

```js
/* Register in app.module.ts */
@NgModule({
  providers: [ ServerResolver ],
})
```

```js
/* Declare in route */
const routes: Routes = [
  {
    path: 'servers',
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: { server: ServerResolver }
      }
    ]
  }
];
```

```js
/* Access in component */
ngOnInit() {
  this.route.data.subscribe((data: Data) => {
    this.server = data.server;
  });
}
```

[TOP](#content)

## observables

- [Official Docs](https://rxjs-dev.firebaseapp.com/)
- [RxJS Series](https://academind.com/learn/javascript/understanding-rxjs/)
- [Updating to RxJS 6](https://academind.com/learn/javascript/rxjs-6-what-changed/)

**_Build in observables and how to use _**

```js
import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;

  ngOnInit(): void {
    /* Create */
    this.firstSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });
  }

  ngOnDestroy(): void {
    /* Destroy */
    this.firstSubscription.unsubscribe();
  }
}

```

**_Custom observables and how to use_**

```js
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        /** Emitting data */
        observer.next(count);

        if (count === 2) {
          /** Here observer is done no more emitting */
          observer.complete();
        }

        if (count > 3) {
          /** Throw error */
          observer.error(new Error('Some dummy error!'));
        }

        count++;
      }, 1000);
    });

    const handleData = data => {
      console.log(data);
    };

    const handleError = error => {
      console.log(error);
    };

    const handleComplete = () => {
      /** It is not executed if we get error */
      console.log('I am complete! Do clean up');
    };

    this.firstSubscription = customIntervalObservable.subscribe(
      handleData,
      handleError,
      handleComplete
    );
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }
}
```

#### Operators

```js
import { map, filter } from 'rxjs/operators';

this.firstSubscription = customIntervalObservable
  .pipe(
    filter(data => data > 0),
    map((data: number) => {
      console.log(data);
      return `Round: ${data + 1}`;
    })
  )
  .subscribe(handleData, handleError, handleComplete);
```

#### Subjects

In childe component

```html
<button (click)="onPress()" class="btn btn-primary">Press</button>
```

```js
/* In childe component .ts file */
onPress() {
  this.userService.activatedEmitter.next(true);
}
```

In parent component

```html
<p *ngIf="isPressed">Button was pressed from user!</p>
```

```js
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

export class AppComponent implements OnInit, OnDestroy {
  isPressed = false;
  private pressSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.pressSubscription = this.userService.activatedEmitter.subscribe(
      (isPress: boolean) => {
        this.isPressed = isPress;
      }
    );
  }

  ngOnDestroy() {
    this.pressSubscription.unsubscribe();
  }
}

```

Create service

```js
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/* This is same as add in app.module.ts in providers array */
@Injectable({ providedIn: 'root' })
export class UserService {
  /** Use subject only on subscribe (where you have EventEmitter) not on @Output() */
  activatedEmitter = new Subject<boolean>();
}
```

[TOP](#content)

## forms

Setup

```js
/* in app.module.ts file */
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule]
})
export class AppModule {}
```

#### TD - Template Driven Approach

```html
<!-- Execute submit function in .ts file -->
<form (ngSubmit)="onSubmit(formRef)" #formRef="ngForm">
  <!-- ngModel allows communication with form -->
  <input ngModel name="email" />
  <button type="submit">Submit</button>
</form>
```

```js
/* In component .ts file */
import { NgForm } from '@angular/forms';
onSubmit(form: NgForm) {
  console.log(form);
}
```

###### Validation

- [Validators as Directive](https://angular.io/api?type=directive)
- [Validators](https://angular.io/api/forms/Validators)

```html
<input
  type="email"
  id="email"
  class="form-control"
  ngModel
  name="email"
  required
  email
/>
/<!-- Disable button -->
<button [disabled]="!formRef.valid" type="submit">
  Submit
</button>
```

###### Use css with angular classes

```css
.ng-dirty {
}
input.ng-invalid.ng-touched {
  border: 1px solid red;
}
```

###### Add text warning

```html
<input
  type="email"
  id="email"
  class="form-control"
  ngModel
  name="email"
  required
  email
  #email="ngModel"
/>
<!-- #email="ngModel" is important -->
<span class="help-block" *ngIf="!email.valid && email.touched"
  >Input email!</span
>
```

###### Set property like placeholder

```html
<!-- 
  NOTE: 
  - [ngModel] - is one way binding
  - [(ngModel)] - is two way binding
-->
<select
  id="secret"
  class="form-control"
  [ngModel]="displayQuestion"
  name="secret"
></select>
```

```js
export class AppComponent {
  displayQuestion = 'pet';
}
```

###### Group input data

```html
<div class="form-group" ngModelGroup="userData" #userData="ngModelGroup"></div>
<!--
  This will group all input field inside as object userData
  userData: {
    username: '',
    email: ''
  } 
 -->
```

Create radio button

```html
<div class="radio" *ngFor="let gender of genders">
  <label>
    <input type="radio" name="gander" ngModel [value]="gender" />{{ gender }}
  </label>
</div>
```

##### Patch value in form

```js
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

export class AppComponent {
  /* Access form instead of passing in html */
  @ViewChild('formRef') signUpForm: NgForm;

  displayQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
    /* Patch only username */
    this.signUpForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }
}
```

###### Reset form

```js
onSubmit() {
  console.log(this.signUpForm);
  this.signUpForm.reset();
}
```

#### Reactive Approach

Setup

```js
/* in app.module.ts file */
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ReactiveFormsModule]
})
export class AppModule {}
```

###### Adding fields

```js
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export class AppComponent implements OnInit {
  gendersR = ['male', 'female'];
  signUpFormR: FormGroup;

  ngOnInit() {
    this.signUpFormR = new FormGroup({
      usernameR: new FormControl(null),
      emailR: new FormControl(null),
      genderR: new FormControl('male')
    });
  }

  onSubmitR() {
    console.log(this.signUpFormR);
  }
}
```

```html
<form [formGroup]="signUpFormR" (ngSubmit)="onSubmitR()">
  <!-- formControlName="usernameR" is important -->
  <input
    type="text"
    id="usernameR"
    class="form-control"
    formControlName="usernameR"
  />
</form>
```

###### Validation

```js
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class AppComponent implements OnInit {
  ngOnInit() {
    this.signUpFormR = new FormGroup({
      usernameR: new FormControl(null, Validators.required),
      emailR: new FormControl(null, [Validators.required, Validators.email]),
      genderR: new FormControl('male')
    });
  }
}
```

```html
<span
  *ngIf="!signUpFormR.get('usernameR').valid &&
         signUpFormR.get('usernameR').touched"
  class="help-block"
  >Validation username</span
>
```

##### Working with array

```js
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';

export class AppComponent implements OnInit {
  ngOnInit() {
    this.signUpFormR = new FormGroup({
      hobbies: new FormArray([])
    });
  }

  get controls() {
    const ctr = (this.signUpFormR.get('hobbies') as FormArray).controls;
    return ctr;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signUpFormR.get('hobbies') as FormArray).push(control);
  }
}
```

```html
<div formArrayName="hobbies">
  <h4>Hobbies!</h4>
  <button class="btn btn-default" type="button" (click)="onAddHobby()">
    add hobby
  </button>
  <div class="form-group" *ngFor="let hobbyControl of controls; let i = index">
    <input type="text" class="form-control" [formControlName]="i" />
  </div>
</div>
```

###### Custom Validators

```js
export class AppComponent implements OnInit {
  ngOnInit() {
    this.signUpFormR = new FormGroup({
      usernameR: new FormControl(null, [
        Validators.required,
        this.forbiddenNamesValidator.bind(this)
      ])
    });
  }

  forbiddenNamesValidator(control: FormControl): { [s: string]: boolean } {
    /** { [s: string]: boolean } => {'test': true} */
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { isForbidden: true };
    }

    return null;
  }
}
```

**_Async Validator_**

```js
export class AppComponent implements OnInit {
  ngOnInit() {
    this.signUpFormR = new FormGroup({
      emailR: new FormControl(
        null,
        [Validators.required, Validators.email],
        [this.forbiddenEmailsValidator.bind(this)]
      )
    });
  }

  forbiddenEmailsValidator(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise =
      new Promise() <
      any >
      ((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'a@a.com') {
            resolve({ forbidden: true });
          } else {
            resolve(null);
          }
        }, 1500);
      });
    return promise;
  }
}
```

###### Rest

```js
/* You can listen */
this.signUpFormR.valueChanges.subscribe(value => {
  /* output any value that is changed */
});
this.signUpFormR.statusChanges.subscribe(status => {
  /* output form status that is changed */
});
this.signUpFormR.setValue({});
this.signUpFormR.patchValue({});
this.signUpFormR.reset();
```

[TOP](#content)
