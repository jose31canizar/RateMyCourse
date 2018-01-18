import React, { Component } from 'react';
import * as d3 from 'd3';
import Faux from 'react-faux-dom';
import './Graph.styl'

const color = 'white'
const bgColor = 'white'

class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: document.body.clientWidth,
      height: Math.max(document.body.clientHeight, window.innerHeight || 0),
      chart: 'loading ....'
    }
  }
  componentDidMount() {
    const w = Math.max(document.body.clientWidth, window.innerWidth || 0)
    const h = Math.max(document.body.clientHeight, window.innerHeight || 0)
    window.addEventListener('resize', () => {
      const w = Math.max(document.body.clientWidth, window.innerWidth || 0)
      const h = Math.max(document.body.clientHeight, window.innerHeight || 0)
      this.setState({
        width: w,
        height: h
      })
    })
    this.setState({
      width: w,
      height: h
    })
    this.updateGraph(this.props.data)
  }
  updateGraph(data) {
    data = Array(this.props.labels.length).fill(10)
    function arcTween(newAngle) {
      return function(d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      };
    };

    // var palette = ['#edc2c2','#D2BBA0','#F8FCDA','#edc2c2','#D5896F','#A49E8D','#7A5C58','#969A97', '#D2BBA0', '#edc2c2'];


    const labels = this.props.labels

    //Width and height
    // var w = 500;
    // var h = 500;
    var w = this.state.width
    var h = 200

    const faux = new Faux.Element('div');

      var svg = d3.select(faux)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .classed('d3-container', true);

      var r = 10;

      var markers = svg.selectAll("g")
       .data(data)
       .enter()
       .append("g")

       var self = this

       markers
       .append('rect')
       .classed("linear-rect", true)
       .attr("x", w / 2)
       .attr("y", 135.5)
       .attr("rx", '4')
       .attr("ry", '4')
       .attr("stroke", function(d, i) {
         return 'white';
       })
       .attr("fill", function(d, i) {
         return 'white';
       })
       .attr("width", function(d, i) {
         return '1.0';
       })
      .attr("height", function(d, i) {
        return d*2;
      })
       .attr('transform', function(d, i){
         return 'translate(0, 0) rotate(' + (i*(360.0/data.length) - 25) + ' ' + w/2 + ' ' + h/2 + ')';
       })

       markers
       .append('text')
       .html(function(d, i) {
         return labels[i];
       })
       .attr("x", function(d, i) {
         const angle = (i*(360.0/data.length) + 4) * (Math.PI / 180);
         const pos = (10)*(Math.cos(angle)) + h*(Math.sin(angle))
         return pos/2.3 + w/2 - 15
       })
       .attr("y", function(d, i) {
         const angle = (i*(360.0/data.length) + 4) * (Math.PI / 180);
         const pos =  -(10)*(Math.sin(angle)) + h*(Math.cos(angle))
         return -pos/2.8 + h/2 + 10
       })
       .attr('font-family', 'Futura')
       .attr('font-size', '1em')
       .attr('fill', 'white')




       //
      //  function X(d, i) {
      //    const inc = 360.0/data.length;
      //    const rad = Math.PI/180.0;
      //    const x = d*Math.sin(i * inc * rad);
      //    return x;
      //  }
       //
      //  function Y(d, i) {
      //    const inc = 360.0/data.length;
      //    const rad = Math.PI/180.0;
      //    const y = d*Math.cos(i * inc * rad);
      //    return y;
      //  }
       //
      //  data = data.map((d, i) => {
      //    const x = X(d, i);
      //    const y = Y(d, i);
      //    return {x,y};
      //  })
       //
       //
       //
      //  var newRects = svg.selectAll("g")
      //   .data(data)
      //   .enter()
      //   .append("g");
       //
      //   var self = this;





      // var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
      var tau = (this.props.amount)/0.954929

      var arc = d3.arc()
      .innerRadius(35)
      .outerRadius(40)
      .startAngle(0);

      var width = +svg.attr("width"),
      height = +svg.attr("height"),
      g = svg.append("g").attr("transform", "translate(" + w / 2 + "," + 100 + ")");


      var background = g.append("path")

      .datum({endAngle: tau})
      .style("fill", color)
      .classed('shell', true)
      .attr("d", arc);

      // var foreground = g.append("path")
      // .datum({endAngle: 0.227 * tau})
      // .style("fill", bgColor)
      // .classed('shell', true)
      // .attr('stroke', bgColor)
      // .attr("d", arc);

      var graphLabels = svg.selectAll("g")
       .data(data)
       .enter()
       .append("g")

      graphLabels
      .append("g")
      .classed("text-group", true)
      // .attr('transform', function(d, i){
      //   return 'translate(0, 50) rotate(' + (i*(360.0/data.length) - 25) + ' 250 200)';
      // })
      // .attr('transform', function(d, i){
      //   return 'translate(' + (250 - 7.5*d.x) + ',' + (250 + 7.5*d.y) + ')';
      // })
      .append('text')
      .html(function(d, i) {
        return labels[i];
      })
      .attr('font-family', 'Futura')
      .attr('font-size', '15px')
      .attr('fill', 'white')

      // .on('mouseover', function(d, i){
      //   return this.hoverHandler(i);
      // })
      // .on('mouseout', function(d, i){
      //   return this.hoverHandler(i);
      // });






      const finalChart = faux.toReact();
      this.setState({
        chart: finalChart
      })
  }
  componentWillReceiveProps(newProps) {
    this.updateGraph(newProps.data)
  }
  render(){
    return (
        <div className='graph'>
          {this.state.chart}
        </div>
    );
  }
}

export default Graph;
