import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrefernciasModalPage } from './preferncias-modal.page';

describe('PrefernciasModalPage', () => {
  let component: PrefernciasModalPage;
  let fixture: ComponentFixture<PrefernciasModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefernciasModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrefernciasModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
