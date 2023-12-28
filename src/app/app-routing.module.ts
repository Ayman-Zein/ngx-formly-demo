import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormalyComponent } from './formaly/formaly.component';
import { FormlyJsonComponent } from './formly-json/formly-json.component';
import { FormlySchemaComponent } from './formly-schema/formly-schema.component';

const routes: Routes = [
  { path: '', redirectTo: '/basic', pathMatch: 'full' }, // Redirect to /home
  { path: 'basic', component: FormalyComponent }, // You can change 'home' to your default route
  { path: 'jsonForms', component: FormlyJsonComponent },
  { path: 'jsonSchema', component: FormlySchemaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
