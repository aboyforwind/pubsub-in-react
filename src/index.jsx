// 引入样式
// 引入react依赖
import React 	from 'react';
import {render} from 'react-dom';
import {Link,Router,Route,IndexRedirect,hashHistory} 	from 'react-router';

import Root    		from './root.jsx';
import Play 		from './page/play/index.jsx';
import MusicList 	from './page/music-list/index.jsx';
render(
	<Router history={hashHistory}>
		<Route path='/' component = {Root} >
			<IndexRedirect to='play'></IndexRedirect>
			<Route path="play" component = {Play}  />
			<Route path="music-list" component = {MusicList}  />
		</Route>
	</Router>,
	document.getElementById('app')
)
