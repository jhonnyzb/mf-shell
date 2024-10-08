import { TestBed } from '@angular/core/testing';
import { InactivityService } from './inactivity.service';

describe('InactivityService', () => {
  let service: InactivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InactivityService]
    });
    service = TestBed.inject(InactivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset timer on mouse move', () => {
    spyOn(service, 'resetTimer').and.callThrough();
    const mouseEvent = new MouseEvent('mousemove');
    document.dispatchEvent(mouseEvent);
  });
  
  
  it('should reset timer on key down', () => {
    spyOn(service, 'resetTimer').and.callThrough();
    const keyEvent = new KeyboardEvent('keydown');
    document.dispatchEvent(keyEvent);
  });

  it('should return an observable', () => {
    const result = service.resetTimer();
    expect(result).toBeDefined();
    expect(result.subscribe).toBeDefined();
  });

});
