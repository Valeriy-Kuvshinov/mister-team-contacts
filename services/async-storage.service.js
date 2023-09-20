export const storageService = {
    query,
    get,
    post,
    put,
    put2,
    remove,
}

function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity = { ...newEntity }
    newEntity._id = _makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

// function put(entityType, updatedEntity, entityPlacement) {
//     return query(entityType).then(entities => {
//         const idx = entities[entityPlacement].teamMembers.findIndex(entity => entity._id === updatedEntity._id)
//         if (idx < 0) throw new Error(`Update failed, cannot find entity with id: 1 in: ${entityType}`)
//         entities[entityPlacement].teamMembers.splice(idx, 1, updatedEntity)
//         _save(entityType, entities)
//         return updatedEntity
//     })
// }
function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const entityIndex = entities.findIndex(e => e._id === updatedEntity._id)

        if (entityIndex === -1) throw new Error('Entity not found')

        entities.splice(entityIndex, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function put2(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: 1 in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}