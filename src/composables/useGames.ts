import { ref, computed } from 'vue'
import gamesData from '../data/games.json'

export interface Game {
  id: number;
  title: string;
  score: number;
  review: string;
  date: string;
  coverId: string;
  year: number;
  goty: boolean;
  nominee: boolean;
  platform: 'PC' | 'PS5';
  finished: boolean;
  platinum: boolean;
}

export function useGames() {
  const games = ref<Game[]>(gamesData as Game[])

  const topGames = computed(() => {
    return [...games.value].sort((a, b) => b.score - a.score).slice(0, 10)
  })

  const gotyWinners = computed(() => {
    return games.value.filter(g => g.goty).sort((a, b) => b.year - a.year)
  })

  const getNomineesByYear = (year: number) => {
    return games.value.filter(g => g.year === year && g.nominee)
  }

  const getGameCover = (coverId: string) => {
    // Steam Portrait Artwork URL
    return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${coverId}/library_600x900_2x.jpg`
  }

  return {
    games,
    topGames,
    gotyWinners,
    getNomineesByYear,
    getGameCover
  }
}
