import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Col, Row } from "antd";
import PageLayout from "../../../components/admin/layout/PageLayout";
import { addTagAction, updateTagAction } from "../../../redux/actions/tagsActions";
import AddEditTagForm from '../../../components/admin/tags/addEditTag/AddEditTagForm';
import { clearSelectedTag } from '../../../redux/reducers/tagsReducer';

const AddEditTag = ({ type }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedTag, status } = useSelector(state => state.tags);
  
  const handleCancelTag = () => {
    dispatch(clearSelectedTag());
    history.push('/admin/tags');
  }

  const handleAddTag = (tag) => {
    dispatch(addTagAction(tag));
  }

  const handleEditTag = (id, editedTag) => {
    const updatedTag = { id, editedTag };
    dispatch(updateTagAction(updatedTag));
  }

  return (
    <PageLayout 
      selectedNav='tags' 
      crumbs={[{ text: 'Tags', link: '/admin/tags' }, 
        type === 'add' ? 
        { text: 'Add tag' } : { text: 'Edit tag' }]} 
      innerPage
      title={type === 'add' ? 'Add tag' : 'Edit tag'}
      handleClick={handleCancelTag}
      status={status}
    >
      <Row>
        <Col lg={{ span: 16, offset: 4 }} xs={{ span: 24, offset: 0 }}>
          <AddEditTagForm
            formType={type}
            initialvalues={type === 'edit' ? selectedTag : null}
            handleAddTag={handleAddTag}
            handleEditTag={handleEditTag}
            handleCancelTag={handleCancelTag} 
          />
        </Col>
      </Row>
    </PageLayout>
  );
}

export default AddEditTag;