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

  render() {
    const { profile, imgProp = 'pct_inst_img', theme = 'light' } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 12 }}>Not available at this time... </div>
      );
    }
    if (profile[imgProp] && profile[imgProp].url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-12' : 'react-components-show-url btn btn-sm btn-warning font-12';
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

    const fontColor = theme === 'light' ? '#444444' : '#dddddd';
    const dataColor = theme === 'light' ? 'rgba(44, 180, 33, 0.3)' : 'rgba(44, 180, 33, 0.5)';
    const dataColor2 = theme === 'light' ? 'rgba(46, 134, 193, 0.3)' : 'rgba(46, 134, 193, 0.5)';
    const gridColor = theme === 'light' ? 'rgba(80, 80, 80, 0.1)' : 'rgba(255, 255, 255, 0.2)';

    const data1 = {
      // labels: percent_institutions_ts.map(d => dayjs.utc(d.ts).format('YYYYMM')),
      labels: percent_institutions_ts.map(d => dayjs(d.ts).format('YYYYMM')),
      datasets: [{
        borderCapStyle: 'butt',
        pointBorderWidth: 1,
        type: 'line',
        fill: true,
        backgroundColor: dataColor,
        lineTension: 0.3,
        borderWidth: 1,
        pointRadius: 3,
        pointHoverRadius: 2,
        data: percent_institutions,
        label: 'Percent of Institution Owned'
      }]
    };
    const data2 = {
      // labels: percent_institutions_ts.map(d => dayjs.utc(d.ts).format('YYYYMM')),
      labels: percent_institutions_ts.map(d => dayjs(d.ts).format('YYYYMM')),
      datasets: [{
        borderCapStyle: 'butt',
        pointBorderWidth: 1,
        type: 'line',
        fill: true,
        backgroundColor: dataColor2,
        lineTension: 0.3,
        borderWidth: 1,
        pointRadius: 3,
        pointHoverRadius: 2,
        data: percent_insider,
        label: 'Percent of Insider Owned'
      }]
    };

    const options1 = {
      legend: {
        labels: {
          fontSize: 12,
          fontColor,
          boxWidth: 10,
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 12,
            fontColor,
          },
          gridLines: {
            color: gridColor
          },
          barPercentage: 0.4
        }],
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: '1',
          labels: {
            show: true
          },
          gridLines: {
            color: gridColor
          },
          ticks: {
            fontSize: 12,
            stepSize: Math.max(...percent_institutions) > 50 ? undefined : 0.1,
            fontColor,
          },
        }]
      },
    };
    const options2 = {
      legend: {
        labels: {
          fontSize: 12,
          fontColor,
          boxWidth: 10,
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 12,
            fontColor,
          },
          gridLines: {
            color: gridColor
          },
          barPercentage: 0.4
        }],
        yAxes: [{
          type: 'linear',
          display: true,
          labels: {
            show: true
          },
          gridLines: {
            color: gridColor
          },
          ticks: {
            fontSize: 12,
            stepSize: Math.max(...percent_insider) > 50 ? undefined : 0.1,
            fontColor,
          },
        }]
      },
    };

    return (
      <div style={{ width: '100%', padding: 5, fontSize: 12 }}>
        <div className={`theme-darkred-${theme}`} style={{ fontWeight: 'bold' }}>{profile.ticker} - {profile.name}&nbsp;<span className={`theme-green-${theme}`}>Ownership Analysis</span></div>
        <Bar data={data1} height={150} options={options1} />
        <Bar data={data2} height={150} options={options2} />
        <div style={{ fontSize: 12, padding: 5, paddingTop: 2 }}>Crafted by <a href='https://twitter.com/tradeideashq' target='_blank' className={`theme-darkred-${theme}`}>@tradeideashq</a> with <span style={{ fontSize: 16, color: 'red' }}>💡</span></div>
      </div>
    );
  }
}

export default NumberOfEmployees;
