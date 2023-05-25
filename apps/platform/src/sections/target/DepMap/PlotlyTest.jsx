import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class PlotlyTest extends Component {
    render(){
        const { data } = this.props;
        console.log('test data:', data);
        // const trace1 = {
        //     x: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25],
        //     type: 'box',
        //     name: 'All Points',
        //     jitter: 0.3,
        //     pointpos: -1.8,
        //     marker: {
        //       color: 'rgb(7,40,89)'
        //     },
        //     boxpoints: 'all'
        //   };

        const depMapEssentiality = data.map(d => ({
            x: d.screens.map(s => s.geneEffect),
            // x0: -1,
            hovertext: d.screens.map(s => `id:${s.diseaseCellLineId} exp:${s.expression}`),
            type: 'box',
            name: d.tissueName,
            mode: 'markers',
            // jitter: 0.3,
            // pointpos: -1.8,
            marker: {
              color: '#3589CA',
              size: d.screens.map(s => (s.expression+1)*2), //not working for boxplot
              opacity: 0.5,
              showscale: true,
            },
            boxpoints: 'all',
            // line: {
            //     color: '#F00',
            // },
            legendgrouptitle: {
                text: 'legend title',
            },
            showlegend: true,
            // legendwidth: 900, // not working?

        }));

        return (
            <Plot
            data = {depMapEssentiality}
            layout={ {
                width: 1000, //window.innerWidth, 
                height: (28*50), 
                title: 'DepMapEssentiality',
                // annotations: data.map(d => ({
                //     text: 'alse',
                // })),
                autosize: true,
                yaxis:{
                    automargin: 'width',
                },
                shapes: [{
                    // draw the reference line at -1
                    'type': 'line',
                    'x0': -1,
                    'y0': -.5,
                    'x1': -1,
                    'y1': depMapEssentiality.length-.5,
                    'line': {
                      'color': '#f00',
                      'width': 1,
                    //   'dash': 'dashdot'
                    }
                  }],
                legend: {
                    bgcolor: '#0f0',
                    entrywidth: 300,
                }
            } }
        />
        );
    }
}
export default PlotlyTest;