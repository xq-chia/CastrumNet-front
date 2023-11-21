import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleAssignmentListComponent } from './list.component';

describe('RoleAssignmentListComponent', () => {
  let component: RoleAssignmentListComponent;
  let fixture: ComponentFixture<RoleAssignmentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
