export default function PropertyButtons({ setActivePanel, activePanel }) {
    return (
        <section className="button-section">
            <div className="button-section-wrapper">
                <button className={"button physical-properties " + ((activePanel === "physical") ? "active-panel" : "")} onClick={() => setActivePanel("physical")}>Fiz. svojstva</button>
                <button className={"button physical-properties " + ((activePanel === "chemical") ? "active-panel" : "")} onClick={() => setActivePanel("chemical")}> Hem. svojstva</button>
                <button className={"button physical-properties " + ((activePanel === "usage") ? "active-panel" : "")} onClick={() => setActivePanel("usage")}>Upotreba</button>
                <button className={"button physical-properties " + ((activePanel === "reactions") ? "active-panel" : "")} onClick={() => setActivePanel("reactions")}>Reakcije</button>
            </div>
        </section>
    );
}