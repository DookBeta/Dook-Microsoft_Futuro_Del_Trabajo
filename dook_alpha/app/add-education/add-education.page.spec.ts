import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEducationPage } from './add-education.page';

describe('AddEducationPage', () => {
  let component: AddEducationPage;
  let fixture: ComponentFixture<AddEducationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEducationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEducationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
