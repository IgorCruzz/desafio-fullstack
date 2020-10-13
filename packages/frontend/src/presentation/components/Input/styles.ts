import styled, { css } from 'styled-components'
import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isField: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  margin-bottom: 24px;

  label {
    color: ${props => props.theme.colors.green};
  }
  position: relative;
  label {
    font-size: 1.0rem;
  }

  margin-top: 25px;
  background: ${props => props.theme.colors.backgroundInput};
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  height: 50px;
  border: 2px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.inputColor}
  display: flex;
  align-items: center;
  & + div {
    margin-top: 30px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #2a9d8f;
      border-color: #2a9d8f;
    `}
  ${props =>
    props.isField &&
    css`
      color: #2a9d8f;
    `}
  input {
    width: 90%;
    flex: 1;
    background: transparent;
    border: 0;
    color: ${props => props.theme.colors.inputColor};
    &::placeholder {
      color: #2a9d8f;
    }
  }
  svg {
    margin-right: 16px;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #c53030;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`