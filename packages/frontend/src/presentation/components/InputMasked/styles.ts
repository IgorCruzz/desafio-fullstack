import styled from 'styled-components'
import { darken, rgba } from 'polished'

export const Container = styled.div`
  width: 100%;
  margin-bottom: 24px;
  left: -20px;

  label {
    color: ${props => props.theme.colors.green};
  }
  position: relative;
  label {
    font-size: 1.0rem;
  }

  img {
    position: absolute;
    left: 12px;
    height: 30px;
    width: 30px;
    margin: auto 0;
    top: 10px;
    bottom: 0;
  }

  input {
    width: 100%;
    height: 3.2rem;
    margin-top: 0.8rem;
    padding: 0 3.0rem;
    color: ${props => props.theme.colors.inputColor};
    background: ${props => props.theme.colors.backgroundInput};
    border-radius: 0.8rem;
    border: 1px solid ${props => props.theme.colors.grey};
    box-shadow: 0px 13px 7px -10px ${props => props.theme.colors.grey};

    outline: 0;
    font: 1.2rem Archivo;
  }

  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: ${props => props.theme.colors.grey};
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
`

export const InputGroup = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  column-gap: 1.6rem;

  align-items: center;

  @media (max-width: 750px) {
   flex-direction: column
  }
`
