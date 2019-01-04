import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { ArtistaDetalhesComponent } from './components/artista/artista-detalhes/artista-detalhes.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { TraducaoComponent } from './components/traducao/traducao.component';
import { DiscografiaComponent } from './components/discografia/discografia.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DiscografiaDetalhesComponent } from './components/discografia/discografia-detalhes/discografia-detalhes.component';


const routes: Routes = [
  { path: '', component: TraducaoComponent },
  { path: 'artistas', component: ArtistaComponent },
  { path: 'artistas/:id', component: ArtistaDetalhesComponent },
  { path: 'fotos', component: GaleriaComponent },
  { path: 'pesquisa', component: PesquisaComponent },
  { path: 'albums', component: DiscografiaComponent },
  { path: 'albums/:id', component: DiscografiaDetalhesComponent },
  
  // otherwise redirect to home
  // { path: '**', redirectTo: '' }
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]  
})
export class AppRoutingModule { }
