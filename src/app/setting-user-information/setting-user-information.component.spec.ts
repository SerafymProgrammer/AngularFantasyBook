import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingUserInformationComponent } from './setting-user-information.component';

describe('SettingUserInformationComponent', () => {
  let component: SettingUserInformationComponent;
  let fixture: ComponentFixture<SettingUserInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingUserInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
