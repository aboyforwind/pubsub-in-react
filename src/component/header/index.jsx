import './index.scss';
import React from 'react';
import {render} from 'react-dom';
class Header extends React.Component{

	constructor(props){
		super(props)
		this.state={
		}
	}
	componentDidMount(){
	}
	render(){
		return(
			<div className="component-header">
				<img src="../../static/images/logo.png" alt="logo" className='logo'/>
				<h1 className="title">React Music</h1>
			</div>
		)
	}
}
export default Header;