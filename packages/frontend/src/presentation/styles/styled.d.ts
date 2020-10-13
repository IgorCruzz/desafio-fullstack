import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    colors: {

      primary: string
      secundary: string
      border: string
      background: string
      li: string
      toggle: string
      text: string
      inputColor: string
      inputPlaceholder: string
      backgroundToggle: string
      insideButton: string

      white: string
      backgroundTwo: string
      backgroundInput: string
      togglePanel: string
      textWhite: string
      black: string
      grey: string
      opaque: string
      purple: string
      purpleDark: string
      green: string
      orange: string
      pink: string
      blue: string
      red: string
      yellow: string
    }
  }
}
