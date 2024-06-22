import { useContext } from "react";
import { EditorContext } from "../../Context/EditorContext";
import { deleteComponent, moveComponent, editComponentContent } from "../../Editor/EditorFunctions";

function Formula({ id, children, setContent, content }) {
    const isEditor = useContext(EditorContext)
    if (isEditor) {
        return <div>
            <ManipulationButtons id={id} setContent={setContent} content={content}/>
            <div contentEditable="true" onBlur={(c) => editComponentContent(id, c.currentTarget.textContent, setContent, content)}>{children}</div>
        </div>
    } else {
        return <div className="page-component">{children}</div>
    }
}

function Paragraph({ children, id, setContent, content }) {
    const isEditor = useContext(EditorContext)
    if (isEditor) {
        return <div>
            <ManipulationButtons id={id} setContent={setContent} content={content}/>
            <p contentEditable="true" onBlur={(c) => editComponentContent(id, c.currentTarget.textContent, setContent, content)}>{children}</p>
        </div>
    } else {
        return <p className="page-component">{children}</p>
    }
}

function Heading({ children, id, setContent, content }) {
    const isEditor = useContext(EditorContext)
    if (isEditor) {
        return <div>
            <ManipulationButtons id={id} setContent={setContent} content={content}/>
            <h1 contentEditable="true" onBlur={(c) => editComponentContent(id, c.currentTarget.textContent, setContent, content)}>{children}</h1>
        </div>
    } else {
        return <h1 className="page-component">{children}</h1>
    }
}

function ManipulationButtons({ id, setContent, content }) {
    return <>
        <button onClick={() => moveComponent(id, "up", setContent, content)}>move up</button>
        <button onClick={() => moveComponent(id, "down", setContent, content)}>move down</button>
        <button onClick={() => deleteComponent(id, setContent, content)}>delete</button>
    </>
}

export { Formula, Paragraph, Heading }