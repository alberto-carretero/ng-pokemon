import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonI } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  // Pokemon data
  @Input() pokemon: PokemonI = {
    id: 0,
    name: '',
    sprites: {},
  };
  // Lives
  @Input() lives: number[] = [1, 2, 3];
  // Score
  @Input() score: number = 0;

  // Reports whether the user has been successful
  @Output() isSuccessful = new EventEmitter<number>();
  // Reports whether the game is finished
  @Output() isFinished = new EventEmitter<void>();

  // Options
  public buttonsOptions: string[] = [];

  // Boolean to manage the state of the pokemon image filter property
  public hasBeenSuccessful: boolean = false;

  // Boolean to disable the option buttons when the user hits or misses
  public disableButtons: boolean = false;

  // Subscriptions array
  private subscriptions = new Subscription();

  constructor(private pokemonService: PokemonService) {}

  /**
   * Gets the button options
   */
  ngOnInit(): void {
    this.subscriptions.add(
      this.pokemonService.getPokemonNames().subscribe((pokemonsNames) => {
        this.setPokemonButtonsOptions(pokemonsNames);
      })
    );
  }

  /**
   * Removes the subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Checks whether the user has been successful or not
   * @param pokemonSelected Pokemon selected
   */
  public checkSelection(pokemonSelected: any): void {
    if (this.pokemon.name === pokemonSelected) {
      this.hasBeenSuccessful = true;
      this.disableButtons = true;
      this.score++;
      setTimeout(() => {
        this.nextPokemon(this.score);
      }, 1000);
    } else {
      this.lives.pop();
      if (this.lives.length === 0) {
        this.endGame();
      }
    }
  }

  /**
   * Creates the button options randomly
   * @param pokemonNames Pokemon button options
   */
  private async setPokemonButtonsOptions(pokemonNames: string[]): Promise<void> {
    try {
      let pokemonIds: number[] = [];
      let currentPokemonId: number = this.pokemon.id;

      pokemonIds.push(currentPokemonId);

      for (let index = 0; index < 2; index++) {
        currentPokemonId = await this.getRandomNumber();

        if (!pokemonIds.includes(currentPokemonId)) {
          pokemonIds.push(currentPokemonId);
        } else {
          index = index > 0 ? index - 1 : 0;
        }
      }

      pokemonIds = pokemonIds.sort();
      this.setPokemonsNames(pokemonNames, pokemonIds);
    } catch (error) {
      console.log('🚀 ~ file: board.component.ts ~ line 57 ~ BoardComponent ~ getPokemonButtonsOptions ~ error', error);
    }
  }

  /**
   *
   * @returns A random number between min (1 (included)) and max (151 (excluded))
   */
  private getRandomNumber(): number {
    return this.pokemonService.generateRandomNumber();
  }

  /**
   * Sets pokemon names to the button options array
   * @param pokemonNames Pokemon names
   * @param pokemonIds Pokemon ids (Position in the array)
   */
  private setPokemonsNames(pokemonNames: string[], pokemonIds: number[]): void {
    pokemonIds.map((id) => {
      const name = Object.values(pokemonNames[id - 1])[0];
      this.buttonsOptions.push(name);
    });
  }

  /**
   * Emits each success with its score
   * @param score Score
   */
  private nextPokemon(score: number): void {
    this.isSuccessful.emit(score);
  }

  /**
   * Emits when the game is finished
   */
  private endGame(): void {
    this.isFinished.emit();
  }
}
