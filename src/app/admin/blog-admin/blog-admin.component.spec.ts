import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAdminComponent } from './blog-admin.component';

describe('BlogAdminComponent', () => {
  let component: BlogAdminComponent;
  let fixture: ComponentFixture<BlogAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogAdminComponent]
    });
    fixture = TestBed.createComponent(BlogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
