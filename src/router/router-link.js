import loadView from './async-view-loader'

const routes = [
	{
		path: '/',
		name: 'index',
		component:  loadView(loaded => {
			require(['../modules/index/index.vue'], loaded)
		})
	}
]

export default routes