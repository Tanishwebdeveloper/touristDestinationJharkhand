import TopBar from "./TopBar.jsx";
import Card from "./Card.jsx";
import "./Summary.css";
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function Summary(){
    return (
        <div className="Summary">
            <div>
                <TopBar/>
            </div>
            <div className="SummaryIcon">
                <Card
                    icon = {<PeopleIcon sx={{ fontSize: 40, color: '#1877F2', mb: 1 }} />}
                    data = {"5,248"}
                    dataColor = {'#1877F2'}
                    text = {"Total Visitors"}
                    innerIcon = {<TrendingUpIcon sx={{ fontSize: 18, color: '#18F25C' }} />}
                    innerText = {"+15.8%"}
                />
                <Card
                    icon = {<AttachMoneyIcon sx={{ fontSize: 40, color: '#1ebb50ff', mb: 1 }} />}
                    data = {"₹4.8M"}
                    dataColor = {'#1ebb50ff'}
                    text = {"Total Revenue"}
                    innerIcon = {<TrendingUpIcon sx={{ fontSize: 18, color: '#18F25C' }} />}
                    innerText = {"+18.5%"}
                />
                <Card
                    icon = {<CalendarMonthIcon sx={{ fontSize: 40, color: '#f54c06', mb: 1 }} />}
                    data = {"3.2"}
                    dataColor = {'#f54c06'}
                    text = {"Avg Stay (Days)"}
                    innerIcon = {<TrendingUpIcon sx={{ fontSize: 18, color: '#18F25C' }} />}
                    innerText = {"+0.3%"}
                />
                <Card
                    icon = {<StarOutlineIcon sx={{ fontSize: 40, color: '#c9870a', mb: 1 }} />}
                    data = {"4.7"}
                    dataColor = {'#c9870a'}
                    text = {"Satisfaction"}
                    innerIcon = {<TrendingUpIcon sx={{ fontSize: 18, color: '#18F25C' }} />}
                    innerText = {"+0.2%"}
                />
                <Card
                    icon = {<PeopleIcon sx={{ fontSize: 40, color: '#9d19fa', mb: 1 }} />}
                    data = {"28%"}
                    dataColor = {'#9d19fa'}
                    text = {"Repeat Visitors"}
                    innerIcon = {<TrendingUpIcon sx={{ fontSize: 18, color: '#18F25C' }} />}
                    innerText = {"+5%"}
                />
                <Card
                    icon = {<LocationOnOutlinedIcon sx={{ fontSize: 40, color: '#e60000', mb: 1 }} />}
                    data = {"24"}
                    dataColor = {'#e60000'}
                    text = {"Active Destinations"}
                    innerIcon = {<TrendingUpIcon sx={{ fontSize: 18, color: '#18F25C' }} />}
                    innerText = {"+3"}
                />
            </div>
        </div>
    )
}