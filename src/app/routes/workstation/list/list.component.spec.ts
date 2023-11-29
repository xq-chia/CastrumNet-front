import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkstationListComponent } from './list.component';

describe('WorkstationListComponent', () => {
  let component: WorkstationListComponent;
  let fixture: ComponentFixture<WorkstationListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkstationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkstationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
