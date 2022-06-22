import React from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import StaffCard from "../StaffCard/StaffCard";


const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #46008C;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #ffffff;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

   //&:hover {
   //  background-color: #46008C;
   //}

  // &:focus {
  //   color: #fff;
  //   border-radius: 3px;
  //   outline: 2px solid red;
  //   outline-offset: 2px;
  //   background-color: #46008C;
  // }

  &.${tabUnstyledClasses.selected} {
    background-color: #46008C;
    color: #ffffff;
  }

  // &.${buttonUnstyledClasses.disabled} {
  //   opacity: 0.5;
  //   cursor: not-allowed;
  // }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: aquamarine;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

 function TabsPanel({children}) {
    return (
        <TabsUnstyled defaultValue={0}>
            <TabsList>
                <Tab>Experiments
                </Tab>
                <Tab>App Info</Tab>
                <Tab>Releases</Tab>
                <Tab>Competitors</Tab>
                <Tab>Analytics</Tab>
            </TabsList>
            <TabPanel value={0}>
                <StaffCard name={'Alex'} title={'Developer'}/>
            </TabPanel>
            <TabPanel value={1}>Second page</TabPanel>
            <TabPanel value={2}>Third page</TabPanel>
            <TabPanel value={3}>4th page</TabPanel>
            <TabPanel value={4}>
                <TabsUnstyled defaultValue={0}>
                    <TabsList>
                        <Tab>Activity</Tab>
                        <Tab>Cohort</Tab>
                        <Tab>Funnels</Tab>
                    </TabsList>
                    <TabPanel value={0}>First page</TabPanel>
                    <TabPanel value={1}>{children}</TabPanel>
                    <TabPanel value={2}>Third page</TabPanel>
                </TabsUnstyled>
            </TabPanel>
        </TabsUnstyled>
    );
}

export default TabsPanel;
