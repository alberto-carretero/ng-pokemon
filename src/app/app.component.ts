import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonI } from './interfaces/pokemon';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  // Title of the game
  public title: string = 'Who is?';

  // Pokemon data
  public pokemon: PokemonI = {
    id: 0,
    name: '',
    sprites: [],
  };

  // Lives
  public lives: number[] = [1, 2, 3];

  // Score
  public score: number = 0;

  // Boolean to inform when the game can be initialised
  public loading: boolean = true;

  // Boolean to inform when the game is finished
  public isFinished: boolean = false;

  // Array of the pokemons shown. Controls that they are not repeated
  private pokemonsShown: number[] = [];

  // Array of subscriptions
  private subscriptions = new Subscription();

  /**
   * Start the game
   * @param pokemonService
   */
  constructor(private pokemonService: PokemonService) {
    this.startGame();
  }

  /**
   * Removes the subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * End the game. Manage the view to show the end of the game
   */
  public endGame(): void {
    this.isFinished = true;
  }

  /**
   *
   * @param score Score
   */
  public nextPokemon(score: number): void {
    this.loading = true;
    this.score = score;
    this.startGame();
  }

  /**
   * Gets a pokemon from a random number
   */
  private async startGame(): Promise<void> {
    try {
      const pokemonId = await this.pokemonService.generateRandomNumber();

      if (!this.pokemonsShown.includes(pokemonId)) {
        this.pokemonsShown.push(pokemonId);
        this.subscriptions.add(
          this.pokemonService.getPokemon(pokemonId).subscribe((pokemon) => {
            this.loading = false;
            this.pokemon = pokemon;
          })
        );
      } else {
        this.startGame();
      }
    } catch (error) {
      this.loading = true;
      console.log('🚀 ~ file: app.component.ts ~ line 50 ~ AppComponent ~ startGame ~ error', error);
    }
  }
}
