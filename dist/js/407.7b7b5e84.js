"use strict";(self["webpackChunkapi_demo"]=self["webpackChunkapi_demo"]||[]).push([[407],{6407:function(a,t,e){e.r(t),e.d(t,{default:function(){return C}});var s=e(6768);const n={class:"container-fluid"};function o(a,t,e,o,r,l){const c=(0,s.g2)("Navbar"),i=(0,s.g2)("router-view");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.bF)(c),(0,s.Lk)("div",n,[(0,s.bF)(i)])],64)}e(4114);var r=e(5130);const l={class:"navbar navbar-expand-lg bg-body-tertiary"},c={class:"container-fluid"},i=(0,s.Lk)("a",{class:"navbar-brand",href:"#"},"Navbar w/ text",-1),u=(0,s.Lk)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,s.Lk)("span",{class:"navbar-toggler-icon"})],-1),v={class:"collapse navbar-collapse",id:"navbarText"},h={class:"navbar-nav me-auto mb-2 mb-lg-0"},b=(0,s.Lk)("li",{class:"nav-item"},[(0,s.Lk)("a",{class:"nav-link active","aria-current":"page",href:"#"},"Home")],-1),p=(0,s.Lk)("li",{class:"nav-item"},[(0,s.Lk)("a",{class:"nav-link",href:"#"},"Features")],-1),d={class:"nav-item"},k=(0,s.Lk)("span",{class:"navbar-text"}," Navbar text with an inline element ",-1);function g(a,t,e,n,o,g){return(0,s.uX)(),(0,s.CE)("nav",l,[(0,s.Lk)("div",c,[i,u,(0,s.Lk)("div",v,[(0,s.Lk)("ul",h,[b,p,(0,s.Lk)("li",d,[(0,s.Lk)("a",{class:"nav-link",href:"#",onClick:t[0]||(t[0]=(0,r.D$)(((...a)=>g.logout&&g.logout(...a)),["prevent"]))},"登出")])]),k])])])}var f={methods:{logout(){const a="https://vue3-course-api.hexschool.io/logout";console.log(a),this.$http.post(a,this.user).then((a=>{a.data.success&&this.$router.push("/login")}))}}},m=e(1241);const L=(0,m.A)(f,[["render",g]]);var x=L,$={components:{Navbar:x},created(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=a;const t="https://vue3-course-api.hexschool.io/api/user/check";this.$http.post(t,this.user).then((a=>{a.data.success||this.$router.push("/login")}))}};const w=(0,m.A)($,[["render",o]]);var C=w}}]);
//# sourceMappingURL=407.7b7b5e84.js.map