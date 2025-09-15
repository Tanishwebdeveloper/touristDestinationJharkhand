import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar,
  ComposedChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

//1st Chart
export function MonthlyRevenueArea({ data, stroke = '#f7a86a', fill = '#f7a86a' }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity={0.45} />
            <stop offset="100%" stopColor={fill} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
        <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={stroke}
          fill="url(#revGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

//2nd Chart
export function BookingVolumeBar({ data, color = '#3b82f6' }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(v) => [v, 'Bookings']} />
        <Bar dataKey="bookings" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

//3rd chart
export function RevenueBookingsCombo({
  data,
  barColor = '#fb923c',
  lineColor = '#60a5fa',
}) {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <ComposedChart data={data} margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        {/* Left axis for bookings */}
        <YAxis
          yAxisId="left"
          orientation="left"
          tickFormatter={(v) => v}
        />
        {/* Right axis for revenue percentage */}
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(v) => `${v}`}
        />
        <Tooltip />
        <Legend />
        {/* Bars: revenuePercent on right axis */}
        <Bar yAxisId="right" dataKey="revenuePercent" name="Revenue (%)" fill={barColor} radius={[4, 4, 0, 0]} />
        {/* Line: bookings on left axis */}
        <Line yAxisId="left" type="monotone" dataKey="bookings" name="Bookings" stroke={lineColor} strokeWidth={2} dot={{ r: 3 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}