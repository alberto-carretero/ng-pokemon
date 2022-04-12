import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ButtonComponent } from './components/button/button.component';
import { EndGameComponent } from './components/end-game/end-game.component';
import { LivesComponent } from './components/lives/lives.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

@NgModule({
  declarations: [AppComponent, PokemonComponent, LoadingComponent, ButtonComponent, BoardComponent, LivesComponent, EndGameComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
