import { MonthlyRevenueArea, BookingVolumeBar, RevenueBookingsCombo } from './RevenueBookingsCharts';

export default function RevenueBookingsView({ months, monthlyRevenue, monthlyBookings, revenuePercent }) {
  const areaData = months.map((m, i) => ({ month: m, revenue: monthlyRevenue[i] }));
  const barData  = months.map((m, i) => ({ month: m, bookings: monthlyBookings[i] }));
  const comboData = months.map((m, i) => ({
    month: m,
    bookings: monthlyBookings[i],
    revenuePercent: revenuePercent[i],
  }));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '0 16px', margin: '10px 0' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.05)', margin: '10px 0' }}>
        <h4 style={{ margin: '4px 0 8px' }}>Monthly Revenue Trend</h4>
        <MonthlyRevenueArea data={areaData} />
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.05)', margin: '10px 0' }}>
        <h4 style={{ margin: '4px 0 8px' }}>Booking Volume</h4>
        <BookingVolumeBar data={barData} />
      </div>

      <div style={{ gridColumn: '1 / -1', background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.05)', margin: '10px 0' }}>
        <h4 style={{ margin: '4px 0 8px' }}>Revenue vs Bookings Correlation</h4>
        <RevenueBookingsCombo data={comboData} />
      </div>
    </div>
  );
}