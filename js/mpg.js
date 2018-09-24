var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var miles = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];

var GraphGenerator = function (_React$Component) {
    _inherits(GraphGenerator, _React$Component);

    function GraphGenerator() {
        _classCallCheck(this, GraphGenerator);

        return _possibleConstructorReturn(this, (GraphGenerator.__proto__ || Object.getPrototypeOf(GraphGenerator)).apply(this, arguments));
    }

    _createClass(GraphGenerator, [{
        key: 'render',
        value: function render() {
            c3.generate({
                bindto: '#chart',
                data: this.props.data,
                axis: {
                    x: {
                        label: 'Miles Driven'
                    },
                    y: {
                        label: 'Cost'
                    }
                }
            });

            return null;
        }
    }]);

    return GraphGenerator;
}(React.Component);

var Graph = function (_React$Component2) {
    _inherits(Graph, _React$Component2);

    function Graph() {
        _classCallCheck(this, Graph);

        return _possibleConstructorReturn(this, (Graph.__proto__ || Object.getPrototypeOf(Graph)).apply(this, arguments));
    }

    _createClass(Graph, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // Force a render() call which will allow chart to show up
            // Without this, react will call c3.generate() before #chart has been created,
            // meaning that there is no HTML dom element to bind graph to, so it won't show.
            this.setState({});
        }
    }, {
        key: 'makeData',
        value: function makeData(data) {
            // Process car data and generate cost of ownership
            var temp = {
                x: 'x', // Mile increments
                columns: [['x'].concat(miles)]
            };

            for (var i in data) {
                var cost = [data[i].name];

                // Cost of car at miles[j] miles
                // parseFloat() needed to avoid string errors
                for (var j in miles) {
                    console.log(data);
                    cost.push(parseFloat(data[i].price) + miles[j] * 1000 / parseFloat(data[i].mpg) * parseFloat(this.props.ppg));
                }

                temp.columns.push(cost);
            }

            return temp;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'col' },
                React.createElement('div', { id: 'chart' }),
                React.createElement(GraphGenerator, { renderNow: this.props.mounted, data: this.makeData(this.props.data) })
            );
        }
    }]);

    return Graph;
}(React.Component);

function CarListing(props) {
    return React.createElement(
        'li',
        { className: 'list-group-item' },
        props.car.name,
        React.createElement(
            'a',
            { onClick: props.onClick },
            '[Remove]'
        )
    );
}

var CarList = function (_React$Component3) {
    _inherits(CarList, _React$Component3);

    function CarList() {
        _classCallCheck(this, CarList);

        return _possibleConstructorReturn(this, (CarList.__proto__ || Object.getPrototypeOf(CarList)).apply(this, arguments));
    }

    _createClass(CarList, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'ul',
                    { className: 'list-group' },
                    this.props.data.map(function (i) {
                        return React.createElement(CarListing, { car: i, onClick: _this4.props.removeCar.bind(_this4, i.name) });
                    })
                )
            );
        }
    }]);

    return CarList;
}(React.Component);

var TextInput = function (_React$Component4) {
    _inherits(TextInput, _React$Component4);

    function TextInput(props) {
        _classCallCheck(this, TextInput);

        var _this5 = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

        _this5.state = {
            error_message: ''
        };

        _this5.onChange = _this5.onChange.bind(_this5);
        return _this5;
    }

    _createClass(TextInput, [{
        key: 'onChange',
        value: function onChange(event) {
            // Perform validation (if there was a validator function)
            if ('validator' in this.props) {
                if (this.props.validator(event.target.value)) {
                    // Call original onChange event
                    this.props.onChange(event);
                    this.setState({
                        error_message: ''
                    });
                } else {
                    this.setState({
                        error_message: 'Please enter a valid input'
                    });
                }
            } else {
                this.props.onChange(event);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'label',
                null,
                this.props.name,
                React.createElement('input', { type: 'text', value: this.props.text, onChange: this.onChange }),
                this.state.error_message
            );
        }
    }]);

    return TextInput;
}(React.Component);

var CarAdder = function (_React$Component5) {
    _inherits(CarAdder, _React$Component5);

    function CarAdder(props) {
        _classCallCheck(this, CarAdder);

        // Default values for new cars
        var _this6 = _possibleConstructorReturn(this, (CarAdder.__proto__ || Object.getPrototypeOf(CarAdder)).call(this, props));

        _this6.state = {
            'name': null,
            'mpg': null,
            'price': 0
        };

        _this6.handleChange = _this6.handleChange.bind(_this6);
        _this6.handleSubmit = _this6.handleSubmit.bind(_this6);
        _this6.addCar = _this6.addCar.bind(_this6);
        return _this6;
    }

    _createClass(CarAdder, [{
        key: 'addCar',
        value: function addCar(state) {
            this.props.addCar(state);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            var temp = this.state;
            var key = event.target.id;
            temp[key] = event.target.value;

            this.setState(temp);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            this.addCar(this.state);
            event.preventDefault(); // Stop reloading page
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h3',
                    null,
                    'Add a Vehicle'
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            null,
                            'Name',
                            React.createElement('input', { className: 'form-control', name: 'Name', id: 'name', onChange: this.handleChange })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            null,
                            'Price',
                            React.createElement('input', { className: 'form-control', name: 'Price', id: 'price', onChange: this.handleChange })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            null,
                            'MPG',
                            React.createElement('input', { className: 'form-control', type: 'number', name: 'MPG', id: 'mpg', onChange: this.handleChange })
                        )
                    ),
                    React.createElement(
                        'button',
                        { type: 'submit', className: 'btn btn-primary' },
                        'Add'
                    )
                )
            );
        }
    }]);

    return CarAdder;
}(React.Component);

function assertNumeric(value) {
    return !isNaN(value);
}

function GasPrice(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h2',
            null,
            'Price of Gas'
        ),
        React.createElement(TextInput, { name: 'Price', text: props.ppg, validator: assertNumeric, onChange: props.onChange })
    );
}

var MpgCalculator = function (_React$Component6) {
    _inherits(MpgCalculator, _React$Component6);

    function MpgCalculator(props) {
        _classCallCheck(this, MpgCalculator);

        var _this7 = _possibleConstructorReturn(this, (MpgCalculator.__proto__ || Object.getPrototypeOf(MpgCalculator)).call(this, props));

        _this7.state = {
            data: props.data,
            ppg: 3
        };

        _this7.updateGasPrice = _this7.updateGasPrice.bind(_this7);
        _this7.addCar = _this7.addCar.bind(_this7);
        _this7.removeCar = _this7.removeCar.bind(_this7);
        return _this7;
    }

    _createClass(MpgCalculator, [{
        key: 'updateGasPrice',
        value: function updateGasPrice(event) {
            this.setState({
                ppg: event.target.value
            });
        }
    }, {
        key: 'addCar',
        value: function addCar(data) {
            // Add car listing        

            var temp = this.state.data;
            temp.push(data);

            this.setState({
                data: temp
            });
        }
    }, {
        key: 'removeCar',
        value: function removeCar(name) {
            // Remove car listings by name
            var temp = [];

            for (var j in this.state.data) {
                if (name != this.state.data[j].name) {
                    temp.push(this.state.data[j]);
                }
            }

            this.setState({
                data: temp
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'container-fluid' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(Graph, { data: this.state.data, ppg: this.state.ppg }),
                    React.createElement(
                        'div',
                        { className: 'col' },
                        React.createElement(
                            'h2',
                            null,
                            'Vehicles'
                        ),
                        React.createElement(CarList, { data: this.state.data, removeCar: this.removeCar }),
                        React.createElement(CarAdder, { addCar: this.addCar })
                    )
                ),
                React.createElement(GasPrice, { ppg: this.state.ppg, onChange: this.updateGasPrice })
            );
        }
    }]);

    return MpgCalculator;
}(React.Component);

var cars = [{
    'name': 'Car 1',
    'mpg': 40,
    'price': 0
}, {
    'name': 'Car 2',
    'mpg': 15,
    'price': 0
}];

ReactDOM.render(React.createElement(MpgCalculator, { data: cars }), document.getElementById('root'));