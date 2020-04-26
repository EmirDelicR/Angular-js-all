import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTileComponent } from './multi-tile.component';

describe('MultiTileComponent', () => {
  let component: MultiTileComponent;
  let fixture: ComponentFixture<MultiTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
