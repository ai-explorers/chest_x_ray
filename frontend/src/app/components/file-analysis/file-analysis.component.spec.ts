import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAnalysisComponent } from './file-analysis.component';

describe('FileAnalysisComponent', () => {
  let component: FileAnalysisComponent;
  let fixture: ComponentFixture<FileAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
