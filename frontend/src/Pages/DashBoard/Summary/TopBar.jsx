import CustomButton from "./CustomButton.jsx";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import "./TopBar.css";

export default function TopBar(){
    return (
        <>
            <div className="TopBar">
                <div>
                    <h2>Tourism Analytics Dashboard</h2>
                    <p>
                        Comprehensive insights into Jharkhand
                        tribal tourism performance
                    </p>
                </div>
                <div className="CustomButton">
                    <CustomButton 
                        icon={<FileDownloadIcon/>} 
                        message={"Export Report"}
                    >
                    </CustomButton>
                    <CustomButton 
                        icon={<RefreshIcon />}
                        message={"Refresh"}
                    >
                    </CustomButton>
                </div>
            </div>
        </>
    )
}