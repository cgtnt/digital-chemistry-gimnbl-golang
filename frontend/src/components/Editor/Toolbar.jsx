import { savePage } from "./EditorFunctions";

export default function Toolbar({name, generalContent, propertiesContent, setAuth}) {
    return (
        <section style={{
            backgroundColor: "red",
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 5,
            display: "flex",
            padding: "5px",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <h3>EDIT MODE</h3>
            <p style={{flexGrow: 1, marginLeft:"30px"}}>Izmjene koje napravite će biti vidjlive na stranici</p>
            <section style={{
                textAlign: "center",
            }}>
                <button className="button" style={{marginRight: "10px"}} onClick={() => savePage(name, generalContent, propertiesContent, setAuth)}>Sačuvaj</button>
                <button className="button" style={{marginRight: "10px"}} onClick={() => {window.location.reload()}}>Odbaci</button>
            </section>
        </section>
    );
}