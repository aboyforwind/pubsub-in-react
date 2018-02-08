//引入样式文件
import './index.scss';
//引入react
import React 	from 'react';
import {render} from 'react-dom';
import Header 	from './component/header/index.jsx';
//引入音乐数据
import MusicList from './page/music-list/music-list.jsx';

import PubSub 	from 'pubsub-js';

let audio=document.getElementById('play-audio');

class Root extends React.Component{
	constructor(props){
		super(props)
		this.state={
			method:'list',			
			videoApp:audio,
			musicList:MusicList,
			currentItem:MusicList[0],
			currentTime:0
		}
	}
	componentWillUpdate(){
		
	}	
	componentDidMount(){

		this.playMusic(this.state.currentItem);
		this.pubsubEvent();
	}
	playMusic(musicItem){

		if(!(audio.src===musicItem.file)){
            audio.src=musicItem.file;
			!audio.paused?null:audio.play();
		}

	}
	playNext(prevnext){
		let musicItem,
			musicList=this.state.musicList,
			length=musicList.length;
		if(prevnext==='next'){
			let i=(musicList.indexOf(this.state.currentItem)+1)%length;
			musicItem=musicList[i];
		}
		else if(prevnext==='prev'){
			let i=(musicList.indexOf(this.state.currentItem)-1+length)%length;
			musicItem=musicList[i];
		}
		else if(prevnext==='random'){
			let i=musicList.indexOf(this.state.currentItem),
				i2=Math.floor(Math.random()*length);
			i2 = i===i2?(i+1)%length:i2;
			musicItem=musicList[i2];
		}
		this.setState({
			currentItem:musicItem
		})
		this.playMusic(musicItem||this.state.musicItem);
	}
	pubsubEvent(){
		PubSub.subscribe('PALT_THIS',(msg,musicItem)=>{
			this.setState({
				currentItem:musicItem
			})
			this.playMusic(musicItem||this.state.musicItem);
		})
		PubSub.subscribe('PLAY_CONTROL',(msg,index)=>{
			this.playNext(index)
		})
		PubSub.subscribe('MUSIC_END',(msg)=>{
			switch(this.state.method){
				case 'list':
					this.playNext('next');
					break;
				case 'random':
					this.playNext('random');
					break;
				case 'single' :
					break;
			}
		})
		PubSub.subscribe('CHANGE_PLAYMODE',(msg)=>{
			let methods=['list','single','random'],
				i=((methods.indexOf(this.state.method)||0)+1)%(methods.length);
			methods[i]==='single'?this.state.videoApp.setAttribute('loop','true'):this.state.videoApp.removeAttribute('loop');
			this.setState({
				method:methods[i]
			})
		})
	}
	render(){
		return(
			<div className="wrap">
				<Header />
				{React.cloneElement(this.props.children,this.state)}
			</div>
		)
	}
}
export default Root