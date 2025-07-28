// src/pages/Admin.js
import { useEffect, useState, useRef } from 'react';
import axiosInstance from '../api/axios';
import { Chart } from 'react-google-charts';
import '../components/TableStyles.css';
import logo from '../assets/main/logo.png';
import { useNotification } from '../context/NotificationContext';
import GlowContainer from '../components/GlowContainer';



const Admin = () => {

  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const { showNotification } = useNotification();
  
  useEffect(() => {

    if (localStorage.getItem("userRole") === "admin"&&
      localStorage.getItem("loginSuccess") === "true") 
      {
        showNotification("Dobro došao u admin mode! 👨‍💻");

        localStorage.removeItem("loginSuccess");
        
    }

    // Broj korisnika i proseci
    axiosInstance.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Greška pri učitavanju statistike:', err));

    // Linijski grafikon: logovi po danima
    axiosInstance.get('/admin/logs-chart')
      .then(res => {
        const formattedData = [['Datum', 'Broj logova']];
        res.data.forEach(entry => {
          const dateObj = new Date(entry.date);
          const formattedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${String(dateObj.getFullYear()).slice(-2)}`;
          formattedData.push([formattedDate, entry.count]);
        });
        setChartData(formattedData);
      })
      .catch(err => console.error('Greška pri učitavanju logova za chart:', err));

    // Pie Chart: tipovi uređaja
    axiosInstance.get('/admin/devices-by-type')
      .then(res => {
        const formattedPie = [['Tip uređaja', 'Ukupno']];
        res.data.forEach(item => {
          formattedPie.push([item.type || 'Nepoznato', item.count]);
        });
        setPieData(formattedPie);
      })
      .catch(err => console.error('Greška pri učitavanju tipova uređaja:', err));
  }, []);

  if (!stats || chartData.length === 0 || pieData.length === 0) return <p>Učitavanje...</p>;

  return (
    <div className="admin-container">
      <div className="mb-10 text-left">
        <img src={logo} alt="Chuwar Logo" style={{ width: '30vh', height: 'auto' }} />
      </div>
      <h1 className="admin-header">
        {localStorage.getItem('userName') || 'Nepoznat korisnik'}
      </h1>

      <div className="admin-stats">
        <GlowContainer className="admin-stat-box bg-[#64DED2] text-[#326F69]"  color="#c8fff8ff">
          <h3 className="admin-stat-h">{stats.users}</h3>
          <p className="admin-stat-p">Ukupan broj korisnika</p>
        </GlowContainer>
        <GlowContainer className="admin-stat-box">
          <h3 className="admin-stat-h">{stats.avgDevicesPerUser}</h3>
          <p className="admin-stat-p">Prosečan br. uređaja po korisniku</p>
        </GlowContainer>
        <GlowContainer className="admin-stat-box">
          <h3 className="admin-stat-h">{stats.avgDevicesPerRoom}</h3>
          <p className="admin-stat-p">Prosečan br. uređaja po sobi</p>
        </GlowContainer>
        <div className="admin-chart-wrapper" style={{ flex: 1, minWidth: '300px' }}>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={pieData}
            options={{
              title: 'Udeo tipova uređaja',
              backgroundColor: 'transparent',
              pieSliceBorderColor: '#282828',
              colors: ['#64DED2', '#3AB6AD', '#299C9A', '#207F82'],
              legendTextStyle: { color: '#F5F5F5' },
              titleTextStyle: { color: '#F5F5F5', fontSize: 16 },
            }}
          />
        </div>
      </div>

      <div className="admin-chart-wrapper">
        <h2 className="admin-section-title">Broj logova po danima</h2>
        <Chart
          chartType="LineChart"
          width="100%"
          height="300px"
          data={chartData}
          options={{
            backgroundColor: 'transparent',
            hAxis: { title: 'Datum', textStyle: { color: '#F5F5F5' }, titleTextStyle: { color: '#F5F5F5' } },
            vAxis: { title: 'Broj logova', textStyle: { color: '#F5F5F5' }, titleTextStyle: { color: '#F5F5F5' },gridlines: {color: 'rgba(255, 255, 255, 0.06)'} },
            legend: 'none',
            colors: ['#64DED2'],
            series: {
                0: {
                  lineWidth: 4
                }
              },
          }}
        />
      </div>
    </div>
      );
    };

export default Admin;