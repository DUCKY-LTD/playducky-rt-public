import React from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import styles from './TabsPanel.module.css';
import TransitionsModal from "../TransitionsModal/TransitionsModal";

const Tab = styled(TabUnstyled)`
  font-family: Raleway, sans-serif;
  color: #46008C;
  cursor: pointer;  
  font-size: 18px;
  font-weight: 800;
  line-height: 1.3;
  background-color: #ffffff;
  width: 127px;
  padding: 10px;
  margin-right: 15px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

   &:hover {
     background-color: #3E1286;
     color: #ffffff;
   }
  
  &.${tabUnstyledClasses.selected} {
    background-color: #46008C;
    color: #ffffff;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  border-radius: 8px; 
  margin-bottom: 10px;
  display: flex;
  align-content: space-between;
`;

const Container = ({children}) => <div className={styles.container}>{children}</div>;

 function TabsPanel({ltv, experimentList, gameName, handleCtrTest, handleCpiTest}) {

     return (
        <TabsUnstyled defaultValue={0}>
            <TabsList>
                <Tab>Experiments</Tab>
                {/*<Tab>App Info</Tab>*/}
                {/*<Tab>Releases</Tab>*/}
                {/*<Tab>Competitors</Tab>*/}
                <Tab>Analytics</Tab>
            </TabsList>
            <TabPanel value={0}>
                <Container>
                        <div className={styles.button_div}>
                            <TransitionsModal btnName={'Create new test'} btnBgColor={'#46008c'}
                                              modalWidth={530} gameName={gameName} type={'newExperiment'}
                                              btnSize={'large'} handleCpiTest={handleCpiTest} handleCtrTest={handleCtrTest}
                            />
                        </div>
                    {experimentList}
                </Container>
            </TabPanel>
            {/*<TabPanel value={1}><Container/></TabPanel>*/}
            {/*<TabPanel value={2}><Container/></TabPanel>*/}
            {/*<TabPanel value={3}><Container/></TabPanel>*/}
            <TabPanel value={1}>
                <TabsUnstyled defaultValue={0}>
                    <TabsList>
                        {/*<Tab>Activity</Tab>*/}
                        <Tab>Cohort</Tab>
                        {/*<Tab>Funnels</Tab>*/}
                    </TabsList>
                    {/*<TabPanel value={0}><Container/></TabPanel>*/}
                    <TabPanel value={0}>
                        <Container>{ltv}</Container>
                    </TabPanel>
                    {/*<TabPanel value={2}><Container/></TabPanel>*/}
                </TabsUnstyled>
            </TabPanel>
        </TabsUnstyled>
    );
}

export default TabsPanel;
