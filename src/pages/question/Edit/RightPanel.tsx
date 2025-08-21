import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import React, { FC, useEffect, useState } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import ComponentProp from './ComponentProp';
import PageSetting from './PageSetting';

enum TAB_KEYS {
  PROP = 'prop',
  SETTING = 'setting',
}
const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP);
  const { selectedId } = useGetComponentInfo();

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP);
    } else {
      setActiveKey(TAB_KEYS.SETTING);
    }
  }, [selectedId]);

  const tabsItems = [
    {
      key: TAB_KEYS.PROP,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];
  return <Tabs activeKey={activeKey} items={tabsItems} />;
};

export default RightPanel;
