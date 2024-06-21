export default function Toolbar() {
    return (
        <section style={{
            backgroundColor: "red",
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 5,
        }}>
            <h3 style={{position: "absolute"}}>U edit modu</h3>
            <section style={{
                textAlign: "center",
                padding: "3px"
            }}>
                <button style={{margin: "2px"}}>save</button>
                <button onClick={() => {window.location.reload()}}>discard</button>
            </section>
        </section>
    );
}