// 引入样式
import './index.scss';
// 引入react依赖
import React 	from 'react';
import {render} from 'react-dom';
import {Link} 	from 'react-router';
//引入页面依赖
import Progress from '../../component/progress/index.jsx';
//引入pubsub 事件订阅发布
import PubSub 	from 'pubsub-js';
let palyInterVal=0,endInterval=0;
class Play extends React.Component{
	constructor(props){
		super(props)
		let audio=this.props.videoApp;
		this.state={
			videoApp:audio,
			progressPlay:audio.currentTime/audio.duration*100||0,
			progressVolume:audio.volume*100||100,
			currentTime:audio.currentTime,
			duration:audio.duration,
			isPause:true,
		}
	}
	componentWillMount() {
		let _this=this,
			audio=this.props.videoApp;
		this.state.videoApp.oncanplay=function () {
			_this.setState({
				progressPlay:audio.currentTime/audio.duration*100,
				progressVolume:audio.volume*100,
				currentTime:audio.currentTime,
				duration:audio.duration,
				isPause:true,
			})
		}
	}
	componentDidMount(){
		this.listenTime();
		this.listenEnd();
	}
	componentWillUnmount(){
		this.cancelLisitenTime();
	}
	listenTime(){
		let _this=this;
		palyInterVal=setInterval(()=> {
			_this.setState({
				currentTime:_this.state.videoApp.currentTime,
				progressPlay:_this.state.currentTime/_this.state.duration*100,
			})

		},1000)

	}
	listenEnd(){
		endInterval=setInterval(()=>{
			if(this.state.videoApp.ended){
				PubSub.publish('MUSIC_END');
				return ;
			}
		},1000)
	}
	cancelLisitenTime(){
		clearInterval(palyInterVal);
	}
	cancelLisitenEnd(){
		clearInterval(endInterval);		
	}
	changeProgressHandlePlay(progress){
		this.state.videoApp.currentTime=progress/100*this.state.duration;
		this.setState({
			progressPlay:progress,
			currentTime:this.state.videoApp.currentTime
		})
	}
	changeProgressHandleVolume(progress){
		this.state.videoApp.volume=progress/100;
		this.setState({
			progressVolume:progress
		})

	}
	playPause(){
		!this.state.isPause?this.state.videoApp.play()&this.listenTime()&this.listenEnd():this.state.videoApp.pause()&this.cancelLisitenTime()&this.cancelLisitenEnd();
		this.setState({
			isPause:!this.state.isPause
		})
	}
	formatTime(time){
		let mm=Math.floor(time/60),
			ss=time%60;
		mm=mm>9?mm:'0'+mm;
		ss=ss>9?ss:'0'+ss
		return mm+':'+ss;
	}
	playMusic(index){
		PubSub.publish('PLAY_CONTROL',index)
	}
	changePlayMode(){
		PubSub.publish('CHANGE_PLAYMODE')
	}
	setMethodBg(){
		switch(this.props.method){
			case 'list':
			return {backgroundPosition:'0 -100px'};break;
			case 'single' :
			return {backgroundPosition:'0 -80px'};break;
			case 'random' :
			return {backgroundPosition:'0 -120px'};break;
		}
	}
	render(){
		return(
			<div className="page-play">
				<div className="music-list"><Link to={'/music-list'}>我的歌曲></Link></div>
				<div className="play-wrap">
					<div className="play-right">
						<div className="music-pic">
							<img src={this.props.currentItem.cover} alt={this.props.currentItem.title}/>
						</div>
					</div>
					<div className="play-left">
						<h1 className="music-name">{this.props.currentItem.title}</h1>
						<h2 className="author">{this.props.currentItem.artist}</h2>
						<div className="progress">
							<span className="play-time">{this.formatTime(Math.floor(this.state.currentTime))}</span>
							<div className="volume">
								<Progress progress={this.state.progressVolume} barColor='#c80002' changeProgressHandle={this.changeProgressHandleVolume.bind(this)}/>
							</div>
							<div className="play">
								<Progress progress={this.state.progressPlay} barColor='#01973a' changeProgressHandle={this.changeProgressHandlePlay.bind(this)}/>
							</div>
						</div>
						<div className="control">
							<a className="prev control-btn" onClick={this.playMusic.bind(this,'prev')}></a>
							<a className="pause-play control-btn" onClick={this.playPause.bind(this)} style={this.state.isPause ? {backgroundPosition:'0 -60px'}:{backgroundPosition:'0 -40px'}}></a>
							<a className="next control-btn" onClick={this.playMusic.bind(this,'next')}></a>
							<a className="play-mode control-btn" onClick={this.changePlayMode} style={
								this.setMethodBg()
							}></a>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
export default Play
