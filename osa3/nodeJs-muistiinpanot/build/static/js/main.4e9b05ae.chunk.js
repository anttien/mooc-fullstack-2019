(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,n){t.exports=n(39)},38:function(t,e,n){},39:function(t,e,n){"use strict";n.r(e);var a=n(13),r=n.n(a),o=n(0),c=n.n(o),u=n(14),i=n(2),l=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return c.a.createElement("li",{className:"note"},e.content,c.a.createElement("button",{onClick:n},a))},m=n(3),f=n.n(m),s=function(){return f.a.get("/api/notes").then(function(t){return t.data})},p=function(t){return f.a.post("/api/notes",t).then(function(t){return t.data})},d=function(t,e){return f.a.put("".concat("/api/notes","/").concat(t),e).then(function(t){return t.data})},b=function(){var t=Object(o.useState)([]),e=Object(i.a)(t,2),n=e[0],a=e[1],r=Object(o.useState)(""),m=Object(i.a)(r,2),f=m[0],b=m[1],v=Object(o.useState)(!0),E=Object(i.a)(v,2),g=E[0],h=E[1],O=Object(o.useState)(),j=Object(i.a)(O,2),w=j[0],k=j[1];Object(o.useEffect)(function(){s().then(function(t){a(t)})},[]);var S=g?n:n.filter(function(t){return t.important});return c.a.createElement("div",null,c.a.createElement("h1",null,"Notes"),c.a.createElement(function(t){var e=t.message;return null===e?null:c.a.createElement("div",{className:"error"},e)},{message:w}),c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){return h(!g)}},"show ",g?"important":"all")),c.a.createElement("ul",null,S.map(function(t){return c.a.createElement(l,{key:t.id,note:t,toggleImportance:function(){return function(t){var e=n.find(function(e){return e.id===t}),r=Object(u.a)({},e,{important:!e.important});d(t,r).then(function(e){a(n.map(function(n){return n.id!==t?n:e}))}).catch(function(r){k("Note '".concat(e.content,"' was already removed from server")),setTimeout(function(){k(null)},5e3),a(n.filter(function(e){return e.id!==t}))})}(t.id)}})})),c.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random()>.5};p(e).then(function(t){a(n.concat(t)),b("")})}},c.a.createElement("input",{value:f,onChange:function(t){console.log(t.target.value),b(t.target.value)}}),c.a.createElement("button",{type:"submit"},"save")))};n(38);r.a.render(c.a.createElement(b,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.4e9b05ae.chunk.js.map