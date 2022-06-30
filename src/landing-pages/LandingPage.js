import {Link} from "react-router-dom"
import { Button } from "@mui/material"
function LandingPageButton() {

    return <Link to="/login" class="nav-link">
        <Button variant="contained">
            <span style={{"font-size": "24px"}}>
            Login!
            </span>
        </Button>
    </Link>
}

function LandingFrameMessage() {

    const style = {
        margin: "auto",
        padding: "10% 30% 10% 15%",
        color: "white"
    }

    return <div style={style}>
        
        <div style={{"font-size": "96px"}}>
            WATRACK
        </div>
        
        <div style={{"font-size": "36px"}}>
            !.. Makes Meter Smarter ..!<br/>
            Monitor your water usage, Accessable from anywhere. Get instant water leakage alert if any.
        </div>

        <br />

        <LandingPageButton />

    </div>
}

function LandingFrame() {
    const style = {

        "background-image": `url("https://raw.githubusercontent.com/zlliu246/react_examples/version2-landing-page/public/images/background.jpg")`,
        "background-repeat": "no-repeat",
        "background-size": "cover",
        position: "absolute",
        height: "100%",
        width: "100%"
    }

    return <div style={style}>
        <LandingFrameMessage />        
    </div>
}

function LandingPage() {
    return <div>
        <LandingFrame />
    </div>
}

export default LandingPage