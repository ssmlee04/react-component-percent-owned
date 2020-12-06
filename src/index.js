import React from "react";
import { Bar } from 'react-chartjs-2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
dayjs.extend(dayjsPluginUTC);

export class NumberOfEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { profile } = this.props;
    if (!profile) return true;
    if (nextState.copied) return true;
    if (profile.ticker !== nextProps.profile.ticker) return true;
    return false;
  }

  render() {
    const { profile, imgProp = 'pct_inst_img' } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 8 }}>Not available at this time... </div>
      );
    }
    if (profile[imgProp] && profile[imgProp].url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-8' : 'react-components-show-url btn btn-sm btn-warning font-8';
      const btnText = copied ? 'Copied' : 'Copy Img';
      return (
        <div className='react-components-show-button'>
          <img alt={`${profile.ticker} - ${profile.name} Employees and Productivity`} src={profile[imgProp].url} style={{ width: '100%' }} />
          <CopyToClipboard text={profile[imgProp].url || ''}
            onCopy={() => this.setState({ copied: true })}
          >
            <button className={btnClass} value={btnText}>{btnText}</button>
          </CopyToClipboard>
        </div>
      );
    }

    if (!profile || !profile.numbers || !profile.numbers.percent_institutions_ts) return null;
    if (!profile || !profile.numbers || !profile.numbers.percent_insider_ts) return null;
    const percent_institutions_ts = profile.numbers.percent_institutions_ts || [];
    const percent_insider_ts = profile.numbers.percent_insider_ts || [];
    const percent_institutions = percent_institutions_ts.map(d => d.v);
    const percent_insider = percent_insider_ts.map(d => d.v);
    const data = {
      labels: percent_institutions_ts.map(d => dayjs.utc(d.ts).format('YYYYMM')),
      datasets: [{
        yAxisID: '1',
        type: 'line',
        fill: false,
        backgroundColor: 'darkred',
        borderColor: 'darkred',
        lineTension: 0.5,
        borderWidth: 1,
        pointRadius: 2,
        pointHoverRadius: 2,
        data: percent_institutions,
        label: 'Percent of Institution Owned'
      }, {
        yAxisID: '2',
        type: 'line',
        fill: false,
        backgroundColor: 'darkgreen',
        borderColor: 'darkgreen',
        lineTension: 0.5,
        borderWidth: 1,
        pointRadius: 2,
        pointHoverRadius: 2,
        data: percent_insider,
        label: 'Percent of Insider Owned'
      }]
    };
    const options = {
      legend: {
        labels: {
          fontSize: 8,
          boxWidth: 10,
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 8
          },
          barPercentage: 0.4
        }],
        yAxes: [{
                type: 'linear',
                display: true,
                position: 'left',
                id: '1',
                gridLines: {
                  display: false
                },
                labels: {
                  show: true
                },
                ticks: {
                  fontColor: 'darkred',
                  fontSize: 8,
                    callback: function(label, index, labels) {
                      return Math.floor(label);
                    }
                },
              },
              {
                type: 'linear',
                display: true,
                position: 'right',
                id: '2',
                labels: {
                  show: true
                },
                ticks: {
                  fontColor: 'darkgreen',
                  fontSize: 8,
                  // min: 0,
                  callback: function(label, index, labels) {
                    return Math.floor(label);
                  }
                },
              }]
      },
    };

    return (
      <div style={{ width: '100%', padding: 5, fontSize: 8 }}>
        <div style={{ color: 'darkred', fontWeight: 'bold' }}>{profile.ticker} - {profile.name} <span className='green'>Institutions / Insider Analysis</span></div>
        <Bar data={data} height={170} options={options} />
        <div style={{ fontSize: 8, color: 'gray' }}>Generated by <span style={{ color: 'darkred' }}>@earningsfly</span> with <span style={{ fontSize: 8, color: 'red' }}>🚀</span></div>
      </div>
    );
  }
}

export default NumberOfEmployees;
