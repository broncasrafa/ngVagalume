import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { ArtistaDetalhesComponent } from './components/artista/artista-detalhes/artista-detalhes.component';
import { DiscografiaComponent } from './components/discografia/discografia.component';
import { DiscografiaDetalhesComponent } from './components/discografia/discografia-detalhes/discografia-detalhes.component';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { TraducaoComponent } from './components/traducao/traducao.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { ArtistaService } from './services/artista.service';
import { DiscografiaService } from './services/discografia.service';
import { GaleriaService } from './services/galeria.service';
import { PesquisaService } from './services/pesquisa.service';
import { TraducaoService } from './services/traducao.service';


@NgModule({
  declarations: [
    AppComponent,
    ArtistaComponent,
    ArtistaDetalhesComponent,
    DiscografiaComponent,
    DiscografiaDetalhesComponent,
    PesquisaComponent,
    GaleriaComponent,
    TraducaoComponent,
    PageNotFoundComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ArtistaService,
    DiscografiaService,
    GaleriaService,
    PesquisaService,
    TraducaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
