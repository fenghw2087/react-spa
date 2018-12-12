import React from 'react';
import { Icon, Badge } from 'antd';

import style from './less/commonHeader.less';

export default class CommonHeader extends React.Component{
    constructor(props) {
        super(props);

    }

    state={
        count:5
    };

    componentDidMount(){

    }

    render(){
        return <div className={ style.outer }>
            <Bell count={ this.state.count } />
        </div>
    }

}

function Bell({ count }) {
    return <Badge className={ style.badge } count={count}>
        <span className={ style.bell_outer +' '+ ( count>0?style.active:'' ) }>
            <Icon className={ style.bell } type="bell" />
        </span>
    </Badge>
}