import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import PieChart from 'src/components/PieChart'
import WeeklyOverview from 'src/components/weekly'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {/* <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>*/}
        <Grid item xs={12} md={12}>
          <StatisticsCard />
        </Grid> 
        <Grid item xs={12} md={6} lg={6}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <PieChart />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
