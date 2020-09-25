import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddExperiencePage } from './add-experience.page';

describe('AddExperiencePage', () => {
  let component: AddExperiencePage;
  let fixture: ComponentFixture<AddExperiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExperiencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
