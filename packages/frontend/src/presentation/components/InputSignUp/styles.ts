import styled, { css } from 'styled-components'
import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isField: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  margin-top: 15px;
  margin-left: -20px;
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
    margin-top: 20px;
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
      color: #023e8a;
    `}
  input {
    width: 90%;
    background: transparent;
    border: 0;
    color: #2a9d8f;
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