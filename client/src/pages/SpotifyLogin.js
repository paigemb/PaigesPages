import styled from "styled-components/macro";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d4d1e2;
`;

const StyledLoginButton = styled.a`
  font-family: LovelyBubbles;
  display: inline-block;
  background-color: lavender;
  color: black;
  border-radius: 5px;
  border-color: black;
  border-style: outset;
  font-weight: 700;
  font-size: 30px;
  padding: 10px;
  text-decoration:none;
  &:hover {
    background-color: pink;
  }
`;

const SpotifyLogin = () => (
  <StyledLoginContainer>
    <StyledLoginButton href="http://localhost:8888/spotify/login">
      Log in to Spotify
    </StyledLoginButton>
  </StyledLoginContainer>
);

export default SpotifyLogin;
