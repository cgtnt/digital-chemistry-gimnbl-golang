import { EditorContext } from "../../Context/EditorContext"
import { useContext, useEffect, useState } from "react"
import { Formula, Heading, Paragraph } from "./PageComponents"
import PageEditorButtons from "../../Editor/PageEditorButtons"
import usePrevious from "../../Hooks/usePrevious"

export default function PropertiesBox({ propertiesContent, setPropertiesContent, activePanel }) {
    const [content, setContent] = useState([])
    const isEditor = useContext(EditorContext)
    const prevActive = usePrevious(activePanel)

    useEffect(() => {
        if (isEditor) {
            let newPropertiesContent = propertiesContent
            newPropertiesContent[prevActive] = content
            setPropertiesContent(newPropertiesContent)
        }
        setContent(propertiesContent[activePanel])
    }, [activePanel, content])

    function JSONToComponents(array) {
        return array?.map((item) => {
            switch (item.component) {
                case "formula":
                    return <Formula id={item.id} setContent={setContent} content={content}>{item.content}</Formula>
                case "heading":
                    return <Heading id={item.id} setContent={setContent} content={content}>{item.content}</Heading>
                case "paragraph":
                    return <Paragraph id={item.id} setContent={setContent} content={content}>{item.content}</Paragraph>
                default:
                    return
            }
        })
    }

    return (
        <div className="element-properties-wrapper" style={{
            maxWidth: "100vw",
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "3%",
            marginBottom: "100px"
        }}>
            {JSONToComponents(content)}
            {isEditor && <PageEditorButtons activePanel={activePanel} setContent={setContent} content={content} />}
        </div>
    );
}