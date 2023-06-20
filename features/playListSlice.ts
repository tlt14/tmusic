import { ICategory, PlaylistResponse, ZingMp3Response } from '@/pages/types/ZingMP3Response.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface IPlayList {
  data:PlaylistResponse  
}

// Define the initial state using that type
const initialState: IPlayList = {
    data: {
      encodeId: '',
      title: '',
      thumbnail: '',
      isoffical: false,
      link: '',
      isIndie: false,
      releaseDate: '',
      sortDescription: '',
      releasedAt: 0,
      genreIds: [],
      PR: false,
      artists: [],
      artistsNames: '',
      playItemMode: 0,
      subType: 0,
      uid: 0,
      thumbnailM: '',
      isShuffle: false,
      isPrivate: false,
      userName: '',
      isAlbum: false,
      textType: '',
      isSingle: false,
      distributor: '',
      description: '',
      aliasTitle: '',
      sectionId: '',
      contentLastUpdate: 0,
      artist: {},
      genres: [],
      song: {
        items: [],
        total: 0,
        totalDuration: 0
      },
      like: 0,
      listen: 0,
      liked: false
    }
}

export const playListSlice = createSlice({
  name: 'playList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPlayList: (state, action: PayloadAction<PlaylistResponse>) => {
      state.data = action.payload
    }
  },
})

export const { setPlayList } = playListSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default playListSlice.reducer