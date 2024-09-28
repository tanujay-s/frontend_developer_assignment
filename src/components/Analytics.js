import React, { useEffect, useState } from 'react';
import { getUsers } from '../api';
import { Paper, Typography, Grid, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { subDays, isAfter } from 'date-fns';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [metrics, setMetrics] = useState({
    last24Hours: 0,
    last7Days: 0,
    last15Days: 0,
    last30Days: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    getUsers()
      .then((res) => {
        calculateMetrics(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  const calculateMetrics = (users) => {
    const now = new Date();

    const calculate = (days) => {
      const pastDate = subDays(now, days);
      return users.filter((user) => isAfter(new Date(user.createdAt), pastDate)).length;
    };

    setMetrics({
      last24Hours: calculate(1),
      last7Days: calculate(7),
      last15Days: calculate(15),
      last30Days: calculate(30),
    });
  };

  const data = {
    labels: ['Last 24 Hours', 'Last 7 Days', 'Last 15 Days', 'Last 30 Days'],
    datasets: [
      {
        label: 'User Registrations',
        data: [
          metrics.last24Hours,
          metrics.last7Days,
          metrics.last15Days,
          metrics.last30Days,
        ],
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Registration Trends',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return (
    <div style={styles.container}>
      <Typography style={styles.header} variant="h4" gutterBottom>
        User Registration Analytics
      </Typography>
      {loading ? (
        <div style={styles.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container style={styles.gridContainer}>
          <Grid item xs={12}>
            <Paper
              style={{ ...styles.paper, transform: isHovered ? 'scale(1.02)' : 'none' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Typography style={styles.metrics} variant="h6">Metrics</Typography>
              <Typography style={styles.metricText}>Last 24 Hours: {metrics.last24Hours}</Typography>
              <Typography style={styles.metricText}>Last 7 Days: {metrics.last7Days}</Typography>
              <Typography style={styles.metricText}>Last 15 Days: {metrics.last15Days}</Typography>
              <Typography style={styles.metricText}>Last 30 Days: {metrics.last30Days}</Typography>

            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper style={styles.paper}>
              <div style={styles.chartContainer}>
                <Bar data={data} options={options} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    marginTop: '80px',
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  paper: {
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'transform 0.3s',
  },
  paperHover: {
    transform: 'scale(1.02)',
  },
  metrics: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#555',
  },
  metricText: {
    fontSize: '1rem',
    color: '#777',
  },
  chartContainer: {
    height: '400px',
    maxWidth: '100%',
  },
};


export default Analytics;
