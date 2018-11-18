!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t){e.exports=React},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var a,i=n(0),o=n(8),s=n(12);function l(e){switch(e){case a.regular:return"Regular (87)";case a.mid:return"Mid-Grade (89)";case a.premium:return"Premium (92)";case a.diesel:return"Diesel"}}!function(e){e[e.regular=0]="regular",e[e.mid=1]="mid",e[e.premium=2]="premium",e[e.diesel=3]="diesel"}(a=t.FuelType||(t.FuelType={})),t.fuelString=l;var c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.render=function(){return i.createElement("div",{className:"form-group row"},i.createElement("label",{htmlFor:this.props.id.toString(),className:"col-sm col-form-label"},l(this.props.id)),i.createElement("div",{className:"col-sm-8"},i.createElement("input",{className:"form-control",name:l(this.props.id),type:"number",step:"0.01",min:"0",id:this.props.id.toString(),onChange:this.props.onChange,value:this.props.fuelPrice})))},t}(i.Component),u=function(e){function t(t){var n=e.call(this,t)||this;return n.onChange=n.onChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n.state={updateable:!1,ppg:t.ppg,temp_ppg:new Map([[a.regular,t.ppg.get(0).toString()],[a.mid,t.ppg.get(1).toString()],[a.premium,t.ppg.get(2).toString()],[a.diesel,t.ppg.get(3).toString()]])},n}return r(t,e),t.prototype.onChange=function(e){var t=this.state.temp_ppg,n=parseInt(e.target.id);t.set(n,e.target.value),this.setState({updateable:!0,temp_ppg:t})},t.prototype.handleSubmit=function(e){var t=new Map([[a.regular,parseFloat(this.state.temp_ppg.get(a.regular))],[a.mid,parseFloat(this.state.temp_ppg.get(a.mid))],[a.premium,parseFloat(this.state.temp_ppg.get(a.premium))],[a.diesel,parseFloat(this.state.temp_ppg.get(a.diesel))]]);this.props.updateGasPrice(t),e.preventDefault(),this.setState({updateable:!1})},t.prototype.render=function(){var e;e=this.state.updateable?i.createElement("button",{type:"submit",className:"btn btn-primary"},"Update"):i.createElement("button",{className:"btn btn-primary disabled",disabled:!0},"Update");var t=i.createElement("div",null,"Price of Gas ",i.createElement(o.InfoBox,{title:"Good to Know: Fuel"},i.createElement("p",null,'While there may be benefits to using mid-grade (sometimes labelled "Plus") or premium fuel, most consumer vehicles in the US will run just fine on regular unleaded. Generally speaking, it is best to follow the recommendations in your owner\'s manual.')));return i.createElement(s.MinimizableCard,{header:t},i.createElement("form",{onSubmit:this.handleSubmit},i.createElement(c,{id:a.regular,fuelPrice:this.state.temp_ppg.get(a.regular),onChange:this.onChange}),i.createElement(c,{id:a.mid,fuelPrice:this.state.temp_ppg.get(a.mid),onChange:this.onChange}),i.createElement(c,{id:a.premium,fuelPrice:this.state.temp_ppg.get(a.premium),onChange:this.onChange}),i.createElement(c,{id:a.diesel,fuelPrice:this.state.temp_ppg.get(a.diesel),onChange:this.onChange}),e))},t}(i.Component);t.GasPriceChanger=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.range=function(e,t){for(var n=[],r=e;r<t;r++)n.push(r);return n},t.money=function(e){return"$"+e.toFixed(2)}},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=function(e){function t(t){var n=e.call(this,t)||this;return n.state={visible:n.props.visible},n.closeModal=n.closeModal.bind(n),n.handleClick=n.handleClick.bind(n),n}return r(t,e),t.prototype.componentDidUpdate=function(e){e.visible!=this.props.visible&&this.setState({visible:this.props.visible})},t.prototype.handleClick=function(e){this.state.visible?this.setState({visible:!1}):this.setState({visible:!0})},t.prototype.closeModal=function(e){this.setState({visible:!1})},t.prototype.render=function(){var e,t,n={};return this.state.visible&&(n={display:"block"}),null!==this.props.triggerText&&(e=a.createElement("button",{className:"btn btn-primary",onClick:this.handleClick},this.props.triggerText)),this.props.submit&&(t=a.createElement("button",{type:"submit",className:"btn btn-primary",form:this.props.submit.formName},this.props.submit.buttonName)),a.createElement("div",{style:{display:"inline"}},a.createElement("div",{className:"modal",style:n,tabIndex:-1,role:"dialog"},a.createElement("div",{className:"modal-dialog",role:"document"},a.createElement("div",{className:"modal-content"},a.createElement("div",{className:"modal-header"},a.createElement("h5",{className:"modal-title"},this.props.title),a.createElement("button",{type:"button",className:"close",onClick:this.closeModal,"data-dismiss":"modal","aria-label":"Close"},a.createElement("span",{"aria-hidden":"true"},"×"))),a.createElement("div",{className:"modal-body"},this.props.children),a.createElement("div",{className:"modal-footer"},t,a.createElement("button",{type:"button",onClick:this.closeModal,className:"btn btn-secondary","data-dismiss":"modal"},"Close"))))),e)},t}(a.Component);t.Modal=i},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=n(1),o=n(3),s=n(12),l=function(e){function t(t){void 0===t&&(t={name:"",price:0,mpg:0,insurance:0,registration:0,fuelType:i.FuelType.regular});var n=e.call(this)||this;return n.name=t.name,n.price=t.price,n.mpg=t.mpg,n.insurance=t.insurance,n.registration=t.registration,n.fuelType=t.fuelType,n}return r(t,e),t.prototype.costToDriveMonth=function(e,t,n){var r=t*e;return this.price+this.insurance*t+this.costToDriveGasOnly(r,n)},t.prototype.costToDriveGasOnly=function(e,t){return e/this.mpg*t.get(this.fuelType)},t}(function(){return function(){}}());function c(e){return a.createElement("li",{className:"car-listing list-group-item",style:{display:"flex",justifyContent:"space-between",flexDirection:"row"}},a.createElement("div",null,a.createElement("span",null,e.data.name),a.createElement("div",{className:"details"},a.createElement("span",null,"MPG: ",e.data.mpg),a.createElement("span",null,"Price: ",e.data.price),a.createElement("span",null,"Fuel Type: ",i.fuelString(e.data.fuelType)))),a.createElement("button",{type:"button",className:"btn btn-danger btn-sm",style:{float:"right"},onClick:e.removeCar},"x"))}t.Car=l;var u=function(e){function t(t){return e.call(this,t)||this}return r(t,e),t.prototype.render=function(){var e=this,t=a.createElement("div",null,"Vehicles",a.createElement("div",{style:{float:"right"}},a.createElement(o.Modal,{title:"Add Vehicle",triggerText:"+",submit:{buttonName:"Add",formName:"addCar"},visible:!1},a.createElement(p,{addCar:this.props.addCar})),a.createElement("button",{className:"btn btn-primary btn-danger",onClick:this.props.removeAll},"x")));return a.createElement(s.MinimizableCard,{header:t},a.createElement("ul",{className:"list-group list-group-flush"},this.props.data.map(function(t){return a.createElement(c,{data:t,removeCar:e.props.removeCar.bind(e,t.name)})})))},t}(a.Component);t.CarList=u;var p=function(e){function t(t){var n=e.call(this,t)||this;return n.state={car:new l,error:!1},n.handleChange=n.handleChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n.addCar=n.addCar.bind(n),n}return r(t,e),t.prototype.addCar=function(e){this.props.addCar(e)||this.setState({error:!0})},t.prototype.handleChange=function(e){var t=this.state.car,n=e.target.value;"number"!=e.target.type&&isNaN(e.target.value)||(n=parseFloat(n)),t[e.target.id]=n,this.setState({car:t})},t.prototype.handleSubmit=function(e){this.addCar(this.state.car),e.preventDefault(),this.setState({car:new l})},t.prototype.fuelOption=function(e){return a.createElement("option",{value:e},i.fuelString(e))},t.prototype.render=function(){var e;return this.state.error&&(e=a.createElement("p",null,"Car with the same name already exists.")),a.createElement("form",{onSubmit:this.handleSubmit,id:"addCar"},e,a.createElement("div",{className:"form-group"},a.createElement("label",null,"Name",a.createElement("input",{className:"form-control",name:"Name",id:"name",onChange:this.handleChange,required:!0}))),a.createElement("div",{className:"form-row"},a.createElement("div",{className:"form-group"},a.createElement("label",null,"Fuel Type",a.createElement("select",{className:"form-control",name:"Fuel Type",id:"fuelType",onChange:this.handleChange},this.fuelOption(i.FuelType.regular),this.fuelOption(i.FuelType.mid),this.fuelOption(i.FuelType.premium),this.fuelOption(i.FuelType.diesel)))),a.createElement("div",{className:"form-group"},a.createElement("label",null,"MPG",a.createElement("input",{className:"form-control",type:"number",min:"0",name:"MPG",id:"mpg",onChange:this.handleChange,required:!0})))),a.createElement("div",{className:"form-group"},a.createElement("label",null,"Price",a.createElement("input",{className:"form-control",type:"number",min:"0",value:this.state.car.price,name:"Price",id:"price",onChange:this.handleChange,required:!0}))),a.createElement("div",{className:"form-row"},a.createElement("div",{className:"form-group"},a.createElement("label",null,"Insurance (Monthly)",a.createElement("input",{className:"form-control",type:"number",value:this.state.car.insurance,name:"Insurance",id:"insurance",onChange:this.handleChange}))),a.createElement("div",{className:"form-group"},a.createElement("label",null,"Vehicle Registration",a.createElement("input",{className:"form-control",type:"number",value:this.state.car.registration,name:"Registration",id:"registration",onChange:this.handleChange})))))},t}(a.Component)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(6),i=n(7),o=n(4),s=n(1),l=[new o.Car({name:"2018 Ford F-150",mpg:23,price:27705,fuelType:s.FuelType.regular,insurance:0,registration:0}),new o.Car({name:"2018 Chevrolet Silverado 1500",mpg:21,price:28300,fuelType:s.FuelType.regular,insurance:0,registration:0}),new o.Car({name:"2018 Ram 1500",mpg:23,price:27295,fuelType:s.FuelType.regular,insurance:0,registration:0}),new o.Car({name:"2018 Toyota RAV4",mpg:26,price:24660,fuelType:s.FuelType.regular,insurance:0,registration:0}),new o.Car({name:"2018 Nissan Rogue",mpg:29,price:24800,fuelType:s.FuelType.regular,insurance:0,registration:0}),new o.Car({name:"2018 Toyota Camry",mpg:34,price:23645,fuelType:s.FuelType.regular,insurance:0,registration:0})];a.render(r.createElement(i.MpgCalculator,{data:l}),document.getElementById("root"))},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=n(2),o=n(1),s=n(9),l=n(10),c=n(11),u=n(4),p=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.componentDidMount=function(){this.updateChart()},t.prototype.updateChart=function(){c3.generate({bindto:"#chart",data:this.makeData(this.props.data),axis:{x:{label:"Months Driven"},y:{label:"Cost"}}})},t.prototype.makeData=function(e){var t={x:"x",columns:[Array("x").concat(i.range(0,this.props.months))]};for(var n in e){for(var r=e[n],a=this.props.annualMileage/12,o=[r.name],s=0;s<this.props.months;s++)o.push(r.costToDriveMonth(a,s,this.props.ppg));t.columns.push(o)}return t},t.prototype.render=function(){return this.updateChart(),a.createElement("div",{id:"chart"})},t}(a.Component),m=function(e){function t(t){var n=e.call(this,t)||this,r=new Map([[o.FuelType.regular,2.87],[o.FuelType.mid,3.15],[o.FuelType.premium,3.4],[o.FuelType.diesel,3.18]]);return n.state={data:t.data,ppg:r,months:48,annualMileage:12e3,activeTab:"Chart"},n.updateGasPrice=n.updateGasPrice.bind(n),n.updateMileage=n.updateMileage.bind(n),n.updateMonths=n.updateMonths.bind(n),n.addCar=n.addCar.bind(n),n.removeAll=n.removeAll.bind(n),n.removeCar=n.removeCar.bind(n),n.setActive=n.setActive.bind(n),n}return r(t,e),t.prototype.updateGasPrice=function(e){this.setState({ppg:e})},t.prototype.updateMileage=function(e){this.setState({annualMileage:e})},t.prototype.updateMonths=function(e){this.setState({months:e})},t.prototype.addCar=function(e){for(var t in this.state.data)if(this.state.data[t].name==e.name)return!1;var n=this.state.data;return n.push(e),this.setState({data:n}),!0},t.prototype.removeAll=function(){this.setState({data:[]})},t.prototype.removeCar=function(e){var t=[];for(var n in this.state.data)e!=this.state.data[n].name&&t.push(this.state.data[n]);this.setState({data:t})},t.prototype.setActive=function(e){this.setState({activeTab:e})},t.prototype.render=function(){var e;return e="Chart"==this.state.activeTab?a.createElement("div",null,a.createElement(p,{annualMileage:this.state.annualMileage,months:this.state.months,data:this.state.data,ppg:this.state.ppg}),a.createElement("div",{style:{width:"100%",display:"flex",alignContent:"space-around",flexDirection:"row"}},a.createElement("div",{style:{width:"72.5%"}},a.createElement(s.MileageChanger,{mileage:this.state.annualMileage,updateMileage:this.updateMileage})),a.createElement("div",{style:{width:"22.5%"}},a.createElement(s.MonthChanger,{months:this.state.months,updateMonths:this.updateMonths})))):a.createElement(c.Table,{annualMileage:this.state.annualMileage,months:this.state.months,data:this.state.data,ppg:this.state.ppg}),a.createElement("div",{className:"container-fluid"},a.createElement("h1",null,"Automobile Cost Calculator"),a.createElement("div",{className:"row"},a.createElement("div",{className:"col"},a.createElement("div",{className:"card",id:"graph-panel"},a.createElement("div",{className:"card-header"},a.createElement(l.Tabs,{items:["Chart","Table"],activeItem:this.state.activeTab,setActive:this.setActive})),a.createElement("div",{className:"card-body"},e))),a.createElement("div",{className:"col-4"},a.createElement(o.GasPriceChanger,{ppg:this.state.ppg,updateGasPrice:this.updateGasPrice}),a.createElement(u.CarList,{data:this.state.data,addCar:this.addCar,removeAll:this.removeAll,removeCar:this.removeCar}))))},t}(a.Component);t.MpgCalculator=m},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=n(3),o=function(e){function t(t){var n=e.call(this,t)||this;return n.state={modalVisible:!1},n}return r(t,e),t.prototype.render=function(){return a.createElement("div",{style:{display:"inline",float:"right"}},a.createElement(i.Modal,{title:this.props.title,triggerText:"?",visible:this.state.modalVisible},this.props.children))},t}(a.Component);t.InfoBox=o},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=function(e){function t(t){var n=e.call(this,t)||this;return n.state={months:n.props.months},n.handleChange=n.handleChange.bind(n),n}return r(t,e),t.prototype.handleChange=function(e){var t=e.target.value;this.setState({months:t}),this.props.updateMonths(t)},t.prototype.render=function(){return a.createElement("form",null,a.createElement("input",{className:"form-control",name:"Months",id:"months",min:"0",step:"1",type:"number",value:this.state.months,onChange:this.handleChange}),a.createElement("label",{htmlFor:"months",className:"col-sm col-form-label"},a.createElement("b",null,"Months to Show")))},t}(a.Component);t.MonthChanger=i;var o=function(e){function t(t){var n=e.call(this,t)||this;return n.state={mileage:12e3},n.handleChange=n.handleChange.bind(n),n}return r(t,e),t.prototype.handleChange=function(e){var t=e.target.value;this.setState({mileage:t}),this.props.updateMileage(t)},t.prototype.render=function(){return a.createElement("form",null,a.createElement("input",{className:"form-control",name:"Mileage",id:"mileage",min:"0",max:"100000",type:"range",value:this.state.mileage,onChange:this.handleChange}),a.createElement("label",{htmlFor:"mileage",className:"col-sm col-form-label"},a.createElement("b",null,"Miles Per: "),"Year: ",this.state.mileage,"   Month: ",Math.round(this.state.mileage/12),"   Day: ",Math.round(this.state.mileage/365)))},t}(a.Component);t.MileageChanger=o},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.render=function(){var e="nav-link";return this.props.activeItem==this.props.name&&(e="nav-link active"),a.createElement("li",{className:"nav-item"},a.createElement("a",{className:e,onClick:this.props.setActive,"data-name":this.props.name},this.props.name))},t}(a.Component);t.TabItem=i;var o=function(e){function t(t){var n=e.call(this,t)||this;return n.state={activeItem:n.props.activeItem},n.setActive=n.setActive.bind(n),n}return r(t,e),t.prototype.setActive=function(e){var t=e.target.dataset.name;this.props.setActive(t)},t.prototype.render=function(){var e=this;return a.createElement("ul",{className:"nav nav-tabs card-header-tabs"},this.props.items.map(function(t){return a.createElement(i,{name:t,activeItem:e.props.activeItem,setActive:e.setActive})}))},t}(a.Component);t.Tabs=o},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=n(2),o=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.render=function(){var e=this,t=this.props.ppg;return a.createElement("table",null,a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null),a.createElement("th",{colSpan:4},"Cost to Drive (Gas Only)")),a.createElement("tr",null,a.createElement("th",null,"Name"),a.createElement("th",null,"10 Miles"),a.createElement("th",null,"25 Miles"),a.createElement("th",null,"100 Miles"),a.createElement("th",null,"One Month"))),a.createElement("tbody",null,this.props.data.map(function(n){return a.createElement("tr",null,a.createElement("td",null,n.name),a.createElement("td",null,i.money(n.costToDriveGasOnly(10,t))),a.createElement("td",null,i.money(n.costToDriveGasOnly(25,t))),a.createElement("td",null,i.money(n.costToDriveGasOnly(100,t))),a.createElement("td",null,i.money(n.costToDriveGasOnly(e.props.annualMileage/12,t))))})))},t}(a.Component);t.Table=o},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=function(e){function t(t){var n=e.call(this,t)||this;return n.minimize=n.minimize.bind(n),n.state={minimized:!1},n}return r(t,e),t.prototype.minimize=function(){this.setState({minimized:!this.state.minimized})},t.prototype.render=function(){var e=this.state.minimized,t=a.createElement("div",{className:"card-body"},this.props.children);return e&&(t=null),a.createElement("div",{className:"card"},a.createElement("div",{className:"card-header"},a.createElement("button",{className:"btn btn-primary",onClick:this.minimize},"Minimize"),this.props.header),t)},t}(a.Component);t.MinimizableCard=i}]);
//# sourceMappingURL=bundle.js.map