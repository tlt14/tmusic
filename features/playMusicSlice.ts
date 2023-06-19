import { ICategory, PlaylistResponse, ZingMp3Response } from '@/pages/types/ZingMP3Response.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ISong } from '../pages/types/ZingMP3Response.type';

// Define a type for the slice state
interface IPlayList {
  currentPlay: ISong,
  isPlaying: boolean
}

// Define the initial state using that type
const initialState:IPlayList = {
    currentPlay: {
      encodeId: '',
      title: '',
      cover: '',
      alias: '',
      isOffical: false,
      description: '',
      artistsNames: '',
      username: '',
      artists: [],
      thumbnailM: '',
      thumbnail: '',
      duration: 0,
      releaseDate: 0,
      genreIds: [],
      streamingStatus: 0,
      sortDescription: ''
    },
    isPlaying: false
}

export const playMusicSlice = createSlice({
  name: 'playMusic',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPlay: (state, action: PayloadAction<ISong>) => {
      state.currentPlay = action.payload
    },
    setPlayMusic: (state,action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    }
  },
})

export const { setPlay , setPlayMusic} = playMusicSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default playMusicSlice.reducer