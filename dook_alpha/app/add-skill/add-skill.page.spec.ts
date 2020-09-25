import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSkillPage } from './add-skill.page';

describe('AddSkillPage', () => {
  let component: AddSkillPage;
  let fixture: ComponentFixture<AddSkillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSkillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
