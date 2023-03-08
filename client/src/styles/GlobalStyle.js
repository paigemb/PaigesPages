/*allows us to write unscoped CSS, as if we were writing it in a styles.css file */

import { createGlobalStyle } from "styled-components/macro";
import fonts from "./fonts/fonts";

const GlobalStyle = createGlobalStyle`

${fonts};

 h1 {
    font-family var(--font)
 }
`

export default GlobalStyle