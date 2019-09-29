import React, { Component } from 'react';
import './Demo.less';

class Demo extends Component {
  componentDidMount() {
    // 兼容ie浏览器 document.body.clientWidth           
    var baseWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var baseHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var canvas = document.querySelector('.img1');
    var canvasW = canvas.clientWidth;
    var canvasH = canvas.clientHeight;
    console.log(baseWidth, baseHeight, canvasW, canvasH)
    var ss;
    // var ml;
    // var mt;


    // if (baseWidth < baseHeight) {
    //   ss = baseWidth / canvasW;
    //   canvas.style.width = baseWidth + 'px';
    //   canvas.style.height = canvasH * ss + 'px';
    // } else {
    //   ss = baseHeight / canvasH;
    //   canvas.style.height = baseHeight + 'px';
    //   canvas.style.width = canvasW * ss + 'px';
    // }



    if (baseWidth < baseHeight) {
      // ss = baseWidth / canvasW;
      ss = baseWidth / canvasW;
      canvas.style.transform = `scale(${ss},${ss})`;
      // canvas.style.left = '0';
      // canvas.style.top = '0';
      // ml = canvas.clientWidth * ss * 0.5;
      // mt = canvas.clientHeight * ss * 0.5;
      // canvas.style.left = 0 - ml + 'px';
      // canvas.style.top = 0 - mt + 'px';
    } else {
      // ss = baseHeight / canvasH;
      ss = baseHeight / canvasH;
      canvas.style.transform = `scale(${ss},${ss})`;
      // ml = canvas.clientWidth * ss * 0.5;
      // mt = canvas.clientHeight * ss * 0.5;
      // canvas.style.left = 0 - ml + 'px';
      // canvas.style.top = 0 - mt + 'px';
      // canvas.style.top = '0';
    }
    console.log(canvas.offsetLeft, canvas.clientWidth, canvas.clientHeight, ss)
  }
  render() {
    return (
      <div className="canvas">
        <div className="img1"></div>
      </div>
    );
  }
}

export default Demo;