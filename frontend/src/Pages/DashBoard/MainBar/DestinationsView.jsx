import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function DestinationsView({
  topDestinations = [],   // [{ rank, name, visitors, valueText, trend: 'up'|'down', changeText }]
  performance = [],       // [{ name, score }]
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, padding: '0 16px' }}>
      {/* Top Performing Destinations list */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: '4px 0 12px' }}>Top Performing Destinations</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {topDestinations.map((d) => {
            const Up = d.trend === 'up';
            return (
              <div
                key={d.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: '#f9fafb',
                  border: '1px solid #eee',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontWeight: 700, color: '#6b7280' }}>{`#${d.rank}`}</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{`${d.visitors} visitors`}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontWeight: 700, color: Up ? '#059669' : '#dc2626' }}>{d.valueText}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {Up ? (
                      <TrendingUpIcon sx={{ fontSize: 16, color: '#059669' }} />
                    ) : (
                      <TrendingDownIcon sx={{ fontSize: 16, color: '#dc2626' }} />
                    )}
                    <span style={{ fontSize: 12, color: Up ? '#059669' : '#dc2626' }}>{d.changeText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Destination Performance Chart (Horizontal Bars) */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.05)', height: 360 }}>
        <h4 style={{ margin: '4px 0 8px' }}>Destination Performance Chart</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={performance}
            layout="vertical"
            margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* For horizontal bars, XAxis must be type="number" and YAxis type="category" */}
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}