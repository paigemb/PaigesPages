import { css } from "styled-components/macro"

import "./LovelyBubbles.ttf"

const fonts = css `
    @font-face {
        font-family: LovelyBubbles;
        src: url(./LovelyBubbles.tff) format("tff);
        font-weight: 400;
        font-style: normal;
    }`

    export default fonts;