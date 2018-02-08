import './index.scss';
import React from 'react';
import {render} from 'react-dom';
class Progress extends React.Component{

	constructor(props){
		super(props)
		this.state={
			name:'sdfdsf'
		}
	}
	componentDidMount(){
	}
	changeProgress(e){
		let divPro=this.refs.progress,
			x=e.clientX,
			progressLeft=divPro.getBoundingClientRect().left,
			progress=(x-progressLeft)/divPro.clientWidth*100;
		this.props.changeProgressHandle(progress);
	}
	render(){
		return(
			<div className="component-progress" onClick={this.changeProgress.bind(this)} ref='progress'>
				<div className="progress"></div>
				<div className="progress-bar" style={{width:`${this.props.progress}%`,background:this.props.barColor}} ></div>
			</div>
		)
	}
}
Progress.defaultProps = {
	barColor:'#ff0000'
}
export default Progress;