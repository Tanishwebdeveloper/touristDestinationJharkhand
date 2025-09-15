export default function CulturalImpactView({
  sdgProgress = [],      // [{ name, value, total, status: 'On Track'|'Needs Attention', badgeColor?: string }]
  economic = [],         // [{ label, value, suffix?, color? }]
  conservation = [],     // [{ label, value, suffix?, color? }]
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, padding: '0 16px', margin: '10px 10px' }}>
      {/* SDG Progress Section */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.05)', margin: '10px 10px' }}>
        <h4 style={{ margin: '4px 0 12px' }}>Sustainable Development Goals Progress</h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {sdgProgress.map((item, idx) => {
            const pct = item.total ? Math.max(0, Math.min(100, (item.value / item.total) * 100)) : 0;
            const badgeBg = item.badgeColor || (item.status === 'On Track' ? '#111827' : '#f59e0b');
            return (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    <span style={{ color: '#6b7280' }}>{`${item.value} / ${item.total}`}</span>
                  </div>
                  {/* Accessible progress bar */}
                  <div
                    role="progressbar"
                    aria-valuenow={Math.round(pct)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.name} progress`}
                    style={{ width: '100%', height: 10, background: '#e5e7eb', borderRadius: 999 }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        background: '#111827',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280' }}>{`${Math.round(pct)}% Complete`}</div>
                </div>

                <div
                  style={{
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: badgeBg,
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    justifySelf: 'end',
                  }}
                >
                  {item.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-column metrics row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '10px 10px' }}>
        {/* Economic Impact */}
        <MetricsCard title="Economic Impact" items={economic} />
        {/* Environmental & Cultural Conservation */}
        <MetricsCard title="Environmental & Cultural Conservation" items={conservation} />
      </div>
    </div>
  );
}

function MetricsCard({ title, items }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
      <h4 style={{ margin: '4px 0 12px' }}>{title}</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', rowGap: 10, alignItems: 'center' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'contents' }}>
            <div style={{ color: '#374151' }}>{it.label}</div>
            <div style={{ fontWeight: 800, color: it.color || '#111' }}>
              {it.value}{it.suffix ? ` ${it.suffix}` : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}