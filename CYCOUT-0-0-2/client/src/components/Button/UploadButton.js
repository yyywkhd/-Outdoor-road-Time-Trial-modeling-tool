import styled from 'styled-components';
import { Button } from 'antd';

export const FancyButton = styled.button.attrs(props => ({
    className: "btn-outline btn-outline"
}))`
`

export const UploadButton = styled(Button)`
  border: none;
  color: rgb(255, 255, 255);
  background-color: rgb(63, 169, 255);
  border-radius: 8px;
  padding-left: 30px;
  padding-right: 30px;
  transition: all 0.4s ease-out;
  font-weight: bold;
  &:hover {
    background-color: rgb(7, 58, 99);
  }
`;