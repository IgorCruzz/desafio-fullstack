import styled from 'styled-components';
import {darken, rgba} from 'polished';

import {FiEye, FiEyeOff} from 'react-icons/fi';

interface Props {
  isPassword: boolean;
}
export const Container = styled.div<Props>`
  width: 100%;
  margin-bottom: 24px;
  label {
    color: ${(props) => props.theme.colors.inputColor};
  }
  position: relative;
  label {
    font-size: 1.4rem;
  }
  input {
    width: 100%;
    height: 5.6rem;
    margin-top: 0.8rem;
    padding: 0 1.6rem;
    background: ${(props) => props.theme.colors.backgroundInput};
    border-radius: 0.8rem;
    border: 1px solid ${(props) => darken(0.1, props.theme.colors.grey)};
    box-shadow: 0px 13px 7px -10px ${(props) => rgba(darken(0.1, props.theme.colors.grey), 0.4)};
    outline: 0;
    font: 1.6rem Archivo;
  }
  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: ${(props) => props.theme.colors.backgroundInput};
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
  & + & {
    margin-top: 1.4rem;
  }
  @media (min-width: 700px) {
    & + & {
      margin-top: 0;
    }
  }
`;

export const Eye = styled(FiEye)`
  position: absolute;
  top: 60%;
  right: 4%;
  cursor: pointer;
  color: ${({theme}) => theme.colors.green};
  &:hover {
    color: ${({theme}) => theme.colors.black};
  }
`;
export const EyeOff = styled(FiEyeOff)`
  position: absolute;
  top: 60%;
  right: 4%;
  cursor: pointer;
  color: ${({theme}) => theme.colors.green};
  &:hover {
    color: ${({theme}) => theme.colors.black};
  }
`;

export const InputGroup = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  column-gap: 1.6rem;
  align-items: center;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
