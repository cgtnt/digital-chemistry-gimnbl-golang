function addComponent(type, setContent, content) {
    console.log(content)
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

function moveComponent(id, direction, setContent, content){
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

function savePage(name, generalContent, propertiesContent) {
    console.log(name, generalContent, propertiesContent)
}

export { addComponent, deleteComponent, moveComponent, editComponentContent, savePage } 