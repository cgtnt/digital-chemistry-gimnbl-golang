import { savePage } from "./EditorFunctions";

export default function Toolbar({name, generalContent, propertiesContent}) {
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
                <button style={{margin: "2px"}} onClick={() => savePage(name, generalContent, propertiesContent)}>save</button>
                <button onClick={() => {window.location.reload()}}>discard</button>
            </section>
        </section>
    );
}