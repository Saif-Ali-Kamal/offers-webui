import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Col, Row } from "antd";
import PageLayout from "../../../components/admin/layout/PageLayout";
import { addCountryAction, updateCountryAction } from "../../../redux/actions/countryActions";
import AddEditCountryForm from '../../../components/admin/countries/addEditCountry/AddEditCountryForm';
import { clearSelectedCountry } from '../../../redux/reducers/countryReducer';

const AddEditCountry = ({ type }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedCountry, status } = useSelector(state => state.countries);
  
  const handleCancelCountry = () => {
    dispatch(clearSelectedCountry());
    history.push('/admin/countries');
  }

  const handleAddCountry = (country) => {
    dispatch(addCountryAction(country));
  }

  const handleEditCountry = (id, editedCountry) => {
    const updatedCountry = { id, editedCountry };
    dispatch(updateCountryAction(updatedCountry));
  }

  return (
    <PageLayout 
      selectedNav='countries' 
      crumbs={[{ text: 'Countries', link: '/admin/countries' }, 
        type === 'add' ? 
        { text: 'Add country' } : { text: 'Edit country' }]} 
      innerPage
      title={type === 'add' ? 'Add country' : 'Edit country'}
      handleClick={handleCancelCountry}
      status={status}
    >
      <Row>
        <Col lg={{ span: 16, offset: 4 }} xs={{ span: 24, offset: 0 }}>
          <AddEditCountryForm
            formType={type}
            initialvalues={type === 'edit' ? selectedCountry : null}
            handleAddCountry={handleAddCountry}
            handleEditCountry={handleEditCountry}
            handleCancelCountry={handleCancelCountry} 
          />
        </Col>
      </Row>
    </PageLayout>
  );
}

export default AddEditCountry;