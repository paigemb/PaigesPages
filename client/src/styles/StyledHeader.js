import styled from "styled-components/macro"

const StyledHeader = styled.div`
.header {
  overflow: hidden;
  background-color: darkgrey;
  padding: 20px 10px;
}

.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}

.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

.a:hover {
  background-color: lavender;
  color: black;
}

.header a.active {
  background-color: lightpink;
  color: black;
}

.header-right {
  float: right;
}
@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  .header-right {
    float: none;
  }
}
`

export default StyledHeader;