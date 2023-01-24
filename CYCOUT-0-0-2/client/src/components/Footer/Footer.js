import React from "react";
// import Logo from '../../Images/Logo.png'
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-into-center">
            {/* <div className="footer_logo">
                <img src={Logo} alt="Logo" className="Logo"/>
            </div> */}
            <div className="footer_infors_block">
                <section>
                    <hr className="split-line" / >
                    <section>
                        Software Enginner Project
                        <br />
                        AUSCYCLING
                        <br />
                        Copyright© 2022 CYCOUT5TEAM
                    </section>
                </section>
            </div>
        </div>

    )
}
export default Footer;