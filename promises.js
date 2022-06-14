const getUsers = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Antonio', gender: 'male', status: 'active', salary: 1000 },
                { id: 2, name: 'Rosa', gender: 'female', status: 'active', salary: 1000 },
                { id: 3, name: 'Joseph', gender: 'male', status: 'inactive', salary: 2000 },
                { id: 4, name: 'Lisa', gender: 'female', status: 'active', salary: 2000 },
                { id: 5, name: 'Gwen', gender: 'female', status: 'inactive', salary: 3000 },
                { id: 6, name: 'Antonio', gender: 'male', status: 'inactive', salary: 3000 }
            ]);
        }, 1000);
    });
}

const getCompanies = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Disney', employees: [1, 3], status: 'inactive' },
                { id: 2, name: 'Nestle', employees: [4], status: 'active' },
                { id: 3, name: 'Microsoft', employees: [2, 5, 6], status: 'active' }
            ]);
        }, 3000);
    });
}

module.exports = {
    getUsers: getUsers,
    getCompanies: getCompanies
}