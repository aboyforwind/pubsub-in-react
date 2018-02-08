// 引入样式
import './index.scss';
// 引入react依赖
import React 	from 'react';
import {render} from 'react-dom';
import {Link} 	from 'react-router';
import PubSub 	from 'pubsub-js';
//引入页面依赖
import MusicItem from '../../component/music-item/index.jsx';
class List extends React.Component{
	constructor(props){
		super(props)
		this.state={
		}
	}
	componentDidMount(){
	}
	render(){
		let musicListHtml=this.props.musicList.map((item,index)=>{
			return(
				<MusicItem key={index} musicItem={item} isCurrent={item===this.props.currentItem}/>
				)
		})
		return(
			<div className="page-musicList">
				<h2 className="to-play"><Link to='play'>{"<  返回正在播放的歌曲"}</Link></h2>
				<ul className="music-list">
					{musicListHtml}
				</ul>
			</div>
		)
	}
}
export default List
