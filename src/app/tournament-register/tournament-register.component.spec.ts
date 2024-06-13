import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentRegisterComponent } from './tournament-register.component';

describe('TournamentRegisterComponent', () => {
  let component: TournamentRegisterComponent;
  let fixture: ComponentFixture<TournamentRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentRegisterComponent]
    });
    fixture = TestBed.createComponent(TournamentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
