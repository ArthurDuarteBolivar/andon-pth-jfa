import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPausaComponent } from './dialog-pausa.component';

describe('DialogPauseComponent', () => {
  let component: DialogPausaComponent;
  let fixture: ComponentFixture<DialogPausaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPausaComponent]
    });
    fixture = TestBed.createComponent(DialogPausaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
