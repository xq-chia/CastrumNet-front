import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HostHostComponent } from './host.component';

describe('HostHostComponent', () => {
  let component: HostHostComponent;
  let fixture: ComponentFixture<HostHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HostHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
