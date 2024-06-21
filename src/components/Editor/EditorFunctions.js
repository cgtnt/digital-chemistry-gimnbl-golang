function addComponent(type, setContent, content) {
    const newContent = [...content]
    newContent.push({
        id: crypto.randomUUID(),
        component: type,
        content: "Novo polje"
    })

    console.log(newContent)

    setContent(newContent)
}

function deleteComponent(id, setContent, content) {
    let newContent = [...content]
    newContent = newContent.filter((component) =>
        component.id != id
    )
    setContent(newContent)
}

function moveComponent(id, direction, setContent, content) {
    const componentIndex = content.findIndex((component) => component.id == id)
    let newContent = [...content]

    if (direction == "up") {
        if (componentIndex == 0) return

        let tmp = content[componentIndex - 1]
        newContent[componentIndex - 1] = content[componentIndex]
        newContent[componentIndex] = tmp
    }

    if (direction == "down") {
        if (componentIndex == (content.length - 1)) return

        let tmp = content[componentIndex + 1]
        newContent[componentIndex + 1] = content[componentIndex]
        newContent[componentIndex] = tmp
    }

    console.log(newContent)
    setContent(newContent)
}

function editComponentContent(id, input, setContent, content) {
    const componentIndex = content.findIndex((component) => component.id == id)
    let newContent = [...content]

    newContent[componentIndex].content = input
    console.log(newContent)
    setContent(newContent)
}

async function savePage(name, generalContent, propertiesContent) {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/editor/elements/${name}`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                generalProperties: generalContent,
                specificProperties: propertiesContent
            }),
            headers: {
                "Content-Type":"application/json"
            }
        })

        const info = await res.json()
        console.log(info)
    } catch (err) {
        console.log(err)
    }
}

export { addComponent, deleteComponent, moveComponent, editComponentContent, savePage } 