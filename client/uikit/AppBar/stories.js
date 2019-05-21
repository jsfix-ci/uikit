import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AppBar, { Logo, MenuGroup, MenuItem, Section } from ".";

const AppBarStories = storiesOf(`${__dirname}`, module).add("Basic", () => {
  const LinkToExploration = props => (
    <div {...props} onClick={() => action("navigate")("/exploration")} />
  );
  const LinkToAnalysis = props => (
    <div {...props} onClick={() => action("navigate")("/analysis")} />
  );
  const LinkToFileRepo = props => (
    <div {...props} onClick={() => action("navigate")("/file_repo")} />
  );
  return (
    <AppBar>
      <Section>
        <Logo />
        <MenuGroup>
          <MenuItem DomComponent={LinkToExploration}>Exploration</MenuItem>
          <MenuItem DomComponent={LinkToAnalysis}>Analysis</MenuItem>
          <MenuItem DomComponent={LinkToFileRepo} active>
            File Repository
          </MenuItem>
        </MenuGroup>
      </Section>
      <Section />
      <Section>
        <MenuGroup>
          <MenuItem DomComponent={LinkToExploration}>Exploration</MenuItem>
          <MenuItem DomComponent={LinkToFileRepo} active>
            File Repository
          </MenuItem>
        </MenuGroup>
      </Section>
    </AppBar>
  );
});

export default AppBarStories;
