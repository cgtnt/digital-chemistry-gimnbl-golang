import { useContext } from "react";
import { EditorContext } from "../../Context/EditorContext";
import { deleteComponent, moveComponent, editComponentContent } from "../../Editor/EditorFunctions";

function Formula({ id, children, setContent, content }) {
    const isEditor = useContext(EditorContext)
    if (isEditor) {
        return <div>
            <ManipulationButtons id={id} setContent={setContent} content={content} />
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
            <ManipulationButtons id={id} setContent={setContent} content={content} />
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
            <ManipulationButtons id={id} setContent={setContent} content={content}>
                <h1 contentEditable="true" onBlur={(c) => editComponentContent(id, c.currentTarget.textContent, setContent, content)}>{children}</h1>
            </ManipulationButtons>
        </div>
    } else {
        return <h1 className="page-component">{children}</h1>
    }
}

function ManipulationButtons({ id, setContent, content, children }) {
    return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ justifyContent: "center", display: "flex", flexDrection: "column", alignItems: "flex-start", marginRight: "20px", WebkitFlexDirection: "column" }}>
            <button style={{ marginBottom: "10px", border:"none", cursor:"pointer", background:"none", width: "40px", height: "20px" }} onClick={() => moveComponent(id, "up", setContent, content)}><img src="arrow-up-icon.png"/></button>
            <button style={{ marginTop: "10px", border:"none", cursor:"pointer", background:"none", width: "40px", height: "20px" }} onClick={() => moveComponent(id, "down", setContent, content)}><img src="arrow-down-icon.png"/></button>
        </div>
        <div style={{ position:"relative", flexGrow:"1" }}>
            {children}
        </div>
        <button style={{  marginLeft: "20px", border:"none", cursor:"pointer", background:"none", width: "30px", height: "30px" }} onClick={() => deleteComponent(id, setContent, content)}><img src="trash-icon.png"/></button>
    </div>
}

export { Formula, Paragraph, Heading }