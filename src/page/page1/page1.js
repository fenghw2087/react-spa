import React from 'react';
import { Button,Icon } from 'antd';
import { Link } from 'react-router-dom';

const jump=(history)=>{
    history.push('/page2',{id:1})
};

const Page1 =({ history,location, match })=>{
    console.log(history,location,match);
    return <div>
        <Button onClick={ ()=>jump(history) }>1111111</Button><Icon type="step-forward" theme="outlined" />
        <Link to="/page2">text</Link>
    </div>
};

export default Page1;