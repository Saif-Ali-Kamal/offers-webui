import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTagService, deleteTagService, getAllTagsService, getTagByIdService, updateTagService } from '../../services/tags';
import { notify } from '../../utils/utils';

export const addTagAction = createAsyncThunk(
  'tag/addTagAction',
  async (tagData) => {
    return addTagService(tagData).then(res => {
      notify('success', 'Tag added successfully', res.message);
      return res.data;
    }).catch(ex => notify('error', 'Error in adding tag', ex));
  }
);

export const getAllTagsAction = createAsyncThunk(
  'tag/getAllTagsAction',
  async (reqFilters) => {
    return getAllTagsService().then(res => {
      notify('success', 'Tag fetched successfully', res.message);
      return { tags: res?.tags, totalTags: res?.totalTags };
    }).catch(ex => notify('error', 'Error in fetching tag', ex));
  }
);

export const getTagByIdAction = createAsyncThunk(
  'tag/getTagByIdAction',
  async (id) => {
    return getTagByIdService(id).then(res => {
      notify('success', 'Tag fetched successfully', res.message);
      return res.tag;
    }).catch(ex => notify('error', 'Error in fetching tag', ex));
  }
);

export const updateTagAction = createAsyncThunk(
  'tag/updateTagAction',
  async (updatedTag) => {
    return updateTagService(updatedTag).then(res => {
      notify('success', 'Tag updated successfully', res.message);
    }).catch(ex => notify('error', 'Error in updating tag', ex));
  }
);

export const deleteTagAction = createAsyncThunk(
  'tag/deleteTagAction',
  async (id) => {
    return deleteTagService(id).then(res => {
      notify('success', 'Tag deleted successfully', res.message);
    }).catch(ex => notify('error', 'Error in deleting tag', ex));
  }
);