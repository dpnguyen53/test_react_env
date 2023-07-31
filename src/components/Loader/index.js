import React from "react";
import styled, { keyframes } from "styled-components";
// import "./style.css";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid ${(props) => (props.$primary ? "red" : "#3498db")};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

export default function Loader() {
  return <Loading $primary></Loading>;
}
