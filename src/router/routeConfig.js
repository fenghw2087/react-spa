import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const MyLoadingComponent=()=>{
    return <Spin />
};
const Page1 = Loadable({
    loader: () => import('../page/page1/page1'),
    loading: MyLoadingComponent
});
const Page2 = Loadable({
    loader: () => import('../page/page2/page2'),
    loading: MyLoadingComponent
});
const Page3 = Loadable({
    loader: () => import('../page/page3/page3'),
    loading: MyLoadingComponent
});

export const Page403 = Loadable({
    loader: () => import('../page/page403/page403'),
    loading: MyLoadingComponent
});

const routeConfig = [
    {
        path:'/index',
        component:Page1,
        name:'页面1'
    },
    {
        path:'/page2',
        component:Page2,
        name:'页面2'
    },
    {
        path:'/page3',
        component:Page3,
        name:'页面3',
        deny:true
    }
];

export default routeConfig;