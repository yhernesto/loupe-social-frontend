import { createWebHistory , createRouter, RouteLocationNormalized, NavigationGuardNext } from "vue-router";

import appController from '@/Controller';


import Login from '@/views/login/Login.vue'
import Dashboard from "@/views/dashboard/Dashboard.vue";

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Trends = () => import("@/views/trends/Trends.vue"); // Dynamic import for the less used for not overweight the first loading
const Feeds = () => import("@/views/feeds/Feeds.vue"); // Dynamic import for the less used for not overweight the first loading
const Alerts = () => import("@/views/alerts/Alerts.vue"); // Dynamic import for the less used for not overweight the first loading
const MyBrand = () => import("@/views/myBrand/MyBrand.vue"); // Dynamic import for the less used for not overweight the first loading
const Influencers = () => import("@/views/influencers/Influencers.vue"); // Dynamic import for the less used for not
const Settings = () => import("@/views/settings/Settings.vue"); // Dynamic import for the less used for not


const NotFound = () => import("@/views/notFound/NotFound.vue")


const history = createWebHistory();

const routes = [
	// Public Paths
	{
		path: "/login",
		name: "Login",
		component: Login,
		meta: {
			icon: 'input',//"login",
			public: true,  // Allow access to even if not logged in
			onlyWhenLoggedOut: true
		}
	},
	{
		path: "/contact",
		name: "Contact",
		component: Login,
		meta: {
			public: true,  // Allow access to even if not logged in
			onlyWhenLoggedOut: true
		}
	},

	// Private paths
	{
		path: "/",
		name: 'route-dashboard',
		component: Dashboard,
		meta: {
			icon: "dashboard",
		}
	},
	{
		path: "/trends",
		name: 'route-trends',
		component: Trends,
		meta: {
			icon: "whatshot",
		}
	},
	{
		path: "/feeds",
		name: 'route-feeds',
		component: Feeds,
		meta: {
			icon: "travel_explore",
		}
	},
	{
		path: "/brand",
		name: 'route-my-brand',
		component: MyBrand,
		meta: {
			icon: "storefront",
		}
	},
	// {
	// 	path: "/alerts",
	// 	name: "Alerts",
	// 	component: Alerts,
	// 	meta: {
	// 		icon: "people",
	// 	}
	// },
	{
		path: "/influencers",
		name: "route-influencers",
		component: Influencers,
		meta: {
			icon: "connect_without_contact",
		}
	},
	{
		path: "/settings",
		name: 'route-settings',
		component: Settings,
		meta: {
			icon: "settings",
		}
	},

	// CatchAll 404
	{
		path: '/:catchAll(.*)',
		name: "NotFound",
		component: NotFound,
		meta: {
			hidden: true
		}
	}
]

const router = createRouter({
	history,
	routes,
});

// https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
	// if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
	// else next();


	const isPublic = to.matched.some(record => record.meta.public)
	const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)

	if (!isPublic && !appController.user.getIsAuthenticated()) {
		return next({
			path:'/login',
			query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
		});
	}
  
	// Do not allow user to visit login page or register page if they are logged in
	if (appController.user.getIsAuthenticated() && onlyWhenLoggedOut) {
		return next('/')
	}
	else next();

})

export default router;