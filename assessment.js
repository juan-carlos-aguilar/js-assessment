const promises = require("./promises.js")

// 1st Part
async function resolveCompanyEmployeeRelations() {
    const companies = await promises.getCompanies();
    const users = await promises.getUsers();
    const listCompanies = companies.map((company) => {
        return {
            ...company,
            employees: company.employees.map((userId) => users.find((user) => user.id === userId)),
        }
    });

    return listCompanies;
}

// 2nd Part
// 2-a
async function resolveInactiveEmployees() {
    const companiesWithUsers = await resolveCompanyEmployeeRelations();
    const inactiveUsers = companiesWithUsers.filter(company => company.status === 'active').map((company) => {
        return company.employees.filter(employee => employee.status === 'inactive')
    });
    const inactiveUsersNames = inactiveUsers.reduce((p,c) => p.concat(c), []).map((employee) => employee.name);
    
    return inactiveUsersNames;
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
    
    return genderSalary;
}

// 2-c
async function resolveSortingCompanies() {
    const companiesWithUsers = await resolveCompanyEmployeeRelations();
    const sortCompanySalary = companiesWithUsers.map((company) => {
        return {
            salary: company.employees.map((employee) => employee.salary).reduce((p,c) => p + c, 0),
            name: company.name
        }
    })
    
    const order = sortCompanySalary.sort((a, b) => a.salary - b.salary);
    return order.map((data) => data.name);
}

Promise.all([resolveCompanyEmployeeRelations(), resolveInactiveEmployees(), resolveSalaryByGender(), resolveSortingCompanies()]).then((values) => {
    console.log(values);
})