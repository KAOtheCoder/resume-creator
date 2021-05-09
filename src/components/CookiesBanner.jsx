import React from 'react';
import "./CookiesBanner.css";

class CookiesBanner extends React.Component {
    constructor(props) {
        super(props);

        const cookiesBanner = sessionStorage.getItem("CookiesBanner") ?? "show";

        this.state = { show: cookiesBanner === "show" };
    }

    render() {
        if (this.state.show)
            return (
                <div className="CookiesBanner">
                    This website does not use cookies, but uses local storage to save your work.
                    <div 
                    className="CookiesBanner-Button"
                    onClick={() => {
                        sessionStorage.setItem("CookiesBanner", "hide");
                        this.setState({show: false});
                    }}
                    >
                        OK
                    </div>
                </div>
            );

        return null;
    }
}

export default CookiesBanner;