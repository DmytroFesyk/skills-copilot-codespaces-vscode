function skillsMember() {
    return {
        name: 'John Doe',
        age: 30,
        skills: ['HTML', 'CSS', 'JS'],
        salary: 50000,
        getFullName: function () {
            return this.name;
        }
    };
}