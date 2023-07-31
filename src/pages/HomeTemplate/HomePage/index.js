import React from "react";
import styled from "styled-components";
import Loader from "components/Loader";
import { DatePicker } from "antd";

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export default function HomePage() {
  return (
    <Wrapper>
      <Title>Hello World!</Title>
      <Loader primary={true} />
      {/* <Button type="primary">Primary</Button> */}
      <DatePicker onChange={onChange} />
    </Wrapper>
  );
}
