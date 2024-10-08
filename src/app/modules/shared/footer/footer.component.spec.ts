import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';

class MockGtmDispatchEventsRepository extends GtmDispatchEventsRepository {
  sendEvent(){}
}


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let gtmDispatchEventsRepository: GtmDispatchEventsRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports:[HttpClientTestingModule],
      providers: [
        { provide: GtmDispatchEventsRepository, useClass: MockGtmDispatchEventsRepository },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    gtmDispatchEventsRepository = TestBed.inject(GtmDispatchEventsRepository);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
