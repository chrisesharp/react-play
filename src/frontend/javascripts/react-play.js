'use strict';

const Eyes = ({ onClick , curX, curY, rot}) => {
    const r = Math.round(Math.sqrt(Math.pow(curX,2)+Math.pow(curY,2)));
    const adjust = rot * (Math.PI/180);
    const angle = Math.atan2(curY, curX) - adjust;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    return (
        <g onClick={onClick}>
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
    }

    render() {
        const x = Math.max(-3, Math.min(3, Math.round((this.props.curX - this.props.x)/10)));
        const y = Math.max(-3, Math.min(3, Math.round((this.props.curY - this.props.y)/10)));
        return (
        <g>
        <g transform={`translate(${this.props.x}, ${this.props.y}) rotate(${this.props.angle})`}>
            <Body colour={this.props.colour} />
            <Eyes onClick={this.props.onClick} curX={x} curY={y} rot={this.props.angle}/>
        </g>
        </g>
        );
    }
}

class Ghosts extends React.Component {
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
            <div className="Ghosts">
                <svg viewBox="0 0 100 100" style={{ width: 100, height: 100 }} onMouseMove={this._onMouseMove.bind(this)}>
                    <Ghost x={30} y={20} colour="blue" angle={this.state.angle} curX={this.state.curX} curY={this.state.curY} onClick={() => alert("hi")} />
                    <Ghost x={70} y={35} colour="red" angle={this.state.angle} curX={this.state.curX} curY={this.state.curY} onClick={() => alert("hello")} />
                </svg>
            </div>
        );
    }
}


let domContainer = document.querySelector('#react_container');
ReactDOM.render(<Ghosts/>, domContainer);