import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PageLayout from '../../../components/admin/layout/PageLayout';
import TagTable from '../../../components/admin/tags/tagTable/TagTable';
import { deleteTagAction, getAllTagsAction, getTagByIdAction } from '../../../redux/actions/tagsActions';

const Tags = () => {

  const { tagList, status } = useSelector(state => state.tags);
  const [reqFilters, setReqFilters] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    handleGetAllTags(reqFilters);
  }, [reqFilters])

  const handleGetAllTags = (reqFilters) => {
    dispatch(getAllTagsAction(reqFilters));
  }

  const handleDeleteTag = (id) => {
    dispatch(deleteTagAction(id))
      .then(() => handleGetAllTags());
  }

  const handleOpenAddTag = () => {
    history.push('/admin/tags/addTag');
  }

  const handleOpenEditTag = (id) => {
    dispatch(getTagByIdAction(id))
      .then(() => history.push('/admin/tags/editTag')); 
  }

  return (
    <PageLayout selectedNav='tags' crumbs={[{ text: 'Tags' }]} status={status}> 
      <TagTable 
        tags={tagList}
        reqFilters={reqFilters}
        setReqFilters={setReqFilters}
        handleAddTagVisible={handleOpenAddTag}
        handleEditTagVisible={handleOpenEditTag}
        handleDeleteTag={handleDeleteTag}
      />
    </PageLayout>
  );
}

export default Tags;