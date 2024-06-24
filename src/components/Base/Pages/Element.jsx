import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound } from './Errors';
import Toolbar from '../../Editor/Toolbar';
import { EditorContext } from '../../Context/EditorContext';
import PropertyButtons from '../Partials/PropertyButtons';
import Info from '../Partials/ElementInfo';
import PropertiesBox from "../Partials/PropertiesBox"
import ElementLoading from './LoadingSkeleton';

export default function Element({setAuth}) {
    const isEditor = useContext(EditorContext)
    const { name } = useParams()

    const [generalContent, setGeneralContent] = useState()
    const [propertiesContent, setPropertiesContent] = useState()
    const [hasError, setHasError] = useState(false)
    const [activePanel, setActivePanel] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch1 = fetchGeneralContent()
        const fetch2 = fetchPropertiesContent()
        Promise.all([fetch1, fetch2]).then(() => {
            setLoading(false)
            setActivePanel("physical")
        })
    }, [])

    async function fetchGeneralContent() {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/elements/${name}?section=general`)

            if (!res.ok) {
                if (isEditor) {
                    setGeneralContent({})
                    return
                } else {
                    setHasError(true)
                    return
                }
            }

            const info = await res.json()
            setHasError(false)
            setGeneralContent(info)
        } catch (err) {
            console.log(err)
            setHasError(true)
        }
    }

    async function fetchPropertiesContent() {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/elements/${name}?section=properties`)

            if (!res.ok) {
                if (isEditor) {
                    setPropertiesContent({physical:[], chemical:[], usage:[], reactions:[]})
                    return
                } else {
                    setHasError(true)
                    return
                }
            }

            const info = await res.json()
            setHasError(false)
            setPropertiesContent(info)
        } catch (err) {
            console.log(err)
            setHasError(true)
        }
    }

    if (hasError) {
        return <NotFound />
    }

    if (loading) {
        return <ElementLoading/>
    } else {
        return (
            <>
                {isEditor && <Toolbar name={name} propertiesContent={propertiesContent} generalContent={generalContent} setAuth={setAuth} />}
                <div className="container-element-page">
                    <Info generalContent={generalContent} setGeneralContent={setGeneralContent} setAuth={setAuth} />

                    <PropertyButtons setActivePanel={setActivePanel} activePanel={activePanel} />

                    <PropertiesBox setPropertiesContent={setPropertiesContent} propertiesContent={propertiesContent} activePanel={activePanel} />
                </div>
            </>
        );
    }
}
