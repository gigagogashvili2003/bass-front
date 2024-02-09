import { FC } from "common/types";
import { Container } from "./Container";
import Header from "./Header";
import Main from "./Main";

export const MainLayout: FC<{}> = (props) => {
  return (
    <Container>
      <Header />
      <Main>{props.children}</Main>
    </Container>
  );
};
