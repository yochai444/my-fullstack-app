// src/pages/Login.styled.ts
import styled from "styled-components";

export const FullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  direction: rtl;
`;
export const ErrorMessage = styled.div`
  color: #ff5555;
  background-color: #2c0000;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
`;

export const LoginBox = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  width: 400px;
  max-width: 90%;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledInput = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
`;

export const StyledButton = styled.button`
  padding: 0.75rem;
  font-size: 1.1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #1256a1;
  }
`;
