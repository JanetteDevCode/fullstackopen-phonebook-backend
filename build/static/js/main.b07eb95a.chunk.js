(this["webpackJsonpphonebook-frontend"]=this["webpackJsonpphonebook-frontend"]||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r),a=t(13),c=t.n(a),l=t(14),s=t(2),u=function(e){return o.a.createElement("form",{onSubmit:e.handleAddPerson},o.a.createElement("div",null,"name: ",o.a.createElement("input",{placeholder:"Jane Doe",value:e.newName,onChange:e.changeName})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{placeholder:"555-867-5309",value:e.newPhone,onChange:e.changePhone})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},i=function(e){var n=e.person,t=e.handleDeletePerson;return o.a.createElement("div",null,n.name," ",n.phone," ",o.a.createElement("button",{onClick:t(n)},"delete"))},d=function(e){var n=e.filter,t=e.persons,r=e.handleDeletePerson;return o.a.createElement("div",null,function(){var e,a=n.trim();return(a?(e=a,t.filter((function(n){return n.name.toLowerCase().includes(e.toLowerCase())}))):t).map((function(e){return o.a.createElement(i,{key:e.name,person:e,handleDeletePerson:r})}))}())},f=function(e){var n=e.filter,t=e.changeFilter;return o.a.createElement("div",null,"filter shown with ",o.a.createElement("input",{value:n,onChange:t}))},p=Object.freeze({SUCCESS:Symbol("success"),INFO:Symbol("info"),ERROR:Symbol("error")}),m=function(e){var n=e.notification;if(null===n)return null;var t={fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:15};return n.type===p.SUCCESS?(t.color="green",t.background="lightgreen"):n.type===p.ERROR?(t.color="crimson",t.background="pink"):n.type===p.INFO&&(t.color="gold",t.background="lightyellow"),o.a.createElement("div",{style:t},n.message)},h=t(3),g=t.n(h),b="/api/persons",v=function(){return g.a.get(b).then((function(e){return console.log("get all persons successful"),console.log("response data",e.data),e.data})).catch((function(e){return console.log("err response:",e.response),Promise.reject(e.response)}))},O=function(e){return g.a.post(b,e).then((function(e){return console.log("create person successful"),console.log("response data",e.data),e.data})).catch((function(e){return console.log("err response:",e.response),Promise.reject(e.response)}))},E=function(e){return g.a.put("".concat(b,"/").concat(e.id),e).then((function(e){return console.log("update person successful"),console.log("response data",e.data),e.data})).catch((function(e){return console.log("err response:",e.response),Promise.reject(e.response)}))},w=function(e){return g.a.delete("".concat(b,"/").concat(e.id)).then((function(e){return console.log("delete person successful"),console.log("response data",e.data),e.data})).catch((function(e){return console.log("err response:",e.response),Promise.reject(e.response)}))};function y(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function R(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?y(t,!0).forEach((function(n){Object(l.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):y(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var S=function(){var e=Object(r.useState)([]),n=Object(s.a)(e,2),t=n[0],a=n[1],c=Object(r.useState)(""),l=Object(s.a)(c,2),i=l[0],h=l[1],g=Object(r.useState)(""),b=Object(s.a)(g,2),y=b[0],S=b[1],j=Object(r.useState)(""),P=Object(s.a)(j,2),C=P[0],k=P[1],N=Object(r.useState)(null),D=Object(s.a)(N,2),F=D[0],I=D[1],U=Object(r.useState)(null),L=Object(s.a)(U,2),x=L[0],J=L[1];Object(r.useEffect)((function(){A()}),[]);var z=function(e,n){I({type:e,message:n}),clearTimeout(x),J(setTimeout((function(){I(null)}),5e3))},A=function(){v().then((function(e){a(e)})).catch((function(e){console.log("get all persons error:",e),z(p.ERROR,"Could not get persons from the server.")}))};return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(m,{notification:F}),o.a.createElement(f,{filter:C,changeFilter:function(e){k(e.target.value)}}),o.a.createElement("h3",null,"add new contact"),o.a.createElement(u,{handleAddPerson:function(e){e.preventDefault();var n=i.trim(),r=y.trim(),o=function(e){return t.find((function(n){return n.name.toLowerCase()===e.toLowerCase()}))}(n);if(n)if(r){if(o&&r===o.phone)return z(p.ERROR,"".concat(n," is already in the phonebook.")),void h("");var c,l;if(o)if(window.confirm("".concat(o.name," already exists. Replace phone number?"))){var s=R({},o,{phone:r});E(l=s).then((function(e){a(t.map((function(n){return l.id!==n.id?n:e}))),z(p.SUCCESS,"".concat(e.name," was successfully updated on the server."))})).catch((function(e){console.log("update person error:",e);var n="";404===e.status?(a(t.filter((function(e){return l.id!==e.id}))),n+="".concat(l.name," could not be updated since the person does not exist on the server.")):(n+="".concat(l.name," could not be updated."),e.data.error&&(n+=" ".concat(e.data.error))),z(p.ERROR,n)}))}else z(p.INFO,"No update was made.");else O(c={name:n,phone:r}).then((function(e){a(t.concat(e)),z(p.SUCCESS,"".concat(e.name," was successfully added to the server."))})).catch((function(e){console.log("add person error:",e);var n="".concat(c.name," could not be added to the server.");e.data.error&&(n+=" ".concat(e.data.error)),z(p.ERROR,n)}));h(""),S("")}else z(p.ERROR,"No phone number was given.");else z(p.ERROR,"No name was given.")},newName:i,changeName:function(e){h(e.target.value)},newPhone:y,changePhone:function(e){S(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(d,{filter:C,persons:t,handleDeletePerson:function(e){return function(){var n;if(window.confirm("Delete ".concat(e.name,"?"))){var r=R({},e);w(n=r).then((function(e){a(t.filter((function(e){return n.id!==e.id}))),z(p.SUCCESS,"".concat(n.name," was successfully deleted from the server."))})).catch((function(e){console.log("delete person error:",e);var r="";404===e.status?(a(t.filter((function(e){return n.id!==e.id}))),r+="".concat(n.name," was already deleted from the server.")):(r+="".concat(n.name," could not be deleted."),e.data.error&&(r+=" ".concat(e.data.error))),z(p.ERROR,r)}))}else z(p.INFO,"No person was deleted.")}}}))};c.a.render(o.a.createElement(S,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.b07eb95a.chunk.js.map