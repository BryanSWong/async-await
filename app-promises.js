const users = [{
    id: 1,
    name: 'Andrew',
    schoolId: 101
}, {
    id: 2,
    name: 'Jess',
    schoolId: 999
},];

const grades = [{
    id: 1,
    schoolID: 101,
    grade: 86
}, {
    id: 2,
    schoolID: 999,
    grade: 100
}, {
    id: 3,
    schoolID: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
       const user = users.find((user) => user.id === id);

       if(user) {
           resolve(user);
       } else {
           reject(`Unable to find user with id of ${id}.`);
       }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolID === schoolId));
    });
};

const getstatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) =>{
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;

        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a,b) => a + b) / grades.length;
        }
        return `${user.name} has a ${average} in the class.`;
    });
};

const getStatusAlt = async (userId) => {
    // throw new Error('This is an error');
    // return 'Mike';

    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    // console.log(user, grades);

    let average = 0;

    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a,b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average} in the class.`;

};

// console.log(getStatusAlt());

getStatusAlt(2).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
});

// getUser(1).then((user) => {
//     console.log(user);
// }).catch((e) => {
//     console.log(e)
// });
//
// getGrades(101).then((grades) => {
//     console.log(grades);
// }).catch((e) => {
//     console.log(e);
// });
//
// getstatus(3).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });