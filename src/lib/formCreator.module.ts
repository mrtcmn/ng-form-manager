import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { formCreatorComponentForm } from './main/formCreatorForm.component';
import { formViewer } from './main/formViewer.component';
import { Resizer } from './main/directives.resize';



@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ formCreatorComponentForm, formViewer, Resizer ],
  exports: [formCreatorComponentForm, formViewer]
})
export class formCreatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: formCreatorModule
    };
  }
}
