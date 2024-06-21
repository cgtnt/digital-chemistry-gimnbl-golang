import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound } from './Errors';
import Toolbar from '../../Editor/Toolbar';
import { EditorContext } from '../../Context/EditorContext';
import PropertyButtons from '../Partials/PropertyButtons';
import Info from '../Partials/ElementInfo';
import PropertiesBox from "../Partials/PropertiesBox"

export default function Element() {
    const isEditor = useContext(EditorContext)
    const { name } = useParams()

    const [generalInfo, setGeneralInfo] = useState()
    const [propertiesContent, setPropertiesContent] = useState()
    const [hasError, setHasError] = useState(false)
    const [activePanel, setActivePanel] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch1 = fetchGeneralInfo()
        const fetch2 = fetchSpecificInfo()
        Promise.all([fetch1, fetch2]).then(() => {
            setLoading(false)
            setActivePanel("physical")
        })
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

    async function fetchSpecificInfo() {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/elements/${name}?section=properties`)

            if (!res.ok) {
                setHasError(true)
                return
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
        return <h1>Loading...</h1>
    } else {
        return (
            <>
                {isEditor && <Toolbar />}
                <div className="container-element-page">
                    <Info generalInfo={generalInfo} />

                    <PropertyButtons setActivePanel={setActivePanel} />

                    <PropertiesBox setPropertiesContent= {setPropertiesContent} propertiesContent={propertiesContent} activePanel={activePanel} />
                </div>
            </>
        );
    }
}
