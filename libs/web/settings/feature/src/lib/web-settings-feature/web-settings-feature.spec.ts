import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebSettingsFeature } from './web-settings-feature';

describe('WebSettingsFeature', () => {
  let component: WebSettingsFeature;
  let fixture: ComponentFixture<WebSettingsFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebSettingsFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(WebSettingsFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
