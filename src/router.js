import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		component: () => import(/* webpackChunkName: "Home" */ "./components/TerrysSchedule.vue"),
		meta: {
			title: "Terry's Schedule",
			metaTags: [
				{
					name: 'description',
					content: 'Warframe players organizing for Eidolon hunt missions',
				},
				{
					name: 'og:description',
					content: 'Warframe players organizing for Eidolon hunt missions',
				},
			],
		},
	},

	{
		path: '/information',
		name: 'information',
		component: () => import(/* webpackChunkName: "Information" */ "./components/Information.vue"),
	},
	{
		path: '*',
		name: '404',
		component: () => import(/* webpackChunkName: "Information" */ "./components/404.vue"),
	},
],
});



