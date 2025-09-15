import {
  ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts';

export default function TribalCommunitiesView({
  // Pie: [{ name, value, color }]
  distribution = [],
  // Metrics: [{ name, value, total, suffix }]  // e.g., {name:'Ho Tribe', value:1420, total:1800, suffix:'visitors'}
  engagement = [],
  // Program tiles: [{ value, label, color }]
  programs = [],
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '0 16px' }}>
      {/* Visitor Distribution Pie */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.05)', height: 360 }}>
        <h4 style={{ margin: '4px 0 8px' }}>Visitor Distribution by Tribal Community</h4>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={50}
              outerRadius={100}
              paddingAngle={2}
            >
              {distribution.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={entry.color || '#8884d8'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Community Engagement Metrics (progress bars) */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.05)', height: 360, overflow: 'auto' }}>
        <h4 style={{ margin: '4px 0 12px' }}>Community Engagement Metrics</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {engagement.map((m) => {
            const pct = Math.max(0, Math.min(100, (m.total ? (m.value / m.total) * 100 : 0)));
            return (
              <div key={m.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{m.name}</span>
                  <span style={{ color: '#6b7280' }}>{`${m.value}${m.suffix ? ` ${m.suffix}` : ''}`}</span>
                </div>
                <div style={{ width: '100%', height: 8, background: '#e5e7eb', borderRadius: 8 }}>
                  <div
                    style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: '#111827',
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cultural Programs & Activities tiles */}
      <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {programs.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: '20px 12px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 800, color: p.color || '#111' }}>{p.value}</div>
            <div style={{ color: '#6b7280', fontWeight: 600 }}>{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}