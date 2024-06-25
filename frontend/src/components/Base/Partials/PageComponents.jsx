import { useContext } from "react";
import { EditorContext } from "../../Context/EditorContext";
import { deleteComponent, moveComponent, editComponentContent } from "../../Editor/EditorFunctions";

function Formula({ id, children, setContent, content }) {
    const isEditor = useContext(EditorContext)
    if (isEditor) {
        return <div>
            <ManipulationButtons id={id} setContent={setContent} content={content} >
                <div contentEditable="true" className="page-component" onBlur={(c) => editComponentContent(id, c.currentTarget.textContent, setContent, content)}>{children}</div>
            </ManipulationButtons>
        </div>
    } else {
        return <div className="page-component">{children}</div>
    }
}

function Paragraph({ children, id, setContent, content }) {
    const isEditor = useContext(EditorContext)
    if (isEditor) {
        return <div>
            <ManipulationButtons id={id} setContent={setContent} content={content}>
                <p contentEditable="true" className="page-component" onBlur={(c) => editComponentContent(id, c.currentTarget.textContent, setContent, content)}>{children}</p>
            </ManipulationButtons>
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
                <h1 contentEditable="true" className="page-component" onBlur={(c) => editComponentContent(id, c.currentTarget.textContent, setContent, content)}>{children}</h1>
            </ManipulationButtons>
        </div>
    } else {
        return <h1 className="page-component">{children}</h1>
    }
}

function ManipulationButtons({ id, setContent, content, children }) {
    return <div className="grid-container">
        <div className="left-buttons">
            <button style={{ marginBottom: "10px", border: "none", cursor: "pointer", background: "none", width: "30px", height: "10px" }} onClick={() => moveComponent(id, "up", setContent, content)}><img src={process.env.REACT_APP_API_BASE_URL + "/icons/arrow-up-icon.png"} /></button>
            <button style={{ marginTop: "10px", border: "none", cursor: "pointer", background: "none", width: "30px", height: "10px" }} onClick={() => moveComponent(id, "down", setContent, content)}><img src={process.env.REACT_APP_API_BASE_URL + "/icons/arrow-down-icon.png"} /></button>
        </div>
        <div className="contentEditableDiv">
            {children}
        </div>
        <div className="right-button">
            <button style={{ marginLeft: "20px", minWidth: 0, border: "none", cursor: "pointer", background: "none", width: "30px", height: "25px" }} onClick={() => deleteComponent(id, setContent, content)}><img src={process.env.REACT_APP_API_BASE_URL + "/icons/trash-icon.png"} /></button>
        </div>
    </div>
}

export { Formula, Paragraph, Heading }