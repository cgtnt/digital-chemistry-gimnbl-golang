export default function Toolbar() {
    return (
        <section style={{
            width: "100%",
            backgroundColor: "red"
        }}>
            <h3 style={{position: "absolute"}}>U edit modu</h3>
            <section style={{
                textAlign: "center",
                padding: "3px"
            }}>
                <button style={{margin: "2px"}}>save</button>
                <button>discard</button>
            </section>
        </section>
    );
}