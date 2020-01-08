import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as={NavLink} exact to="/">
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "10px" }}
            ></img>
          </Menu.Item>
          <Menu.Item
            name="Activities"
            as={NavLink}
            to="/activities"
          ></Menu.Item>
          <Menu.Item name="friends" >
            <Button
              as={NavLink}
              to="/createActivity"
              positive
              content="Create Activities"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default observer(Navbar);
