import React from 'react';
import { Col, Row } from 'antd';
import OfferCard from './OfferCard';
 
const OfferList = ({ offerList }) => {
  console.log(offerList)
  return(
    <Row gutter={[16, 16]}>
      {offerList.map(offer => {
        return <Col key={offer._id} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }} xxl={{ span: 4 }}>
          <OfferCard offer={offer} />
        </Col>
      })}
    </Row>
  );
}

export default OfferList;