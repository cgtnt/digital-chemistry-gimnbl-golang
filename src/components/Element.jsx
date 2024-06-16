import { useState, useEffect } from 'react';
import { Formula, Heading, Paragraph } from './PropertiesComponents';

//split into 3 components
export default function Element({ name }) {
    const [activePanel, setActivePanel] = useState("physical")
    const [generalInfo, setGeneralInfo] = useState()

    useEffect(() => {
        fetchGeneralInfo()
    }, [])

    async function fetchGeneralInfo() {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/elementi/${name}?section=general`)
            const info = await res.json()
            setGeneralInfo(info)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container-element-page">
            {/* <Image source={generalInfo.imgSrc} /> set general info here  */}

            <Buttons setState={setActivePanel} />

            <PropertiesBox name={name} activePanel={activePanel} />
        </div>
    );
}

function Buttons({ setState }) {
    return (
        <section className="button-section">
            <div className="button-section-wrapper">
                <button className="button physical-properties" onClick={() => setState("physical")}>Fiz. svojstva</button>
                <button className="button chemical-properties" onClick={() => setState("chemical")}> Hem. svojstva</button>
                <button className="button element-usage" onClick={() => setState("usage")}>Upotreba</button>
                <button className="button element-reactions" onClick={() => setState("reactions")}>Reakcije</button>
            </div>
        </section>
    );
}

function Image({ source }) {
    return (
        <div className="element-image-wrapper">
            <section className="hero-section">
                <div className="hero-section-wrapper">
                    <div className="color-background">
                        <div className="element-wrapper">
                            <h1 className="element-label" title="placeholder" />
                            <p className="element-name" title="placeholder" />
                        </div>
                    </div>
                    <div className="img-wrapper">
                        <img className="element-img" src={source} />
                    </div>
                </div>
            </section>
        </div>
    );
}

function PropertiesBox({ name, activePanel }) {
    const [content, setContent] = useState()
    console.log(content)
    useEffect(() => {
        async function fetchContent() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/elementi/${name}?section=${activePanel}`)
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
        <div className="element-properties-wrapper">
            {JSONToComponents(content)}
        </div>
    );
}
