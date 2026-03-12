import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';

const revenue = [2400000, 1398000, 5100000, 3908000, 4800000, 3800000];
// const depense = [400000, 300000, 200000, 278000, 189000, 239000];
const mois = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
];

export default function CustomBarChart() {
    const theme = useTheme()
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <BarChart
        series={[
          { data: revenue, label: 'Revenues', id: 'pvId', color: theme.palette.primary.main },
        //   { data: depense, label: 'Dépenses', id: 'uvId', color: theme.palette.secondary.main },
        ]}
        xAxis={[{ data: mois, height: 28 }]}
        yAxis={[{ width: 70 }]}
      />
    </Box>
  );
}
