import './index.scss';
// 引入react依赖
import React 	from 'react';
import {render} from 'react-dom';
import {Link} 	from 'react-router';
import PubSub   from 'pubsub-js';


class MusicItem extends React.Component{
	constructor(props){
		super(props)

	}
	componentDidMount(){

	}
	playThisItem(musicItem){
		PubSub.publish('PALT_THIS',musicItem)
	}
	render(){
		let musicItem=this.props.musicItem;
		return(
			<li className="component-music-item" onClick={this.playThisItem.bind(this,musicItem)}>
				<p className="item"><Link to='play' style={this.props.isCurrent?{color:'#c80002'}:{}}><strong>{this.props.musicItem.title}</strong>-{this.props.musicItem.artist}</Link><span className="delete"></span></p>
			</li>
		)
	}
}
export default MusicItem