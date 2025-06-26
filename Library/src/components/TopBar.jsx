import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const token = window.localStorage.getItem("token");

  const navigator = () => {
    path === "/"
      ? token
        ? navigate("/mypage")
        : navigate("/login")
      : navigate("/");
  };

  return (
    <Wrapper>
      <img
        src={path === "/" ? "/userIcon.svg" : "/menu.svg"}
        alt="menu"
        onClick={navigator}
      />
      <Title style={{ backgroundImage: `url("/title.svg")` }}>
        {path === "/"
          ? "책 목록"
          : path === "/mypage"
          ? "마이페이지"
          : path === "/signup"
          ? "회원가입"
          : "로그인"}
      </Title>
    </Wrapper>
  );
};

export default TopBar;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-style: none none solid none;
  border-bottom: solid 1px #9b9b9b;

  img {
    width: 30px;
    position: absolute;
    margin-right: 300px;
    cursor: pointer;
  }
`;

const Title = styled.div`
  width: 160px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
