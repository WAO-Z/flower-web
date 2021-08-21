import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),

    meta: {
      title: "登录页"
    }
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: () => import('../views/Appointment.vue'),
    meta: {
      title: "预约页"
    },
  },
  {
    path: '/myappointment',
    name: 'MyAppointment',
    component: () => import('../views/MyAppointment.vue'),
    meta: {
      title: "查看预约页"
    },
  },
  {
    path: '/qrcode',
    name: 'QRCode',
    component: () => import('../views/QRCode.vue'),
    meta: {
      title: "成功预约页"
    },
  },



]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (to.path === '/') {
    next()
    document.title = "登录页"
  } else {
    if (token === null || token === '') {

      next('/');

    } else {
      document.title = to.meta.title
      next();

    }
  }

})

export default router
