/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.tsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/ActionBar.tsx":
/*!**************************************!*\
  !*** ./src/components/ActionBar.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const FileLoader_1 = __webpack_require__(/*! ./FileLoader */ "./src/components/FileLoader.tsx");
const Modal_1 = __webpack_require__(/*! ./Modal */ "./src/components/Modal.tsx");
// Contains the controls for loading and saving
class ActionBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement("div", { className: "action-bar btn-toolbar", role: "toolbar" },
            React.createElement("div", { className: "btn-group mr-2", role: "group" },
                React.createElement("button", { className: "btn btn-primary", onClick: this.props.undoChanges },
                    React.createElement("img", { src: "./img/undo-24px.svg", alt: "Save" }),
                    "Undo Changes"),
                React.createElement(Modal_1.Modal, { submit: {
                        buttonName: "Load",
                        formName: "loadFile"
                    }, buttonProps: {
                        className: "btn-primary"
                    }, triggerText: "Load", title: "Load" },
                    React.createElement(FileLoader_1.FileLoader, { loadFile: this.props.loadData })),
                React.createElement("button", { className: "btn btn-primary", onClick: this.props.save },
                    React.createElement("img", { src: "./img/save-24px.svg", alt: "Save" }),
                    " Save"),
                React.createElement("button", { className: "btn btn-primary", onClick: this.props.saveFile },
                    React.createElement("img", { src: "./img/file_copy-24px.svg", alt: "Save" }),
                    "Save to File")),
            React.createElement("div", { className: "btn-group", role: "group" },
                React.createElement("button", { className: "btn btn-primary", onClick: this.props.reset },
                    React.createElement("img", { src: "./img/refresh-24px.svg", alt: "Save" }),
                    "Restore Defaults")));
    }
}
exports.default = ActionBar;


/***/ }),

/***/ "./src/components/AutoCostCalculator.tsx":
/*!***********************************************!*\
  !*** ./src/components/AutoCostCalculator.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const file_saver_1 = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
const Modal_1 = __webpack_require__(/*! ./Modal */ "./src/components/Modal.tsx");
const react_grid_layout_1 = __webpack_require__(/*! react-grid-layout */ "./node_modules/react-grid-layout/index.js");
const Fuel_1 = __webpack_require__(/*! ./Fuel */ "./src/components/Fuel.tsx");
const CarDatabase_1 = __webpack_require__(/*! ./CarDatabase */ "./src/components/CarDatabase.tsx");
const List_1 = __webpack_require__(/*! ./Car/List */ "./src/components/Car/List.tsx");
const Globals_1 = __webpack_require__(/*! ./Globals */ "./src/components/Globals.tsx");
const ActionBar_1 = __webpack_require__(/*! ./ActionBar */ "./src/components/ActionBar.tsx");
const ResponsiveReactGridLayout = react_grid_layout_1.WidthProvider(react_grid_layout_1.Responsive);
// Key of the localStorage entry that Auto Cost Calculator save data will be stored
const LocalStorageKey = "autoCostData";
;
;
class AutoCostCalculator extends React.Component {
    constructor(props) {
        super(props);
        let temp_modals_visible = new Map([
            ['carAdder', false]
        ]);
        this.state = {
            data: props.data,
            ppg: props.ppg,
            modalsVisible: temp_modals_visible
        };
        this.dynamicComponents = {};
        this.toJson = this.toJson.bind(this);
        this.updateCar = this.updateCar.bind(this);
        this.updateGasPrice = this.updateGasPrice.bind(this);
        this.addCar = this.addCar.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.removeCar = this.removeCar.bind(this);
        this.undoChanges = this.undoChanges.bind(this);
        this.reset = this.reset.bind(this);
        this.save = this.save.bind(this);
        this.loadData = this.loadData.bind(this);
        this.saveFile = this.saveFile.bind(this);
    }
    updateGasPrice(_ppg) {
        this.setState({
            ppg: _ppg
        });
    }
    // Add car listing
    addCar(data) {
        this.state.data.addCar(data);
        this.setState({ data: this.state.data });
    }
    // Update an individual cars
    updateCar(id, data) {
        this.state.data.updateCar(id, data);
        this.setState({ data: this.state.data });
    }
    // Remove all car listings
    removeAll() {
        this.state.data.removeAll();
        this.setState({ data: this.state.data });
    }
    // Remove an individual car
    removeCar(id) {
        this.state.data.removeCar(id);
        this.setState({ data: this.state.data });
    }
    // Reset any changes made since the last save state
    undoChanges() {
        let jsonData = localStorage.getItem(LocalStorageKey);
        this.loadData(JSON.parse(jsonData));
    }
    // Restore original defaults
    reset() {
        let defaults = new Globals_1.Defaults();
        this.setState({
            data: defaults.cars(),
            ppg: defaults.ppg()
        });
        this.save();
    }
    // Load previously saved data stored in a JSON format
    loadData(data) {
        let ppg = new Fuel_1.FuelPrice();
        ppg.load(data['ppg']);
        let cars = new CarDatabase_1.CarDatabase();
        cars.load(data['data']);
        this.setState({
            ppg: ppg,
            data: cars
        });
        this.save();
    }
    // Dump the current state in JSON format
    toJson() {
        let jsonData = {};
        jsonData['ppg'] = this.state.ppg.dump();
        jsonData['data'] = this.state.data.dump();
        return jsonData;
    }
    // Save the auto cost calculator's state to local storage
    save() {
        localStorage.setItem(LocalStorageKey, JSON.stringify(this.toJson()));
    }
    // Save data to an external file
    saveFile() {
        var blob = new Blob([JSON.stringify(this.toJson())], {
            type: "text/plain;charset=utf-8"
        });
        // TODO: Allow user to change filename
        file_saver_1.saveAs(blob, "auto-cost-data.json");
    }
    render() {
        // Grid
        var layouts = {
            lg: [
                { i: 'a', x: 0, y: 0, w: 20, h: 30 },
                { i: 'gas', x: 20, y: 0, w: 10, h: 16 },
                { i: 'c', x: 20, y: 2, w: 10, h: 40 }
            ]
        };
        let MainDisplay = React.lazy(() => Promise.resolve().then(() => __webpack_require__(/*! ./MainDisplay */ "./src/components/MainDisplay.tsx")));
        return React.createElement(React.Fragment, null,
            React.createElement(Modal_1.ModalContainer, null),
            React.createElement("div", { className: "container-fluid" },
                React.createElement("h1", null, "Automobile Cost Calculator"),
                React.createElement(ActionBar_1.default, { loadData: this.loadData, undoChanges: this.undoChanges, reset: this.reset, save: this.save, saveFile: this.saveFile }),
                React.createElement(ResponsiveReactGridLayout, { className: "layout", layouts: layouts, breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }, cols: { lg: 30, md: 30, sm: 6, xs: 4, xxs: 2 }, rowHeight: 10, 
                    // Make Bootstrap card headers the handle for drap/drop
                    draggableHandle: "div.card-header" },
                    React.createElement("div", { key: "a" },
                        React.createElement(React.Suspense, { fallback: React.createElement("div", null, "Loading...") },
                            React.createElement(MainDisplay, { data: this.state.data, ppg: this.state.ppg }))),
                    React.createElement("div", { key: "gas" },
                        React.createElement(Fuel_1.GasPriceChanger, { ppg: this.state.ppg, updateGasPrice: this.updateGasPrice })),
                    React.createElement("div", { key: "c" },
                        React.createElement(List_1.CarList, { data: this.state.data, addCar: this.addCar, updateCar: this.updateCar, removeAll: this.removeAll, removeCar: this.removeCar })))));
    }
}
exports.AutoCostCalculator = AutoCostCalculator;


/***/ }),

/***/ "./src/components/Buttons.tsx":
/*!************************************!*\
  !*** ./src/components/Buttons.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function Button(_a) {
    var { className = "" } = _a, props = __rest(_a, ["className"]);
    let classNames = ["btn", className].join(" ");
    return React.createElement("button", Object.assign({ type: "button", className: classNames }, props));
}
exports.Button = Button;
function PrimaryButton(_a) {
    var { className = "" } = _a, props = __rest(_a, ["className"]);
    let classNames = ["btn-primary", className].join(" ");
    return React.createElement(Button, Object.assign({ className: classNames }, props));
}
exports.PrimaryButton = PrimaryButton;
function DisabledButton(_a) {
    var { className = "" } = _a, props = __rest(_a, ["className"]);
    let classNames = ["btn-primary btn-disabled", className].join(" ");
    return React.createElement(Button, Object.assign({ className: classNames }, props, { disabled: true }));
}
exports.DisabledButton = DisabledButton;
function DangerButton(_a) {
    var { className = "" } = _a, props = __rest(_a, ["className"]);
    let classNames = ["btn-danger", className].join(" ");
    return React.createElement(Button, Object.assign({ className: classNames }, props));
}
exports.DangerButton = DangerButton;


/***/ }),

/***/ "./src/components/Car/Adder.tsx":
/*!**************************************!*\
  !*** ./src/components/Car/Adder.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Car_1 = __webpack_require__(/*! ./Car */ "./src/components/Car/Car.tsx");
const Fuel_1 = __webpack_require__(/*! ../Fuel */ "./src/components/Fuel.tsx");
// Form used for adding new cars
class Adder extends React.Component {
    constructor(props) {
        super(props);
        // Default values for new cars
        this.state = {
            'car': new Car_1.Car(),
            error: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCar = this.addCar.bind(this);
    }
    addCar(state) {
        // Add new car
        this.props.addCar(state);
    }
    handleChange(event) {
        // Update state to reflect input values
        let temp = this.state.car;
        let new_value = event.target.value;
        // TODO: Might want to revise second condition
        if (event.target.type == "number" || !isNaN(event.target.value)) {
            new_value = parseFloat(new_value);
        }
        temp[event.target.id] = new_value;
        this.setState({ car: temp });
    }
    handleSubmit(event) {
        this.addCar(this.state.car);
        event.preventDefault(); // Stop reloading page
        // Reset car (but only if non-errored)
        this.setState({ car: new Car_1.Car() });
    }
    fuelOption(type) {
        return React.createElement("option", { value: type }, Fuel_1.fuelString(type));
    }
    render() {
        var errorMessage;
        if (this.state.error) {
            errorMessage = React.createElement("p", null, "Car with the same name already exists.");
        }
        return React.createElement("form", { onSubmit: this.handleSubmit, id: "addCar" },
            errorMessage,
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null,
                    "Name",
                    React.createElement("input", { className: "form-control", name: "Name", id: "name", onChange: this.handleChange, required: true }))),
            React.createElement("div", { className: "form-row" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null,
                        "Fuel Type",
                        React.createElement("select", { className: "form-control", name: "Fuel Type", id: "fuelType", onChange: this.handleChange },
                            this.fuelOption(Fuel_1.FuelType.regular),
                            this.fuelOption(Fuel_1.FuelType.mid),
                            this.fuelOption(Fuel_1.FuelType.premium),
                            this.fuelOption(Fuel_1.FuelType.diesel)))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null,
                        "MPG",
                        React.createElement("input", { className: "form-control", type: "number", name: "MPG", id: "mpg", onChange: this.handleChange, required: true })))),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null,
                    "Price",
                    React.createElement("input", { className: "form-control", type: "number", min: "0", value: this.state.car.price, name: "Price", id: "price", onChange: this.handleChange, required: true }))),
            React.createElement("div", { className: "form-row" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null,
                        "Insurance (Monthly)",
                        React.createElement("input", { className: "form-control", type: "number", value: this.state.car.insurance, name: "Insurance", id: "insurance", onChange: this.handleChange }))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null,
                        "Vehicle Registration",
                        React.createElement("input", { className: "form-control", type: "number", value: this.state.car.registration, name: "Registration", id: "registration", onChange: this.handleChange })))));
    }
}
exports.Adder = Adder;


/***/ }),

/***/ "./src/components/Car/Car.tsx":
/*!************************************!*\
  !*** ./src/components/Car/Car.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Fuel_1 = __webpack_require__(/*! ../Fuel */ "./src/components/Fuel.tsx");
class CarData {
}
var ServiceFrequency;
(function (ServiceFrequency) {
    ServiceFrequency[ServiceFrequency["Month"] = 0] = "Month";
    ServiceFrequency[ServiceFrequency["Miles"] = 1] = "Miles";
})(ServiceFrequency || (ServiceFrequency = {}));
// Represents a reoccurring car service item, e.g.
// an oil change or tire replacements
class ServiceItem {
}
class Car {
    constructor(data = {
        name: "",
        price: 0,
        mpg: 0,
        insurance: 0,
        registration: 0,
        fuelType: Fuel_1.FuelType.regular
    }) {
        this.data = data;
    }
    load(data) {
        this.name = data['name'];
        this.price = data['price'];
        this.mpg = data['mpg'];
        this.insurance = data['insurance'];
        this.registration = data['registration'];
        this.fuelType = data['fuelType'];
    }
    dump() {
        return this.data;
    }
    get name() { return this.data.name; }
    get price() { return this.data.price; }
    get mpg() { return this.data.mpg; }
    get insurance() { return this.data.insurance; }
    get registration() { return this.data.registration; }
    get fuelType() { return this.data.fuelType; }
    set name(value) {
        this.data.name = value;
    }
    // Make sure values are numeric types and not strings
    set price(value) {
        this.data.price = parseFloat(value);
    }
    set mpg(value) {
        this.data.mpg = parseFloat(value);
    }
    set fuelType(value) {
        this.data.fuelType = parseInt(value);
    }
    set insurance(value) {
        this.data.insurance = parseFloat(value);
    }
    set registration(value) {
        this.data.registration = parseFloat(value);
    }
    // Calculate the total cost to drive a car x months
    costToDriveMonth(monthlyMileage, months, ppg) {
        const miles = months * monthlyMileage;
        let ret = this.price +
            (this.insurance * months) +
            // Divide annual registration cost by month
            ((this.registration / 12) * months) +
            this.fuelCost(miles, ppg);
        return ret;
    }
    fuelCost(miles, ppg) {
        // Calculate the cost to drive a car (gas only)
        return (miles / this.mpg) * ppg.get(this.fuelType);
    }
}
exports.Car = Car;


/***/ }),

/***/ "./src/components/Car/CarFields.tsx":
/*!******************************************!*\
  !*** ./src/components/Car/CarFields.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Represents data fields that can alternate between
// display and editing modes
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
class NumberField extends React.Component {
    render() {
        if (this.props.isEditable) {
            return (React.createElement("span", null,
                this.props.label,
                ":",
                React.createElement("input", { className: "form-control form-control-sm", name: this.props.fieldName, type: "number", value: this.props.value, onChange: this.props.onChange })));
        }
        var displayText = this.props.value;
        if ('formatter' in this.props) {
            displayText = this.props.formatter(displayText);
        }
        return (React.createElement("span", null,
            this.props.label,
            ": ",
            displayText));
    }
}
exports.NumberField = NumberField;
class GasField extends React.Component {
    render() {
        if (this.props.isEditable) {
            return (React.createElement("span", null,
                this.props.label,
                ":",
                React.createElement("select", { className: "custom-select custom-select-sm", name: this.props.fieldName, onChange: this.props.onChange, defaultValue: this.props.value.toString() }, Array.from(this.props.options).map((i) => React.createElement("option", { value: i[0] }, i[1])))));
        }
        return (React.createElement("span", null,
            this.props.label,
            ": ",
            this.props.options.get(this.props.value)));
    }
}
exports.GasField = GasField;


/***/ }),

/***/ "./src/components/Car/CarListing.tsx":
/*!*******************************************!*\
  !*** ./src/components/Car/CarListing.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Fuel_1 = __webpack_require__(/*! ../Fuel */ "./src/components/Fuel.tsx");
const DeleteConfirm_1 = __webpack_require__(/*! ../DeleteConfirm */ "./src/components/DeleteConfirm.tsx");
const CarFields_1 = __webpack_require__(/*! ./CarFields */ "./src/components/Car/CarFields.tsx");
function formatMoney(value) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(value);
}
// An individual car listing
class CarListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carData: props.data,
            isEditable: false
        };
        this.updateMpg = this.updateMpg.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateRegistration = this.updateRegistration.bind(this);
        this.updateInsurance = this.updateInsurance.bind(this);
        this.updateFuel = this.updateFuel.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    makeEditable(event) {
        this.setState({ isEditable: !this.state.isEditable });
    }
    handleSubmit(event) {
        this.setState({
            isEditable: false
        });
        this.props.updateCar(this.state.carData);
    }
    updateMpg(event) {
        let newCarData = this.state.carData;
        newCarData.mpg = event.target.value;
        this.setState({
            carData: newCarData
        });
    }
    updatePrice(event) {
        let newCarData = this.state.carData;
        newCarData.price = event.target.value;
        this.setState({
            carData: newCarData
        });
    }
    updateInsurance(event) {
        let newCarData = this.state.carData;
        newCarData.insurance = event.target.value;
        this.setState({
            carData: newCarData
        });
    }
    updateRegistration(event) {
        let newCarData = this.state.carData;
        newCarData.registration = event.target.value;
        this.setState({
            carData: newCarData
        });
    }
    updateFuel(event) {
        let newCarData = this.state.carData;
        newCarData.fuelType = event.target.value;
        this.setState({
            carData: newCarData
        });
    }
    render() {
        var gasFieldOptions = new Map();
        for (var i = 0; i < 4; i++) {
            gasFieldOptions.set(i, Fuel_1.fuelString(i));
        }
        var editButton = !this.state.isEditable ?
            React.createElement("img", { src: "./img/edit-24px.svg", alt: "Edit", onClick: this.makeEditable }) :
            React.createElement("img", { src: "./img/save-24px.svg", alt: "Save", onClick: this.handleSubmit });
        return (React.createElement("li", { className: "car-listing list-group-item" },
            React.createElement("span", { style: {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                } },
                this.props.data.name,
                React.createElement("span", { style: { paddingLeft: "4px" } },
                    editButton,
                    React.createElement(DeleteConfirm_1.DeleteConfirm, { className: "btn-sm", delete: this.props.removeCar }))),
            React.createElement("div", { className: "details" },
                React.createElement(CarFields_1.NumberField, { label: "MPG", value: this.state.carData.mpg, fieldName: "mpg", isEditable: this.state.isEditable, onChange: this.updateMpg }),
                React.createElement(CarFields_1.NumberField, { label: "Price", value: this.state.carData.price, fieldName: "price", isEditable: this.state.isEditable, onChange: this.updatePrice, formatter: formatMoney }),
                React.createElement(CarFields_1.GasField, { label: "Fuel Type", value: this.state.carData.fuelType, options: gasFieldOptions, fieldName: "fuelType", isEditable: this.state.isEditable, onChange: this.updateFuel }),
                React.createElement(CarFields_1.NumberField, { label: "Insurance", value: this.state.carData.insurance, fieldName: "insurance", isEditable: this.state.isEditable, onChange: this.updateInsurance, formatter: (value) => formatMoney(value) + "/month" }),
                React.createElement(CarFields_1.NumberField, { label: "Registration", value: this.state.carData.registration, fieldName: "registration", isEditable: this.state.isEditable, onChange: this.updateRegistration, formatter: (value) => formatMoney(value) + "/year" }))));
    }
}
exports.CarListing = CarListing;


/***/ }),

/***/ "./src/components/Car/List.tsx":
/*!*************************************!*\
  !*** ./src/components/Car/List.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Adder_1 = __webpack_require__(/*! ./Adder */ "./src/components/Car/Adder.tsx");
const CarListing_1 = __webpack_require__(/*! ./CarListing */ "./src/components/Car/CarListing.tsx");
const Modal_1 = __webpack_require__(/*! ../Modal */ "./src/components/Modal.tsx");
const MinimizableCard_1 = __webpack_require__(/*! ../MinimizableCard */ "./src/components/MinimizableCard.tsx");
const DeleteConfirm_1 = __webpack_require__(/*! ../DeleteConfirm */ "./src/components/DeleteConfirm.tsx");
;
// A list of vehicles
class CarList extends React.Component {
    constructor(props) {
        super(props);
    }
    updateCar(id, data) {
        this.props.updateCar(id, data);
    }
    render() {
        const clearAll = React.createElement(DeleteConfirm_1.DeleteConfirm, { text: "Clear All", delete: this.props.removeAll });
        // Controls to add a car and remove all cars
        const controls = React.createElement(React.Fragment, null,
            React.createElement(Modal_1.Modal, { submit: {
                    buttonName: "Add",
                    formName: "addCar"
                }, buttonProps: {
                    className: "btn-sm"
                }, triggerText: "Add Vehicle", title: "Add Vehicle" },
                React.createElement(Adder_1.Adder, { addCar: this.props.addCar })),
            React.createElement(DeleteConfirm_1.DeleteConfirm, { className: "btn-sm", text: "Clear All", delete: this.props.removeAll }));
        return React.createElement(MinimizableCard_1.MinimizableCard, { title: "Vehicles", titleCorner: controls },
            React.createElement(React.Fragment, null,
                React.createElement("div", { style: {
                        overflowX: "hidden",
                        overflowY: "scroll"
                    } },
                    React.createElement("ul", { className: "list-group list-group-flush" }, this.props.data.toArray().map((i) => React.createElement(CarListing_1.CarListing, { data: i, updateCar: this.updateCar.bind(this, i.id), removeCar: this.props.removeCar.bind(this, i.id) }))))));
    }
}
exports.CarList = CarList;


/***/ }),

/***/ "./src/components/Car/Table.tsx":
/*!**************************************!*\
  !*** ./src/components/Car/Table.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const helpers_1 = __webpack_require__(/*! ../helpers */ "./src/components/helpers.tsx");
class Table extends React.Component {
    render() {
        const ppg = this.props.ppg;
        return React.createElement("table", null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null),
                    React.createElement("th", { colSpan: 4 }, "Cost to Drive (Gas Only)")),
                React.createElement("tr", null,
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "10 Miles"),
                    React.createElement("th", null, "25 Miles"),
                    React.createElement("th", null, "100 Miles"),
                    React.createElement("th", null, "One Month"))),
            React.createElement("tbody", null, this.props.data.toArray().map((i) => React.createElement("tr", null,
                React.createElement("td", null, i.name),
                React.createElement("td", null, helpers_1.money(i.fuelCost(10, ppg))),
                React.createElement("td", null, helpers_1.money(i.fuelCost(25, ppg))),
                React.createElement("td", null, helpers_1.money(i.fuelCost(100, ppg))),
                React.createElement("td", null, helpers_1.money(i.fuelCost(this.props.annualMileage / 12, ppg)))))));
    }
}
exports.Table = Table;


/***/ }),

/***/ "./src/components/CarDatabase.tsx":
/*!****************************************!*\
  !*** ./src/components/CarDatabase.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Car_1 = __webpack_require__(/*! ./Car/Car */ "./src/components/Car/Car.tsx");
// Stores information of all cars in the app
class CarDatabase {
    constructor() {
        this.data = new Map();
        this.nextId = 0;
    }
    load(data) {
        // data is assumed to be a JSON array
        for (let i in data) {
            let tempCar = new Car_1.Car();
            tempCar.load(data[i]);
            this.addCar(tempCar);
        }
    }
    dump() {
        let ret = [];
        for (let car of this.data.values()) {
            ret.push(car.dump());
        }
        return ret;
    }
    // Return an array of cars
    toArray() {
        return Array.from(this.data.values());
    }
    // Add a car listing
    addCar(record) {
        record.id = this.nextId;
        this.data.set(this.nextId, record);
        this.nextId++;
    }
    // Update a car listing
    updateCar(id, data) {
        this.data.set(id, data);
    }
    // Remove a car by ID
    removeCar(id) {
        return this.data.delete(id);
    }
    // Remove all car listings
    removeAll() {
        this.data.clear();
    }
}
exports.CarDatabase = CarDatabase;


/***/ }),

/***/ "./src/components/DeleteConfirm.tsx":
/*!******************************************!*\
  !*** ./src/components/DeleteConfirm.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Buttons_1 = __webpack_require__(/*! ./Buttons */ "./src/components/Buttons.tsx");
class DeleteConfirm extends React.Component {
    /*
     * Delete button which changes to a confirm prompt before
     * finally doing the deed
     */
    constructor(props) {
        super(props);
        this.state = {
            confirm: false
        };
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    delete() {
        this.props.delete();
        this.setState({ confirm: false });
    }
    toggle() {
        this.setState({ confirm: !this.state.confirm });
    }
    render() {
        const text = ('text' in this.props) ? this.props.text : 'x';
        let deleteButton = React.createElement("img", { src: "./img/delete-24px.svg", onClick: this.toggle, alt: "Delete" });
        if ('text' in this.props) {
            deleteButton = React.createElement(Buttons_1.DangerButton, { className: this.props.className, onClick: this.toggle }, text);
        }
        return this.state.confirm ?
            React.createElement(React.Fragment, null,
                React.createElement(Buttons_1.DangerButton, { className: this.props.className, onClick: this.delete }, "Confirm"),
                React.createElement(Buttons_1.PrimaryButton, { className: this.props.className, onClick: this.toggle }, "Cancel")) :
            deleteButton;
    }
}
exports.DeleteConfirm = DeleteConfirm;


/***/ }),

/***/ "./src/components/FileLoader.tsx":
/*!***************************************!*\
  !*** ./src/components/FileLoader.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
// Form used for reading Auto Cost Calculator saved files
class FileLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.readFile = this.readFile.bind(this);
        // See: https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
        this.fileInput = React.createRef();
    }
    readFile(file) {
        /*
         * Ref:
         * https://stackoverflow.com/questions/750032/reading-file-contents-on-the-client-side-in-javascript-in-various-browsers
         */
        const reader = new FileReader();
        reader.onload = (fileLoadedEvent) => {
            var text = reader.result;
            console.log(text);
            console.log("PARSED JSON", JSON.parse(text.toString()));
            this.props.loadFile(JSON.parse(text.toString()));
        };
        console.log("READING AS TEXT FILE");
        reader.readAsText(file, "UTF-8");
    }
    handleSubmit(event) {
        console.log("Submit pressed");
        event.preventDefault(); // Prevent page refresh
        let userFile = this.fileInput.current.files[0];
        console.log("Uploaded ", userFile.name);
        this.readFile(userFile);
    }
    render() {
        return React.createElement("form", { onSubmit: this.handleSubmit, id: "loadFile" },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null,
                    "File",
                    React.createElement("input", { className: "form-control", type: "file", ref: this.fileInput }))));
    }
}
exports.FileLoader = FileLoader;


/***/ }),

/***/ "./src/components/Fuel.tsx":
/*!*********************************!*\
  !*** ./src/components/Fuel.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Modal_1 = __webpack_require__(/*! ./Modal */ "./src/components/Modal.tsx");
const MinimizableCard_1 = __webpack_require__(/*! ./MinimizableCard */ "./src/components/MinimizableCard.tsx");
const Buttons_1 = __webpack_require__(/*! ./Buttons */ "./src/components/Buttons.tsx");
const helpers_1 = __webpack_require__(/*! ./helpers */ "./src/components/helpers.tsx");
var FuelType;
(function (FuelType) {
    FuelType[FuelType["regular"] = 0] = "regular";
    FuelType[FuelType["mid"] = 1] = "mid";
    FuelType[FuelType["premium"] = 2] = "premium";
    FuelType[FuelType["diesel"] = 3] = "diesel";
})(FuelType = exports.FuelType || (exports.FuelType = {}));
function fuelString(type) {
    switch (type) {
        case FuelType.regular:
            return "Regular (87)";
        case FuelType.mid:
            return "Mid-Grade (89)";
        case FuelType.premium:
            return "Premium (92)";
        case FuelType.diesel:
            return "Diesel";
    }
}
exports.fuelString = fuelString;
class FuelPrice {
    constructor() {
        this.data = new Map();
    }
    get(key) {
        return this.data.get(key);
    }
    set(key, value) {
        this.data.set(key, value);
        return this;
    }
    load(data) {
        for (let k in data) {
            this.data.set(Number(k), data[k]);
        }
    }
    dump() {
        return helpers_1.jsonifyMap(this.data);
    }
}
exports.FuelPrice = FuelPrice;
class GasPriceChangerColumn extends React.Component {
    render() {
        return React.createElement("div", { className: "form-group col-sm", style: { minWidth: "10em" } },
            React.createElement("input", { className: "form-control", name: fuelString(this.props.id), type: "number", step: "0.01", min: "0", id: this.props.id.toString(), onChange: this.props.onChange, value: this.props.fuelPrice }),
            React.createElement("label", { htmlFor: this.props.id.toString(), className: "col-sm col-form-label" }, fuelString(this.props.id)));
    }
}
class GasPriceChanger extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            updateable: false,
            ppg: props.ppg,
            temp_ppg: new Map([
                [FuelType.regular, props.ppg.get(0).toString()],
                [FuelType.mid, props.ppg.get(1).toString()],
                [FuelType.premium, props.ppg.get(2).toString()],
                [FuelType.diesel, props.ppg.get(3).toString()]
            ]),
        };
    }
    onChange(event) {
        var temp = this.state.temp_ppg;
        let targetKey = parseInt(event.target.id);
        temp.set(targetKey, event.target.value);
        this.setState({
            updateable: true,
            temp_ppg: temp
        });
    }
    handleSubmit(event) {
        /* "Update" button pressed */
        // Pass updated prices back up to MpgCalculator
        let newPpg = new FuelPrice();
        newPpg.set(FuelType.regular, parseFloat(this.state.temp_ppg.get(FuelType.regular)));
        newPpg.set(FuelType.mid, parseFloat(this.state.temp_ppg.get(FuelType.mid)));
        newPpg.set(FuelType.premium, parseFloat(this.state.temp_ppg.get(FuelType.premium)));
        newPpg.set(FuelType.diesel, parseFloat(this.state.temp_ppg.get(FuelType.diesel)));
        this.props.updateGasPrice(newPpg);
        event.preventDefault(); // Prevent submit from reloading page
        // Disable update button
        this.setState({
            updateable: false
        });
    }
    render() {
        const updateButton = this.state.updateable ?
            React.createElement(Buttons_1.PrimaryButton, { type: "submit" }, "Update") :
            React.createElement(Buttons_1.DisabledButton, null, "Update");
        const infoBox = React.createElement(Modal_1.Modal, { title: "Good to Know: Fuel", triggerText: "?" },
            React.createElement("p", null, "While there may be benefits to using mid-grade (sometimes labelled \"Plus\") or premium fuel, most consumer vehicles in the US will run just fine on regular unleaded. Generally speaking, it is best to follow the recommendations in your owner's manual."));
        return (React.createElement(MinimizableCard_1.MinimizableCard, { title: "Price of Gas" },
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("div", { className: "row" },
                    React.createElement(GasPriceChangerColumn, { id: FuelType.regular, fuelPrice: this.state.temp_ppg.get(FuelType.regular), onChange: this.onChange }),
                    React.createElement(GasPriceChangerColumn, { id: FuelType.mid, fuelPrice: this.state.temp_ppg.get(FuelType.mid), onChange: this.onChange }),
                    React.createElement(GasPriceChangerColumn, { id: FuelType.premium, fuelPrice: this.state.temp_ppg.get(FuelType.premium), onChange: this.onChange }),
                    React.createElement(GasPriceChangerColumn, { id: FuelType.diesel, fuelPrice: this.state.temp_ppg.get(FuelType.diesel), onChange: this.onChange })),
                updateButton,
                " ",
                infoBox)));
    }
}
exports.GasPriceChanger = GasPriceChanger;


/***/ }),

/***/ "./src/components/Globals.tsx":
/*!************************************!*\
  !*** ./src/components/Globals.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Default values for the Car Cost Calculator
Object.defineProperty(exports, "__esModule", { value: true });
const CarDatabase_1 = __webpack_require__(/*! ./CarDatabase */ "./src/components/CarDatabase.tsx");
const Fuel_1 = __webpack_require__(/*! ./Fuel */ "./src/components/Fuel.tsx");
const Car_1 = __webpack_require__(/*! ./Car/Car */ "./src/components/Car/Car.tsx");
class Defaults {
    cars() {
        let cars = [
            new Car_1.Car({
                'name': '2018 Ford F-150',
                'mpg': 23,
                'price': 27705,
                'fuelType': Fuel_1.FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
            new Car_1.Car({
                'name': '2018 Chevrolet Silverado 1500',
                'mpg': 21,
                'price': 28300,
                'fuelType': Fuel_1.FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
            new Car_1.Car({
                'name': '2018 Ram 1500',
                'mpg': 23,
                'price': 27295,
                'fuelType': Fuel_1.FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
            new Car_1.Car({
                'name': '2018 Toyota RAV4',
                'mpg': 26,
                'price': 24660,
                'fuelType': Fuel_1.FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
            new Car_1.Car({
                'name': '2018 Nissan Rogue',
                'mpg': 29,
                'price': 24800,
                'fuelType': Fuel_1.FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
            new Car_1.Car({
                'name': '2018 Toyota Camry',
                'mpg': 34,
                'price': 23645,
                'fuelType': Fuel_1.FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
        ];
        let carDb = new CarDatabase_1.CarDatabase();
        for (var i in cars) {
            carDb.addCar(cars[i]);
        }
        return carDb;
    }
    ppg() {
        var defaultPpg = new Fuel_1.FuelPrice();
        defaultPpg.set(Fuel_1.FuelType.regular, 2.87);
        defaultPpg.set(Fuel_1.FuelType.mid, 3.15);
        defaultPpg.set(Fuel_1.FuelType.premium, 3.4);
        defaultPpg.set(Fuel_1.FuelType.diesel, 3.18);
        return defaultPpg;
    }
}
exports.Defaults = Defaults;


/***/ }),

/***/ "./src/components/MainDisplay.tsx":
/*!****************************************!*\
  !*** ./src/components/MainDisplay.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Tabs_1 = __webpack_require__(/*! ./Tabs */ "./src/components/Tabs.tsx");
const Table_1 = __webpack_require__(/*! ./Car/Table */ "./src/components/Car/Table.tsx");
class MainDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "Cost Over Time",
            months: 48,
            annualMileage: 12000
        };
        this.updateMileage = this.updateMileage.bind(this);
        this.updateMonths = this.updateMonths.bind(this);
        this.setActive = this.setActive.bind(this);
    }
    getChart() {
        const Graph = React.lazy(() => Promise.resolve().then(() => __webpack_require__(/*! ./charts/Graph */ "./src/components/charts/Graph.tsx")));
        const MileageChanger = React.lazy(() => Promise.resolve().then(() => __webpack_require__(/*! ./charts/MileageChanger */ "./src/components/charts/MileageChanger.tsx")));
        const MonthChanger = React.lazy(() => Promise.resolve().then(() => __webpack_require__(/*! ./charts/MonthChanger */ "./src/components/charts/MonthChanger.tsx")));
        return React.createElement("div", { style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            } },
            React.createElement(React.Suspense, { fallback: React.createElement("div", null, "Loading...") },
                React.createElement(Graph, { data: this.makeGraphData() }),
                React.createElement("div", { style: {
                        width: '100%',
                        display: 'flex',
                        alignContent: 'space-around',
                        flexDirection: 'row'
                    } },
                    React.createElement("div", { style: { width: '72.5%' } },
                        React.createElement(MileageChanger, { mileage: this.state.annualMileage, updateMileage: this.updateMileage })),
                    React.createElement("div", { style: { width: '22.5%' } },
                        React.createElement(MonthChanger, { months: this.state.months, updateMonths: this.updateMonths })))));
    }
    getCostPerMonth() {
        const BarGraph = React.lazy(() => Promise.resolve().then(() => __webpack_require__(/*! ./charts/BarGraph */ "./src/components/charts/BarGraph.tsx")));
        const MileageChanger = React.lazy(() => Promise.resolve().then(() => __webpack_require__(/*! ./charts/MileageChanger */ "./src/components/charts/MileageChanger.tsx")));
        const MonthChanger = React.lazy(() => Promise.resolve().then(() => __webpack_require__(/*! ./charts/MonthChanger */ "./src/components/charts/MonthChanger.tsx")));
        return React.createElement("div", { style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            } },
            React.createElement(React.Suspense, { fallback: React.createElement("div", null, "Loading...") },
                React.createElement(BarGraph, null),
                React.createElement("div", { style: {
                        width: '100%',
                        display: 'flex',
                        alignContent: 'space-around',
                        flexDirection: 'row'
                    } },
                    React.createElement("div", { style: { width: '72.5%' } },
                        React.createElement(MileageChanger, { mileage: this.state.annualMileage, updateMileage: this.updateMileage })),
                    React.createElement("div", { style: { width: '22.5%' } },
                        React.createElement(MonthChanger, { months: this.state.months, updateMonths: this.updateMonths })))));
    }
    makeGraphData() {
        let cars = this.props.data.toArray();
        // a mapping of car names to arrays of (x, y) pairs
        let data = new Map();
        for (let i in cars) {
            let car = cars[i];
            // An array of car costs, site-indexed by month
            let costs = [];
            for (var j = 0; j < this.state.months; j++) {
                costs.push({
                    x: j,
                    y: car.costToDriveMonth(this.state.annualMileage / 12, j, this.props.ppg)
                });
            }
            data.set(car.name, costs);
        }
        return data;
    }
    updateMileage(mileage) {
        this.setState({
            annualMileage: mileage
        });
    }
    updateMonths(numMonths) {
        this.setState({
            months: numMonths
        });
    }
    setActive(name) {
        this.setState({
            activeTab: name
        });
    }
    render() {
        const tabItems = [
            "Cost Over Time",
            // "Cost Per Month",
            "Table"
        ];
        let body;
        if (this.state.activeTab == "Cost Over Time") {
            body = this.getChart();
        }
        /*
        else if (this.state.activeTab == "Cost Per Month") {
            body = this.getCostPerMonth();
        }
        */
        else {
            body = React.createElement(Table_1.Table, { annualMileage: this.state.annualMileage, months: this.state.months, data: this.props.data, ppg: this.props.ppg });
        }
        return React.createElement("div", { className: "card", id: "graph-panel", style: { width: "100%", height: "100%" } },
            React.createElement("div", { className: "card-header" },
                React.createElement(Tabs_1.Tabs, { items: tabItems, activeItem: this.state.activeTab, setActive: this.setActive })),
            React.createElement("div", { className: "card-body" }, body));
    }
}
exports.default = MainDisplay;


/***/ }),

/***/ "./src/components/MinimizableCard.tsx":
/*!********************************************!*\
  !*** ./src/components/MinimizableCard.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
class MinimizeTrigger extends React.Component {
    render() {
        var text = '[-]';
        if (this.props.minimized) {
            text = '[+]';
        }
        return React.createElement("a", { role: 'button', onClick: this.props.onClick, style: { float: 'left' } }, text);
    }
}
class MinimizableCard extends React.Component {
    // A card that can be minimized
    constructor(props) {
        super(props);
        this.minimize = this.minimize.bind(this);
        this.state = {
            'minimized': false
        };
    }
    minimize() {
        this.setState({
            'minimized': !this.state['minimized']
        });
    }
    render() {
        const minimized = this.state['minimized'];
        var title = this.props.title;
        if ('titleCorner' in this.props) {
            title = React.createElement(React.Fragment, null,
                this.props.title,
                React.createElement("div", { style: { float: "right" } }, this.props.titleCorner));
        }
        var children = React.createElement("div", { className: "card-body", style: {
                overflowX: "hidden",
                overflowY: "hidden"
            } }, this.props.children);
        if (minimized) {
            children = null;
        }
        // Stretch to fit flexible box height wise
        // <MinimizeTrigger onClick={this.minimize} minimized={minimized} />
        return React.createElement("div", { className: "card", style: { height: "100%" } },
            React.createElement("div", { className: "card-header" }, title),
            children);
    }
}
exports.MinimizableCard = MinimizableCard;


/***/ }),

/***/ "./src/components/Modal.tsx":
/*!**********************************!*\
  !*** ./src/components/Modal.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** React-Bootstrap Modal System
 *
 *  Creates a single modal container which handles all requests to display modals.
 *  This allows modals to be displayed without interference from other elements.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Buttons_1 = __webpack_require__(/*! ./Buttons */ "./src/components/Buttons.tsx");
let container = null; // Keep track of ModalContainer
class ModalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'currentModal': null
        };
    }
    componentDidMount() {
        // Keep track of <ModalContainer />
        container = this;
    }
    clearModal() {
        this.setState({ 'currentModal': null });
    }
    render() {
        const currentModal = this.state['currentModal'];
        return React.createElement("div", { className: "modal", tabIndex: -1, role: "dialog", style: {
                display: currentModal ? 'block' : 'none',
                background: 'rgba(0, 0, 0, 0.5)'
            } }, this.state.currentModal);
    }
}
exports.ModalContainer = ModalContainer;
class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'visible': ('visible' in this.props) ? this.props.visible : false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        if (!this.state.visible) {
            // If not visisble, then change that
            this.renderModal();
        }
        else {
            container.clearModal();
        }
        this.setState({
            'visible': !this.state['visible']
        });
    }
    renderModal() {
        let submit = this.props.submit ? React.createElement(Buttons_1.PrimaryButton, { type: "submit", form: this.props.submit.formName }, this.props.submit.buttonName) : null;
        container.setState({
            currentModal: React.createElement("div", { className: "modal-dialog", role: "document" },
                React.createElement("div", { className: "modal-content" },
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h5", { className: "modal-title" }, this.props.title),
                        React.createElement("button", { type: "button", className: "close", onClick: this.toggle, "data-dismiss": "modal", "aria-label": "Close" },
                            React.createElement("span", { "aria-hidden": "true" }, "\u00D7"))),
                    React.createElement("div", { className: "modal-body" }, this.props.children),
                    React.createElement("div", { className: "modal-footer" },
                        submit,
                        React.createElement(Buttons_1.Button, { className: "btn-secondary", onClick: this.toggle, "data-dismiss": "modal" }, "Close"))))
        });
    }
    render() {
        return React.createElement(Buttons_1.PrimaryButton, Object.assign({ onClick: this.toggle }, this.props.buttonProps), this.props.triggerText);
    }
}
exports.Modal = Modal;


/***/ }),

/***/ "./src/components/Tabs.tsx":
/*!*********************************!*\
  !*** ./src/components/Tabs.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Tab controller and navigation
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
class TabItem extends React.Component {
    render() {
        let className = "nav-link";
        if (this.props.activeItem == this.props.name) {
            className = "nav-link active";
        }
        return React.createElement("li", { className: "nav-item" },
            React.createElement("a", { className: className, role: "button", onClick: this.props.setActive, "data-name": this.props.name }, this.props.name));
    }
}
exports.TabItem = TabItem;
class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
        this.setActive = this.setActive.bind(this);
    }
    setActive(event) {
        const newTab = event.target.dataset.name;
        // pass name of new active tab back up
        this.props.setActive(newTab);
    }
    render() {
        return React.createElement("ul", { className: "nav nav-tabs card-header-tabs" }, this.props.items.map((i) => React.createElement(TabItem, { name: i, activeItem: this.props.activeItem, setActive: this.setActive })));
    }
}
exports.Tabs = Tabs;


/***/ }),

/***/ "./src/components/charts/BarGraph.tsx":
/*!********************************************!*\
  !*** ./src/components/charts/BarGraph.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const bar_1 = __webpack_require__(/*! @nivo/bar */ "./node_modules/@nivo/bar/dist/nivo-bar.esm.js");
class BarGraph extends React.Component {
    render() {
        let data = [
            {
                "country": "AD",
                "hot dog": 85,
                "hot dogColor": "hsl(310, 70%, 50%)",
                "burger": 106,
                "burgerColor": "hsl(96, 70%, 50%)",
                "sandwich": 10,
                "sandwichColor": "hsl(189, 70%, 50%)",
                "kebab": 146,
                "kebabColor": "hsl(200, 70%, 50%)",
                "fries": 36,
                "friesColor": "hsl(24, 70%, 50%)",
                "donut": 146,
                "donutColor": "hsl(80, 70%, 50%)"
            },
            {
                "country": "AE",
                "hot dog": 3,
                "hot dogColor": "hsl(318, 70%, 50%)",
                "burger": 89,
                "burgerColor": "hsl(248, 70%, 50%)",
                "sandwich": 40,
                "sandwichColor": "hsl(52, 70%, 50%)",
                "kebab": 36,
                "kebabColor": "hsl(110, 70%, 50%)",
                "fries": 0,
                "friesColor": "hsl(277, 70%, 50%)",
                "donut": 165,
                "donutColor": "hsl(155, 70%, 50%)"
            },
            {
                "country": "AF",
                "hot dog": 99,
                "hot dogColor": "hsl(253, 70%, 50%)",
                "burger": 101,
                "burgerColor": "hsl(235, 70%, 50%)",
                "sandwich": 78,
                "sandwichColor": "hsl(79, 70%, 50%)",
                "kebab": 87,
                "kebabColor": "hsl(148, 70%, 50%)",
                "fries": 37,
                "friesColor": "hsl(162, 70%, 50%)",
                "donut": 167,
                "donutColor": "hsl(31, 70%, 50%)"
            },
            {
                "country": "AG",
                "hot dog": 192,
                "hot dogColor": "hsl(29, 70%, 50%)",
                "burger": 137,
                "burgerColor": "hsl(116, 70%, 50%)",
                "sandwich": 97,
                "sandwichColor": "hsl(164, 70%, 50%)",
                "kebab": 137,
                "kebabColor": "hsl(160, 70%, 50%)",
                "fries": 94,
                "friesColor": "hsl(10, 70%, 50%)",
                "donut": 54,
                "donutColor": "hsl(342, 70%, 50%)"
            },
            {
                "country": "AI",
                "hot dog": 155,
                "hot dogColor": "hsl(296, 70%, 50%)",
                "burger": 180,
                "burgerColor": "hsl(356, 70%, 50%)",
                "sandwich": 10,
                "sandwichColor": "hsl(95, 70%, 50%)",
                "kebab": 14,
                "kebabColor": "hsl(281, 70%, 50%)",
                "fries": 102,
                "friesColor": "hsl(305, 70%, 50%)",
                "donut": 41,
                "donutColor": "hsl(62, 70%, 50%)"
            },
            {
                "country": "AL",
                "hot dog": 124,
                "hot dogColor": "hsl(293, 70%, 50%)",
                "burger": 87,
                "burgerColor": "hsl(29, 70%, 50%)",
                "sandwich": 2,
                "sandwichColor": "hsl(52, 70%, 50%)",
                "kebab": 168,
                "kebabColor": "hsl(60, 70%, 50%)",
                "fries": 136,
                "friesColor": "hsl(54, 70%, 50%)",
                "donut": 177,
                "donutColor": "hsl(318, 70%, 50%)"
            },
            {
                "country": "AM",
                "hot dog": 129,
                "hot dogColor": "hsl(295, 70%, 50%)",
                "burger": 196,
                "burgerColor": "hsl(247, 70%, 50%)",
                "sandwich": 81,
                "sandwichColor": "hsl(141, 70%, 50%)",
                "kebab": 148,
                "kebabColor": "hsl(214, 70%, 50%)",
                "fries": 87,
                "friesColor": "hsl(272, 70%, 50%)",
                "donut": 140,
                "donutColor": "hsl(71, 70%, 50%)"
            }
        ];
        return React.createElement(bar_1.ResponsiveBar, { data: data, keys: ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'], indexBy: "country", margin: { top: 50, right: 130, bottom: 50, left: 60 }, padding: 0.3, colors: { scheme: 'nivo' }, defs: [
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ], fill: [
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ], axisTop: null, axisRight: null, axisBottom: {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32
            }, axisLeft: {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40
            }, labelSkipWidth: 12, labelSkipHeight: 12, labelTextColor: { from: 'color', modifiers: [['darker', 1.6]] }, legends: [
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ], animate: true, motionStiffness: 90, motionDamping: 15 });
    }
}
exports.default = BarGraph;


/***/ }),

/***/ "./src/components/charts/Graph.tsx":
/*!*****************************************!*\
  !*** ./src/components/charts/Graph.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const line_1 = __webpack_require__(/*! @nivo/line */ "./node_modules/@nivo/line/dist/nivo-line.esm.js");
class Graph extends React.Component {
    render() {
        let lineData = [];
        for (let [car, data] of this.props.data.entries()) {
            lineData.push({
                id: car,
                data: data
            });
        }
        return React.createElement(line_1.ResponsiveLine, { data: lineData, margin: {
                top: 50,
                right: 200,
                bottom: 50,
                left: 50
            }, axisRight: null, axisTop: null, axisBottom: {
                legend: "Months"
            }, axisLeft: {
                legend: "Cost"
            }, curve: "linear", xScale: { type: 'linear' }, yScale: {
                type: 'linear',
                stacked: false
            }, enableSlices: "x", legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ] });
    }
}
exports.default = Graph;


/***/ }),

/***/ "./src/components/charts/MileageChanger.tsx":
/*!**************************************************!*\
  !*** ./src/components/charts/MileageChanger.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
class MileageChangerProps {
}
class MileageChanger extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const mileage = event.target.value;
        this.props.updateMileage(mileage);
    }
    render() {
        return React.createElement("form", null,
            React.createElement("input", { className: "form-control", name: "Mileage", id: "mileage", min: "0", max: "100000", type: "range", value: this.props.mileage, onChange: this.handleChange }),
            React.createElement("label", { htmlFor: "mileage", className: "col-sm col-form-label" },
                React.createElement("b", null, "Miles Per: "),
                "Year: ",
                this.props.mileage,
                " \u00A0 Month: ",
                Math.round(this.props.mileage / 12),
                " \u00A0 Day: ",
                Math.round(this.props.mileage / 365)));
    }
}
exports.default = MileageChanger;


/***/ }),

/***/ "./src/components/charts/MonthChanger.tsx":
/*!************************************************!*\
  !*** ./src/components/charts/MonthChanger.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
class MonthChanger extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const months = event.target.value;
        this.props.updateMonths(months);
    }
    render() {
        return React.createElement("form", null,
            React.createElement("input", { className: "form-control", name: "Months", id: "months", min: "0", step: "1", type: "number", value: this.props.months, onChange: this.handleChange }),
            React.createElement("label", { htmlFor: "months", className: "col-sm col-form-label" },
                React.createElement("b", null, "Months to Show")));
    }
}
exports.default = MonthChanger;


/***/ }),

/***/ "./src/components/helpers.tsx":
/*!************************************!*\
  !*** ./src/components/helpers.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function range(lo, hi) {
    let ret = [];
    for (let i = lo; i < hi; i++) {
        ret.push(i);
    }
    return ret;
}
exports.range = range;
function money(dollars) {
    // Given a number, format it with a dollar symbol
    return '$' + dollars.toFixed(2);
}
exports.money = money;
// Return a JSON representation of a JavaScript map
function jsonifyMap(data) {
    let mapData = {};
    for (var [k, v] of data) {
        mapData[k] = v;
    }
    return mapData;
}
exports.jsonifyMap = jsonifyMap;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
const Globals = __webpack_require__(/*! ./components/Globals */ "./src/components/Globals.tsx");
const AutoCostCalculator_1 = __webpack_require__(/*! ./components/AutoCostCalculator */ "./src/components/AutoCostCalculator.tsx");
let defaults = (new Globals.Defaults());
let savedData = localStorage.getItem('autoCostData');
let carDb = defaults.cars();
let ppg = defaults.ppg();
if (savedData != null) {
    savedData = JSON.parse(savedData);
    carDb.removeAll();
    carDb.load(savedData['data']);
    ppg.load(savedData['ppg']);
}
ReactDOM.render(React.createElement(AutoCostCalculator_1.AutoCostCalculator, { data: carDb, ppg: ppg }), document.getElementById('root'));


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map