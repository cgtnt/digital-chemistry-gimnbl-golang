export default function PropertyButtons({ setActivePanel }) {
    return (
        <section className="button-section">
            <div className="button-section-wrapper">
                <button className="button physical-properties" onClick={() => setActivePanel("physical")}>Fiz. svojstva</button>
                <button className="button chemical-properties" onClick={() => setActivePanel("chemical")}> Hem. svojstva</button>
                <button className="button element-usage" onClick={() => setActivePanel("usage")}>Upotreba</button>
                <button className="button element-reactions" onClick={() => setActivePanel("reactions")}>Reakcije</button>
            </div>
        </section>
    );
}