import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HostCreateComponent } from './create.component';

describe('HostCreateComponent', () => {
  let component: HostCreateComponent;
  let fixture: ComponentFixture<HostCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HostCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
