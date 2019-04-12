import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestrestcomponentComponent } from './testrestcomponent.component';

describe('TestrestcomponentComponent', () => {
  let component: TestrestcomponentComponent;
  let fixture: ComponentFixture<TestrestcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestrestcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestrestcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
