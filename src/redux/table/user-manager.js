
export function getUserById(users, id) {
    return users.find(value => value.id === id);
}

export function getFullName(user) {
    return `${user.surname} ${user.firstName}`
}
