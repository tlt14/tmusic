import { ICategory, PlaylistResponse, ZingMp3Response } from '@/pages/types/ZingMP3Response.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state


// Define the initial state using that type
const initialState = {
    data: {
        
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