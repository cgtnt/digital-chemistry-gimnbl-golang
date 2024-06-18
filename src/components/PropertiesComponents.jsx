import { useContext } from "react";
import { EditorContext } from "./EditorContext";

function Formula({children}){
    const isEditor = useContext(EditorContext)
    return (
        <div>{children}</div>
    );
}

function Paragraph({children}){
    const isEditor = useContext(EditorContext)
    return (
        <p>{children}</p>
    );
}

function Heading({children}){
    const isEditor = useContext(EditorContext)
    return (
        <h1>{children}</h1>
    );
}

export {Formula, Paragraph, Heading}