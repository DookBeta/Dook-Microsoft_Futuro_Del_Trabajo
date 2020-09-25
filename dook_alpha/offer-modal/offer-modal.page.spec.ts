import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferModalPage } from './offer-modal.page';

describe('OfferModalPage', () => {
  let component: OfferModalPage;
  let fixture: ComponentFixture<OfferModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
