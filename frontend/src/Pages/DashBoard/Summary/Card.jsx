import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function StatCard({icon, data, dataColor, text, innerIcon, innerText}) {
  return (
    <Card
      sx={{
        borderRadius: '20px',
        boxShadow: 3,
        backgroundColor: '#ffffff',
        minWidth: 160,
        maxWidth: 200,
        minHeight: 130,
        maxHeight: 180,
        padding: 1,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {icon}
        <Typography variant="h4" fontWeight={700} sx={{ color: dataColor }}>
          {data}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          {text}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {innerIcon}
          <Typography variant="body2" sx={{ color: '#18F25C', fontWeight: 600 }}>
            {innerText}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}