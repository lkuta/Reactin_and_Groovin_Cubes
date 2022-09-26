import React, { useRef, useState, useEffect, Component } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';

//var x = 20;
//var y = 30;

async function postX(x) {
    //event.preventDefault();
    console.log("Sending: " + x);
    const send = await fetch("https://j8zwyrwj3b.execute-api.us-east-1.amazonaws.com/dev/position/x", {method: "POST", body: x});
    const text = await send.text();
    console.log("Received (postX): " + text);
}

async function postY(y) {
    //event.preventDefault();
    console.log("Sending: " + y);
    const send = await fetch("https://j8zwyrwj3b.execute-api.us-east-1.amazonaws.com/dev/position/y", {method: "POST", body: y});
    const text = await send.text();
    console.log("Received (posty): " + text);
}

async function getPosition() {
  const response = await fetch("https://j8zwyrwj3b.execute-api.us-east-1.amazonaws.com/dev/position");
  const text = await response.text();
  console.log("Received (getPos: " + text);
  return JSON.parse(text);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 function App({}){
    const canvas = useRef();
    //const [ctx, setCtx] = useState(null); //canvas.current.getContext("2d"));
    const ctx = useRef()
    /*
    //const [dimensions, setDim] = useState({ x:20, y:30, w:100, h:50});
    const [x, setX] = useState(20);
    const [y, setY] = useState(30);
    const xRef = useRef({})
    xRef.current = x
    const yRef = useRef({})
    yRef.current = y
    */
    const [x, setX] = useState(80);
    const [y, setY] = useState(80);
    //let x = useRef(20)
    //let y = useRef(30)
    const [toggle, setToggle] = useState(false)


    function increment(x){
        return x + 10;
    }

    function decrement(x) {
        return x - 10;  
    }

    const actionXMap = {
        ArrowLeft: decrement,
        ArrowRight: increment
    }
    const actionYMap = {
        ArrowDown: increment,
        ArrowUp: decrement
    }



    useEffect(() => {
        async function handleKeyPress(e){
        console.log(e.key)
        const actionX = actionXMap[e.key];
        const actionY = actionYMap[e.key];
        ///actionX && setX(actionX);
        ///actionY && setY(actionY);
        if (actionX){
            console.log("Before setX: " + x)
            //setX(actionX)
            console.log("After setX: " + [x])
            postX(actionX(x))
            //x.current = actionX(x.current)
        }
        if (actionY){
            console.log("Before setY: " + [y])
            setY(actionY)
            console.log("After setY: " + [y])
            postY(y)
            //y.current = actionY(y.current)
        }
        if (actionX || actionY){
            console.log(toggle)
            setToggle(!toggle)
        }

        await sleep(100)
        let value = await getPosition()
        setY(value[1])
        setX(value[0])
        //console.log(x.current + ", " + y.current)
        console.log(x + ", " + y)
    }
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, );

   // useEffect(() => {
     //  document.addEventListener("keydown", handleKeyPress);
    //},/ []);

    console.log("Here in App");

    useEffect (() => {
        const canvasEle = canvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;
        //setCtx(canvasEle.getContext("2d"))
        ctx.current = canvasEle.getContext("2d")
    }, [x, y]);

    useEffect (() => {
        //const r1Info = { x:20, y:30, w:100, h:50};
        //console.log(dimensions);
        const r1Style = {borderColor: 'blue', borderWidth: 10, backgroundColor: 'green'};
        drawRect(x, y, r1Style);
    }, [x, y]);

    const drawRect = (x, y, style = {}) => {
        const w = 100;
        const h = 50;
        const {borderColor = 'black', borderWidth = 1, backgroundColor = 'black'} = style;

        ctx.current.beginPath();
        ctx.current.strokeStyle = borderColor;
        ctx.current.lineWidth = borderWidth;
        ctx.current.fillStyle = backgroundColor;

        ctx.current.fillRect(x, y, w, h);
        ctx.current.rect(x, y, w, h);
        ctx.current.stroke();  
    }

    const modifyInfo = () => {
        console.log("here");
        //setDim({x:120, y:0, w:20, h:1302});
        //drawRect(r1Info);
    }

    return (
        <div className="App">
            <h3> Drawing a Rectangle </h3>
            <canvas ref={canvas} name={x} id={y}></canvas>
        </div>
    );
}

export default App;
//ReactDOM.render(<Board />, document.getElementById('app'));