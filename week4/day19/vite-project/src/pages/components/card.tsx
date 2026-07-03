import styled from "styled-components";

interface CardProps {
  title: string;
  details: string;
  age: number;
}

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 20px;
  width: 300px;
  margin: 20px auto;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  h1 {
    margin-bottom: 10px;
    color: #333;
  }

  h2 {
    margin: 8px 0;
    color: #666;
    font-size: 18px;
    font-weight: 500;
  }
`;

export const Card = ({ title, details, age }: CardProps) => {
  return (
    <CardContainer>
      <h1>{title}</h1>
      <h2>Details: {details}</h2>
      <h2>Age: {age}</h2>
    </CardContainer>
  );
};