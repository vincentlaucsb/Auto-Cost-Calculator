var miles = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];

class GraphGenerator extends React.Component {
    render() {
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
}

class Graph extends React.Component {
    componentDidMount() {
        // Force a render() call which will allow chart to show up
        // Without this, react will call c3.generate() before #chart has been created,
        // meaning that there is no HTML dom element to bind graph to, so it won't show.
        this.setState({});
    }
    
    makeData(data) {
        // Process car data and generate cost of ownership
        var temp = {
            x: 'x', // Mile increments
            columns: [
                ['x'].concat(miles),
            ]
        };
        
        for (var i in data) {
            var cost = [
                data[i].name
            ];
            
            // Cost of car at miles[j] miles
            // parseFloat() needed to avoid string errors
            for (var j in miles) {
                console.log(data);
                cost.push(
                    parseFloat(data[i].price) +
                    ((miles[j] * 1000)/parseFloat(data[i].mpg) * parseFloat(this.props.ppg))
                );
            }
            
            temp.columns.push(cost);
        }
        
        return temp;
    }
    
    render() {
        return <div className="col">
            <div id="chart"></div>
            <GraphGenerator renderNow={this.props.mounted} data={this.makeData(this.props.data)} />
        </div>
    }
}

function CarListing(props) {
    return (<li className="list-group-item">
    {props.car.name} 
    <a onClick={props.onClick}>[Remove]</a>
    </li>);
}

class CarList extends React.Component {
    render() {
        return <div>
            <ul className="list-group">
            { this.props.data.map((i) => <CarListing car={i} onClick={this.props.removeCar.bind(this, i.name)} />)}
            </ul>
        </div>
    }
}

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            error_message: ''
        };
        
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(event) {
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
    
    render() {
        return <label>
            {this.props.name}
            <input type="text" value={this.props.text} onChange={this.onChange}></input>
                {this.state.error_message}
        </label>
    }
}

class CarAdder extends React.Component {
    constructor(props) {
        super(props);
        
        // Default values for new cars
        this.state = {
            'name': null,
            'mpg': null,
            'price': 0
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCar = this.addCar.bind(this);
    }
    
    addCar(state) {
        this.props.addCar(state);
    }
    
    handleChange(event) {
        var temp = this.state;
        var key = event.target.id;
        temp[key] = event.target.value;
        
        this.setState(temp);
    }
    
    handleSubmit(event) {
        this.addCar(this.state);
        event.preventDefault(); // Stop reloading page
    }
    
    render() {
        return <div>
            <h3>Add a Vehicle</h3>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Name
                        <input className="form-control" name="Name" id="name" onChange={this.handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Price
                        <input className="form-control" name="Price" id="price" onChange={this.handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>MPG
                        <input className="form-control" type="number" name="MPG" id="mpg" onChange={this.handleChange} />
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    }
}

function assertNumeric(value) {
    return !isNaN(value);
}

function GasPrice(props) {
    return (
        <div>
            <h2>Price of Gas</h2>
            <TextInput name="Price" text={props.ppg} validator={assertNumeric} onChange={props.onChange} />
        </div>
    );
}

class MpgCalculator extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: props.data,
            ppg: 3
        };
        
        this.updateGasPrice = this.updateGasPrice.bind(this);
        this.addCar = this.addCar.bind(this);
        this.removeCar = this.removeCar.bind(this);
    }
    
    updateGasPrice(event) {
        this.setState({
            ppg: event.target.value
        });
    }
    
    addCar(data) {
        // Add car listing        
        
        var temp = this.state.data;
        temp.push(data);
        
        this.setState({
            data: temp
        });
    }
    
    removeCar(name) {
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
    
    render() {
        return <div className="container-fluid">
            <div className="row">
                <Graph data={this.state.data} ppg={this.state.ppg} />
                <div className="col">
                    <h2>Vehicles</h2>
                    <CarList data={this.state.data} removeCar={this.removeCar} />
                    <CarAdder addCar={this.addCar} />
                </div>
            </div>
            <GasPrice ppg={this.state.ppg} onChange={this.updateGasPrice} />
        </div>
    }
}

var cars = [
    {
        'name': 'Car 1',
        'mpg': 40,
        'price': 0
    },
    {
        'name': 'Car 2',
        'mpg': 15,
        'price': 0
    }
];

ReactDOM.render(
    <MpgCalculator data={cars} />,
    document.getElementById('root')
);