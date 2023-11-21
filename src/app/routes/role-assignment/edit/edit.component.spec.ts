import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleAssignmentEditComponent } from './edit.component';

describe('RoleAssignmentEditComponent', () => {
  let component: RoleAssignmentEditComponent;
  let fixture: ComponentFixture<RoleAssignmentEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAssignmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAssignmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
