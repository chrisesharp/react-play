'use strict';

const Eyes = ({ targetX, targetY, rot}) => {
    const r = Math.round(Math.sqrt(Math.pow(targetX,2)+Math.pow(targetY,2)));
    const adjust = rot * (Math.PI/180);
    const theta = Math.atan2(targetY, targetX) - adjust;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    return (
        <g>
            <circle cx="-5" cy="0" r={4} fill="white" />
            <circle cx="5" cy="0" r={4} fill="white" />
            <g>
                <circle cx={x-5} cy={y} r={2} fill="black" />
                <circle cx={x+5} cy={y} r={2} fill="black" />
            </g>
        </g>
    );
}
  
const Body = ({ colour }) => {
    return (
    <g>
        <circle cx={0} cy={0} r={10} fill={colour} />
        <rect x={-10} y={0} width={20} height={10} fill={colour} />
        <path d={`M-10,9 H10 V15 L5,10 L0,15 L-5,10 L-10,15 Z`} fill={colour} />
    </g>
    );
}

class Ghost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            200
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState((state, props) => ({
            x: state.x + Math.sign(props.curX - state.x)*3,
            y: state.y + Math.sign(props.curY - state.y)*3
        }));
    }

    render() {
        const x = Math.max(-3, Math.min(3, Math.round((this.props.curX - this.state.x)/10)));
        const y = Math.max(-3, Math.min(3, Math.round((this.props.curY - this.state.y)/10)));
        return (
        <g>
        <g transform={`translate(${this.state.x}, ${this.state.y}) rotate(${this.props.angle})`}>
            <Body colour={this.props.colour} />
            <Eyes targetX={x} targetY={y} rot={this.props.angle}/>
        </g>
        </g>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            curX: 0,
            curY: 0
        };
    }

    _onMouseMove(e) {
        this.setState({ curX: e.nativeEvent.offsetX, curY: e.nativeEvent.offsetY });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            200
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState((state, props) => ({
            angle: (state.angle + 10) % 360
        }));
    }

    render() {
        return (
            <div className="Game" style={{ width: 600, height: 400 }} >
                <svg viewBox="0 0 600 400" style={{ width: 600, height: 400 }} onMouseMove={this._onMouseMove.bind(this)}>
                    <Ghost x={30} y={20} colour="blue" angle={this.state.angle} curX={this.state.curX} curY={this.state.curY}/>
                    <Ghost x={70} y={35} colour="red" angle={this.state.angle} curX={this.state.curX} curY={this.state.curY}/>
                </svg>
            </div>
        );
    }
}


let domContainer = document.querySelector('#react_container');
ReactDOM.render(<Game/>, domContainer);