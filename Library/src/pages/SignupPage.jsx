import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

//components
import TopBar from "../components/TopBar";

const SignupPage = () => {
  const navigate = useNavigate();
  const [id, setID] = useState();
  const [pw, setPW] = useState();
  const [name, setName] = useState();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //---------------------------------------

  // 문제 3) id, pw, name 정보를 data에 담아 post 방식으로 요청 보낸 후 성공 시 로그인 페이지로 이동

  const goSignup = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}account/signup/`,
        data: { username: id, password: pw, nickname: name },
      });
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  //---------------------------------------

  return (
    <>
      <Wrapper>
        <TopBar />
        <Container>
          <img src="/book.png" alt="book" />
          <InputWrapper>
            <input
              placeholder="아이디"
              onChange={(e) => setID(e.target.value)}
            ></input>
            <input
              placeholder="비밀번호"
              onChange={(e) => setPW(e.target.value)}
            ></input>
            <input
              placeholder="닉네임"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button onClick={goSignup}>가입하기</button>
          </InputWrapper>
        </Container>
      </Wrapper>
    </>
  );
};

export default SignupPage;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: 10%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-top: 30px;

  input,
  button {
    height: 40px;
    border-style: none;
    outline: none;
    border-radius: 4px;
  }

  input {
    margin-bottom: 15px;
    padding-left: 7%;

    background: #ffffff;
    box-shadow: 0px 2px 6px 0px #a5a5a533;
  }

  button {
    margin-bottom: 10px;
    background: #809bc3;
    color: white;
    border: 1px solid #809bc3;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
`;
