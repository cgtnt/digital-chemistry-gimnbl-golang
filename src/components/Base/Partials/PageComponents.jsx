import { useContext } from "react";
import { EditorContext } from "../../Context/EditorContext";
import { deleteComponent, moveComponent, editComponentContent } from "../../Editor/EditorFunctions";

function Formula({ id, children, setContent, content }) {
    const isEditor = useContext(EditorContext)
    if (isEditor) {
        return <div>
            <button onClick={() => moveComponent(id, "up", setContent, content)}>move up</button>
            <button onClick={() => moveComponent(id, "down", setContent, content)}>move down</button>
            <button onClick={() => deleteComponent(id, setContent, content)}>delete</button>
            <div contentEditable="true" onInput={(c) => editComponentContent(id, c.currentTarget.textContent, setContent, content)}>{children}</div>
        </div>
    } else {
        return <div>{children}</div>
    }
}

function Paragraph({ children }) {
    const isEditor = useContext(EditorContext)
    return (
        <p>{children}</p>
    );
}

function Heading({ children }) {
    const isEditor = useContext(EditorContext)
    return (
        <h1>{children}</h1>
    );
}

export { Formula, Paragraph, Heading }