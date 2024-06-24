export default function ElementLoading() {
    return (
        <div className="container-element-page">
            <div className="element-image-wrapper">
                <section className="hero-section">
                    <div className="hero-section-wrapper">
                        <div className="color-background"/>
                        <div className="img-wrapper loading-skel" />
                    </div>
                </section>
            </div>

            <section className="button-section">
                <div className="button-section-wrapper">
                    <div className="loading-skel" style={{ height: "35px", width: "95px"}}/>
                    <div className="loading-skel" style={{ height: "35px", width: "95px"}}/>
                    <div className="loading-skel" style={{ height: "35px", width: "95px"}}/>
                    <div className="loading-skel" style={{ height: "35px", width: "95px"}}/>
                </div>
            </section>

            <div className="element-properties-wrapper" style={{
                maxWidth: "100vw",
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingTop: "3%",
                marginBottom: "100px"
            }}>
                <div className="loading-skel" style={{ position: "relative", width: "100%", height:"500px"}}/>
            </div>
        </div>
    );
}