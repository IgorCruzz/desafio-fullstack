import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
html {
  @media (max-width: 650px) {
    font-size: 50%;
  }
  font-size: 62.5%;
}
}
html, body, #root {
  height: 100%;
  }
body {
  font: 1.6rem 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  background: linear-gradient(180deg, #5DC74D 0%, rgba(93, 199, 77, 0.67) 100%);
  background-attachment: fixed;
}
input {
  color: #4F4F4F;
}

input, button, textarea {

  font: 1.6rem 'Open Sans', sans-serif;
}
button {
  cursor: pointer;
}
`
