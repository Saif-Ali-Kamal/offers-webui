import { createSlice } from '@reduxjs/toolkit';
import { failed, loading, success } from '../../utils/constant';
import { addTagAction, deleteTagAction, getAllTagsAction, getTagByIdAction, updateTagAction } from '../actions/tagsActions';

const initialState = {
  tagList: [],
  totalTags: 0,
  selectedTag: {},
  status: null
}

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducer:{},
  reducers: {
    clearSelectedTag: (state) => {
      state.selectedTag = {};
    }
  },
  extraReducers: {
    [addTagAction.pending]: (state) => {
      state.status = loading;
    },
    [addTagAction.fulfilled]: (state, action) => {
      state.status = success;
      state.tagList.push(action.payload);
    },
    [addTagAction.rejected]: (state) => {
      state.status = failed;
    },
    [getAllTagsAction.pending]: (state) => {
      state.status = loading;
    },
    [getAllTagsAction.fulfilled]: (state, action) => {
      state.status = success;
      state.tagList = action.payload.tags;
      state.totalTags = action.payload.totalTags;
    },
    [getAllTagsAction.rejected]: (state) => {
      state.status = failed;
    },
    [getTagByIdAction.pending]: (state) => {
      state.status = loading;
    },
    [getTagByIdAction.fulfilled]: (state, action) => {
      state.status = success;
      state.selectedTag = action.payload; 
    },
    [getTagByIdAction.rejected]: (state) => {
      state.status = failed;
    },
    [updateTagAction.pending]: (state) => {
      state.status = loading;
    },
    [updateTagAction.fulfilled]: (state) => {
      state.status = success;
      state.selectedTag = {};
    },
    [updateTagAction.rejected]: (state) => {
      state.status = failed;
    },
    [deleteTagAction.pending]: (state) => {
      state.status = loading;
    },
    [deleteTagAction.fulfilled]: (state) => {
      state.status = success;
    },
    [deleteTagAction.rejected]: (state) => {
      state.status = failed;
    }, 
  }
});

export const { clearSelectedTag } = tagSlice.actions;

export default tagSlice.reducer;
