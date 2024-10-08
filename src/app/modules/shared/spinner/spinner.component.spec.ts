import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from 'src/app/infrastructure/services/spinner.service';


describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerService: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      providers: [SpinnerService]
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(SpinnerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update isLoading when SpinnerService.isLoading emits', () => {
    // Emite true
    spinnerService.isLoading.emit(true);
    fixture.detectChanges();
    expect(component.isLoading).toBe(true);

    // Emite false
    spinnerService.isLoading.emit(false);
    fixture.detectChanges();
    expect(component.isLoading).toBe(false);
  });
});
