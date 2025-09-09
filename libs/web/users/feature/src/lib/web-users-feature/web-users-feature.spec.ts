import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebUsersFeature } from './web-users-feature';

describe('WebUsersFeature', () => {
  let component: WebUsersFeature;
  let fixture: ComponentFixture<WebUsersFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebUsersFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(WebUsersFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
