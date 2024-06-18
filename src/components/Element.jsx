import { useState, useEffect, useContext } from 'react';
import { Formula, Heading, Paragraph } from './PropertiesComponents';
import { useParams } from 'react-router-dom';
import { NotFound, ServerError } from './Errors';
import UploadImage from './UploadImage';
import Toolbar from './Toolbar';
import { EditorContext } from './EditorContext';
//split into 3 components
export default function Element() {
    const isEditor = useContext(EditorContext)
    const { name } = useParams()

    const [activePanel, setActivePanel] = useState("physical")
    const [generalInfo, setGeneralInfo] = useState()
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        fetchGeneralInfo()
    }, [])

    async function fetchGeneralInfo() {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/elements/${name}?section=general`)

            if (!res.ok) {
                setHasError(true)
                return
            }

            const info = await res.json()
            setHasError(false)
            setGeneralInfo(info)
        } catch (err) {
            console.log(err)
            setHasError(true)
        }
    }

    if (hasError) {
        return <NotFound />
    }

    return (
        <>
            {isEditor && <Toolbar />}
            <div className="container-element-page">
                <Info info={generalInfo} />

                <Buttons setContent={setActivePanel} />

                <PropertiesBox name={name} activePanel={activePanel} />
            </div>
        </>
    );
}

function Buttons({ setContent }) {
    const isEditor = useContext(EditorContext)
    return (
        <section className="button-section">
            <div className="button-section-wrapper">
                <button className="button physical-properties" onClick={() => setContent("physical")}>Fiz. svojstva</button>
                <button className="button chemical-properties" onClick={() => setContent("chemical")}> Hem. svojstva</button>
                <button className="button element-usage" onClick={() => setContent("usage")}>Upotreba</button>
                <button className="button element-reactions" onClick={() => setContent("reactions")}>Reakcije</button>
            </div>
        </section>
    );
}

function Info({ info }) {
    const isEditor = useContext(EditorContext)
    return (
        <div className="element-image-wrapper">
            <section className="hero-section">
                <div className="hero-section-wrapper">
                    <div className="color-background">
                        <div className="element-wrapper">
                            <h1 className="element-label" title="placeholder">{info?.symbol}</h1>
                            <p className="element-name" title="placeholder">{info?.name}</p>
                        </div>
                    </div>
                    <div className="img-wrapper">
                        {isEditor ? (
                            <UploadImage defaultSrc={info?.imageSource} />
                        ) : (
                            <img className="element-img" src={info?.imageSource} style={{ objectFit: 'cover' }} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

function PropertiesBox({ name, activePanel }) {
    const isEditor = useContext(EditorContext)
    const [content, setContent] = useState()
    console.log(content)
    useEffect(() => {
        async function fetchContent() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/elements/${name}?section=${activePanel}`)
                const content = await res.json()
                setContent(content.array)
            } catch (err) {
                console.log(err)
            }
        }
        fetchContent()

    }, [name, activePanel])

    function JSONToComponents(array) {
        return array?.map((item) => {
            switch (item.component) {
                case "formula":
                    return <Formula>{item.content}</Formula>
                case "heading":
                    return <Heading>{item.content}</Heading>
                case "paragraph":
                    return <Paragraph>{item.content}</Paragraph>
                default:
                    return
            }
        })
    }

    return (
        <div className="element-properties-wrapper" style={{
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "3%",
            marginBottom: "100px"
        }}>
            {JSONToComponents(content)}
        </div>
    );
}
