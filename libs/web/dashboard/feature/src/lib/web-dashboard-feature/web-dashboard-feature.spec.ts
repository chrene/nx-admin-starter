import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebDashboardFeature } from './web-dashboard-feature';

describe('WebDashboardFeature', () => {
  let component: WebDashboardFeature;
  let fixture: ComponentFixture<WebDashboardFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebDashboardFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(WebDashboardFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
