import React from "react";
import { Col, Image, Row } from "antd";

const OfferDetails = ({ record }) => {
  return(
    <Row gutter={[8, 8]}>
      {Object.entries(record).map(([key, value]) => {
        if(key === 'image'){
          return <>
            <Image src={value[0]} />
            <Image src={value[1]} />
          </>
        }
        return <Col lg={{ span: 12 }}>
            {key}: {value}
          </Col>   
      })}
    </Row>
  );
}

export default OfferDetails;