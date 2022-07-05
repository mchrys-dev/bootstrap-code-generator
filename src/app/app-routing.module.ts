import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionComponent } from './components/accordion/accordion.component';
import { CollapseComponent } from './components/collapse/collapse.component';
import { TabsComponent } from './components/tabs/tabs.component';

const routes: Routes = [
  {path: 'components/accordion', component: AccordionComponent},
  {path: 'components/collapse', component: CollapseComponent},
  {path: 'components/tabs', component: TabsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
