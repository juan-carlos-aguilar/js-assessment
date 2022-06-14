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

// 1st Task
async function resolveCompanyEmployeeRelations() {
    const companies = await getCompanies();
    const users = await getUsers();
    return companies.map((company) => {
        return {
            ...company,
            employees: company.employees.map((userId) => users.find((user) => user.id === userId)),
        }
    });
}

// 2nd Task
// 2-a
async function resolveInactiveEmployees() {
    const companiesWithUsers = await resolveCompanyEmployeeRelations();
    const inactiveUsers = companiesWithUsers.filter(company => company.status === 'active').map((company) => {
        return company.employees.filter(employee => employee.status === 'inactive')
    });
    const inactiveUsersNames = inactiveUsers.reduce((p,c) => p.concat(c), []).map((employee) => employee.name);
    return console.log(inactiveUsersNames);
}

// 2-b
async function resolveSalaryByGender() {
    const companiesWithUsers = await resolveCompanyEmployeeRelations();
    const genderSalary = companiesWithUsers.map((company) => {
        return {
        name: company.name,
        male: company.employees.filter(employee => employee.gender === 'male').map((employee) => employee.salary).reduce((p,c) => p + c, 0),
        female: company.employees.filter(employee => employee.gender === 'female').map((employee) => employee.salary).reduce((p,c) => p + c, 0),
        }
    })
    
    return console.log(genderSalary);
    
}


// 2-c
async function resolveSortCompanies() {
    const companiesWithUsers = await resolveCompanyEmployeeRelations();
    const sortCompanySalary = companiesWithUsers.map((company) => {
        return {
            salary: company.employees.map((employee) => employee.salary).reduce((p,c) => p + c, 0),
            name: company.name
        }
    })
    
    const order = sortCompanySalary.sort((a, b) => a.salary - b.salary);
    return console.log(order.map((data) => data.name));
}

resolveCompanyEmployeeRelations();
resolveInactiveEmployees();
resolveSalaryByGender();
resolveSortCompanies();