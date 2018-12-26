import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { formViewer } from './main/formViewer.component';
import { Resizer } from './main/directives.resize';



@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ formViewer, Resizer ],
  exports: [ formViewer]
})
export class formManagerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: formManagerModule
    };
  }
}
