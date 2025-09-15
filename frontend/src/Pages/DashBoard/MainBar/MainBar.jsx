import { Suspense, lazy } from 'react';

const RevenueBookingsView   = lazy(() => import('./RevenueBookingsView.jsx'));
const DestinationsView      = lazy(() => import('./DestinationsView.jsx'));
const TribalCommunitiesView = lazy(() => import('./TribalCommunitiesView.jsx'));
const CulturalImpactView    = lazy(() => import('./CulturalImpactView.jsx'));

const views = {
  revenue: RevenueBookingsView,
  destinations: DestinationsView,
  tribal: TribalCommunitiesView,
  cultural: CulturalImpactView,
};

export default function MainBar({ active }) {
    const View = views[active] ?? RevenueBookingsView;

    // Static props for now (swap with API data later) for "Revenue & Bookings"
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthlyRevenue  = [150000,240000,290000,330000,380000,420000,470000,520000,480000,440000,360000,400000];
    const monthlyBookings = [40,55,70,85,95,110,125,140,130,115,100,105];
    const revenuePercent  = [50,70,85,95,100,110,120,135,125,115,100,105];

    // Static data now; replace with API data later (for "Destinations")
    const topDestinations = [
      { rank: 1, name: 'Saranda Forest',       visitors: 1265, valueText: '₹285,000', trend: 'up',   changeText: '+12%' },
      { rank: 2, name: 'Netarhat Hills',       visitors: 980,  valueText: '₹220,000', trend: 'up',   changeText: '+8%'  },
      { rank: 3, name: 'Palamu Tiger Reserve', visitors: 856,  valueText: '₹195,000', trend: 'up',   changeText: '+15%' },
      { rank: 4, name: 'Betla National Park',  visitors: 742,  valueText: '₹168,000', trend: 'down', changeText: '−3%'  },
      { rank: 5, name: 'Ranchi Hills',         visitors: 685,  valueText: '₹155,000', trend: 'up',   changeText: '+22%' },
      { rank: 6, name: 'Deoghar Temple Circuit', visitors: 624, valueText: '₹142,000', trend: 'up',  changeText: '+5%'  },
    ];

    const performance = [
      { name: 'Saranda Forest',        score: 4.8 },
      { name: 'Netarhat Hills',        score: 4.5 },
      { name: 'Palamu Tiger Reserve',  score: 4.3 },
      { name: 'Betla National Park',   score: 4.1 },
      { name: 'Ranchi Hills',          score: 3.9 },
      { name: 'Deoghar Temple Circuit',score: 3.8 },
    ];
    
    //Static data now; replace with API data later (for "Tribal Communities")
    const tribalDistribution = [
      { name: 'Ho Tribe', value: 35, color: '#f59e0b' },
      { name: 'Santhal Tribe', value: 28, color: '#ef4444' },
      { name: 'Oraon Tribe', value: 18, color: '#8b5cf6' },
      { name: 'Munda Tribe', value: 12, color: '#10b981' },
      { name: 'Kharwar Tribe', value: 7, color: '#3b82f6' },
    ];

    const tribalEngagement = [
      { name: 'Ho Tribe',     value: 1420, total: 1800, suffix: 'visitors' },
      { name: 'Santhal Tribe',value: 1130, total: 1600, suffix: 'visitors' },
      { name: 'Oraon Tribe',  value:  730, total: 1100, suffix: 'visitors' },
      { name: 'Munda Tribe',  value:  485, total:  800, suffix: 'visitors' },
      { name: 'Kharwar Tribe',value:  283, total:  500, suffix: 'visitors' },
    ];

    const culturalPrograms = [
      { value: 156, label: 'Cultural Performances', color: '#0ea5e9' },
      { value:  89, label: 'Craft Workshops',       color: '#10b981' },
      { value:  67, label: 'Traditional Festivals', color: '#f43f5e' },
    ]; 
    
    //Static data now; replace with API data later (for "Cultural Impact")
    const sdgProgress = [
      { name: 'Local Employment',          value: 245, total: 300, status: 'On Track' },
      { name: 'Community Income',          value: 1850000, total: 2000000, status: 'On Track' },
      { name: 'Cultural Preservation',     value: 18, total: 25, status: 'Needs Attention', badgeColor: '#f59e0b' },
      { name: 'Infrastructure Development',value: 12, total: 15, status: 'On Track' },
      { name: 'Youth Engagement',          value: 156, total: 200, status: 'Needs Attention', badgeColor: '#f59e0b' },
    ];

    const economic = [
      { label: 'Direct Employment Created',  value: 245, suffix: 'jobs',  color: '#10b981' },
      { label: 'Indirect Employment',        value: 680, suffix: 'jobs',  color: '#3b82f6' },
      { label: 'Community Income Generated', value: '₹18.5L',              color: '#f97316' },
      { label: 'Local Business Growth',      value: '+32%',                color: '#a855f7' },
    ];

    const conservation = [
      { label: 'Forest Area Protected',   value: '2,450', suffix: 'hectares', color: '#10b981' },
      { label: 'Cultural Sites Preserved',value: 18,      suffix: 'sites',    color: '#3b82f6' },
      { label: 'Traditional Crafts Revived', value: 12,   suffix: 'crafts',   color: '#ef4444' },
      { label: 'Youth Skill Development', value: 156,     suffix: 'youth',    color: '#a855f7' },
    ];

    // Map of props per view
    const propsByView = {
      revenue: { months, monthlyRevenue, monthlyBookings, revenuePercent },
      destinations: { topDestinations, performance },
      tribal: {
        distribution: tribalDistribution,
        engagement: tribalEngagement,
        programs: culturalPrograms,
      },
      cultural: { sdgProgress, economic, conservation }
    };

    return (
      <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
        <View {...(propsByView[active] ?? {})} />
      </Suspense>
    );
}