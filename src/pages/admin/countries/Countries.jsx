import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PageLayout from '../../../components/admin/layout/PageLayout';
import CountriesTable from '../../../components/admin/countries/countriesTable/CountriesTable';
import { deleteCountryAction, getAllCountriesAction, getCountryByIdAction } from '../../../redux/actions/countryActions';

const Countries = () => {

  const { countryList, status } = useSelector(state => state.countries);
  const [reqFilters, setReqFilters] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    handleGetAllCountries(reqFilters);
  }, [reqFilters])

  const handleGetAllCountries = (reqFilters) => {
    dispatch(getAllCountriesAction(reqFilters));
  }

  const handleDeleteCountry = (id) => {
    dispatch(deleteCountryAction(id))
      .then(() => handleGetAllCountries());
  }

  const handleOpenAddCountry = () => {
    history.push('/admin/countries/addCountry');
  }

  const handleOpenEditCountry = (id) => {
    dispatch(getCountryByIdAction(id))
      .then(() => history.push('/admin/countries/editCountry')); 
  }

  return (
    <PageLayout selectedNav='countries' crumbs={[{ text: 'Countries' }]} status={status}> 
      <CountriesTable 
        countries={countryList}
        reqFilters={reqFilters}
        setReqFilters={setReqFilters}
        handleAddCountryVisible={handleOpenAddCountry}
        handleEditCountryVisible={handleOpenEditCountry}
        handleDeleteCountry={handleDeleteCountry}
      />
    </PageLayout>
  );
}

export default Countries;