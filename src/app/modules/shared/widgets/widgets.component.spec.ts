import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsComponent } from './widgets.component';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';

class MockGtmDispatchEventsRepository extends GtmDispatchEventsRepository {
  sendEvent(){}
}

describe('WidgetsComponent', () => {
  let component: WidgetsComponent;
  let fixture: ComponentFixture<WidgetsComponent>;
  let gtmDispatchEventsRepository: GtmDispatchEventsRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsComponent ],
      providers: [
        { provide: GtmDispatchEventsRepository, useClass: MockGtmDispatchEventsRepository },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetsComponent);
    component = fixture.componentInstance;
    gtmDispatchEventsRepository = TestBed.inject(GtmDispatchEventsRepository);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
