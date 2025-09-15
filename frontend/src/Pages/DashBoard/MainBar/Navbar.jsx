import "./Navbar.css";

const tabs = [
  { value: 'revenue', label: "Revenue & Bookings" },
  { value: 'destinations', label: "Destinations" },
  { value: 'tribal', label: "Tribal Communities" },
  { value: 'cultural', label: "Cultural Impact" },
];


export default function Navbar({ active, onChange }){
    return (
      <div className="Navbar">
        {tabs.map(t => (
          <button
            key={t.value}
            className={`NavButton${active === t.value ? ' active' : ''}`}
            onClick={() => onChange(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
}