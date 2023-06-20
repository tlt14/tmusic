import { ICategory, PlaylistResponse, ZingMp3Response } from '@/pages/types/ZingMP3Response.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ISong } from '../pages/types/ZingMP3Response.type';

// Define a type for the slice state
interface IPlayList {
  currentPlay: ISong,
  isPlaying: boolean,
  playlist: Array<ISong>
  loop: boolean,
  shuffle: boolean
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
  isPlaying: false,
  playlist: [],
  loop: false,
  shuffle: false
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
    },
    setListSong: (state, action: PayloadAction<Array<ISong>>) => {
      state.playlist = action.payload
    },
    setLoop: (state) => {
      state.loop = !state.loop
      if(state.loop){
        state.shuffle = false
      }
    },
    setShuffle: (state) => {
      state.shuffle = !state.shuffle
      if(state.shuffle){
        state.loop = false
      }
    }
  },
})

export const { setPlay , setPlayMusic, setListSong, setLoop, setShuffle} = playMusicSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default playMusicSlice.reducer