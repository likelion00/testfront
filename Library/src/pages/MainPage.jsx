import { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";

// components
import TopBar from "../components/TopBar";
import Book from "../components/Book";

const MainPage = () => {
  // 책 목록을 저장할 state
  const [bookList, setBookList] = useState([]);
  // 렌더링 상태를 나타낼 state
  const [render, setRender] = useState(1);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //---------------------------------------

  // 문제 1) 로컬 스토리지에서 token 값을 받아와 token 변수에 할당하기
  const token = localStorage.getItem("token");

  // 문제 2) axios를 사용하여 책 목록을 받아오는 API를 호출하는 getBookList 함수를 작성하기. (이때 받아온 데이터는 setBookList를 사용하여 bookList에 저장해주세요.)
  //get 메서드 활용: reac_4 get 실습 참고
  const getBookList = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}book/`, // 최종 요청 URL, 벡틱 안 붙여서 오류났음
        headers: {
          Authorization: token && `Bearer ${token}`,
        },
      }); //

      console.log("책 목록 응답:", response.data);
      setBookList(response.data.data); // 처음에 .data를 한 번 만 붙여서 오류났음
    } catch (error) {
      console.error("책 목록 조회 에러:", error); // optional로 구현, config 쓰듯이
    }
  };

  //---------------------------------------

  // getBookList 함수를 호출하는 코드
  useEffect(() => {
    getBookList();
  }, [render]);

  return (
    <>
      <Wrapper>
        <Container>
          <TopBar />
          <BookList>
            {bookList.map((book) => (
              <Book
                key={book.id}
                book={book}
                render={render}
                setRender={setRender}
              />
            ))}
          </BookList>
        </Container>
      </Wrapper>
    </>
  );
};

export default MainPage;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookList = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
`;
