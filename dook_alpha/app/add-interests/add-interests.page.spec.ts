import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddInterestsPage } from './add-interests.page';

describe('AddInterestsPage', () => {
  let component: AddInterestsPage;
  let fixture: ComponentFixture<AddInterestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInterestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddInterestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
