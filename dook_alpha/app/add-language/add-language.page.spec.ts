import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddLanguagePage } from './add-language.page';

describe('AddLanguagePage', () => {
  let component: AddLanguagePage;
  let fixture: ComponentFixture<AddLanguagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLanguagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLanguagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
