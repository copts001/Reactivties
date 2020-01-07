import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
interface Iprops {
  openCreateForm: ()=>void;
}
const Navbar:React.FC<Iprops> = ({openCreateForm}) => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style= {{marginRight:'10px'}}></img>
          </Menu.Item>
          <Menu.Item name="Activities"></Menu.Item>
          <Menu.Item name="friends">
            <Button  onClick={openCreateForm}positive content="Create Activities" />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default Navbar;
