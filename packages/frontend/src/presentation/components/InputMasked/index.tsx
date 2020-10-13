import React, { useRef, useEffect } from 'react';
import InputMask, { Props as InputProps } from 'react-input-mask'

import { useField } from '@unform/core'
import { Container } from './styles'

interface Props extends InputProps {
  flex?: number
  name: string
  icon: any
  mask: string
}

const InputMasked: React.FC<Props> = ({ flex, name, icon, mask, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container className="input-block" style={{ flex }}>
      <img src={icon} alt="input icon"/>
      <InputMask maskChar=" " mask={mask} ref={inputRef} {...rest} />
      { error && <p>{error}</p>}
    </Container>
  )
}

export default InputMasked