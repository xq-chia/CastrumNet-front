import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HostAssignmentListComponent } from './list.component';

describe('HostAssignmentListComponent', () => {
  let component: HostAssignmentListComponent;
  let fixture: ComponentFixture<HostAssignmentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HostAssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
