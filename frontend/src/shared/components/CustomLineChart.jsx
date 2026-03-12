import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

const margin = { right: 24 };
const num_patient = [240, 139, 98, 390, 480, 380, 430];
const xLabels = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
];

function CustomMark(props) {
  const { x, y, color } = props;

  return (
    <g>
      <circle cx={x} cy={y} r={4} fill={color || 'currentColor'} />
      <text
        x={x}
        y={Number(y) - 12}
        style={{
          textAnchor: 'middle',
          dominantBaseline: 'auto',
          fill: color || 'currentColor',
          fontWeight: 'bold',
          fontSize: 12,
        }}
      >
        {num_patient[props.dataIndex].toString()}
      </text>
    </g>
  );
}

export default function CustomLineChart() {
  const theme = useTheme()
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <LineChart
        series={[{ data: num_patient, label: 'Patients:', color:theme.palette.primary.main }]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        yAxis={[{ width: 50 }]}
        margin={margin}
        slots={{
          mark: CustomMark,
        }}
      />
    </Box>
  );
}
