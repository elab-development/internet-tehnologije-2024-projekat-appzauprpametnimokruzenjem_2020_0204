// src/pages/Admin.js
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { Chart } from 'react-google-charts';
import '../components/TableStyles.css';
import logo from '../assets/main/logo.png';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';


const Admin = () => {

  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);


  const { showNotification } = useNotification();
  
  useEffect(() => {

    if (localStorage.getItem("userRole") === "admin"&&
      localStorage.getItem("loginSuccess") === "true") {
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
    <div className="table">
        <div style={{ textAlign: 'left', marginTop: '2rem'}}>
              <img src={logo} alt="Chuwar Logo" style={{ width: '30vh', height: 'auto' }} />
        </div>
      <h1 className="text-3xl font-bold mb-6">Admin: {localStorage.getItem('userName') || 'Nepoznat korisnik'}</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', marginBottom: '40px' }}>
        <div>
          <h3>Ukupan broj korisnika</h3>
          <p>{stats.users}</p>
        </div>
        <div>
          <h3>Prosečan br. uređaja po korisniku</h3>
          <p>{stats.avgDevicesPerUser}</p>
        </div>
        <div>
          <h3>Prosečan br. uređaja po sobi</h3>
          <p>{stats.avgDevicesPerRoom}</p>
        </div>
        <div style={{ width: '50vw' }}>
          <Chart
            chartType="PieChart"
            width="auto"
            height="auto"
            data={pieData}
            options={{
                title: 'Udeo tipova uređaja',
                backgroundColor: { 'fill': "#F5F5F5" , 'opacity': 0 },
            }}
          />
        </div>
      </div>

      <h2>Broj logova po danima</h2>
      <Chart
        chartType="LineChart"
        width="100%"
        height="30vh"
        data={chartData}
        options={{
            backgroundColor: { 'fill': "#F5F5F5" , 'opacity': 0 },
            hAxis: { title: 'Datum' },
            vAxis: { title: 'Broj logova' },
            legend: 'none'
        }}
      />
    </div>
  );
};

export default Admin;