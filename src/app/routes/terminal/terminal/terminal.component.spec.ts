import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminalTerminalComponent } from './terminal.component';

describe('TerminalTerminalComponent', () => {
  let component: TerminalTerminalComponent;
  let fixture: ComponentFixture<TerminalTerminalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
