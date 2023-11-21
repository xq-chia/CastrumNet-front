import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HostAssignmentEditComponent } from './edit.component';

describe('HostAssignmentEditComponent', () => {
  let component: HostAssignmentEditComponent;
  let fixture: ComponentFixture<HostAssignmentEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HostAssignmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostAssignmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
