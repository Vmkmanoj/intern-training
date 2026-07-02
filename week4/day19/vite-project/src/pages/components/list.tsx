import styled from "styled-components";

interface Item {
  id: number;
  name: string;
  completed: boolean;
}

interface ListProps {
  items: Item[];
}

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li<{ completed: boolean }>`
  padding: 12px;
  margin: 8px 0;
  border-radius: 8px;
  background-color: ${({ completed }) =>
    completed ? "#d4edda" : "#f8d7da"};
  color: ${({ completed }) =>
    completed ? "#155724" : "#721c24"};
  font-weight: bold;
`;

export const List =({ items }: ListProps)=> {
  return (
    <ListContainer>
      {items.map((item) => (
        <ListItem key={item.id} completed={item.completed}>
          {item.name}
        </ListItem>
      ))}
    </ListContainer>
  );
}
