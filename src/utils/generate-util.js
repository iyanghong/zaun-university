import {generatePersonal} from "@/api/tool";
import {addStudent, addTeacher, getAllTeacher} from "@/api/user";
import {createClassGrade} from "@/api/classGrade";
import generate from "@/providers/dataGenerate";

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPersonal() {
    let sex = ['男', '女'];
    let ramInt = Math.floor(Math.random() * 100 + 1);
    ramInt = ('000' + ramInt).substr(-3);
    let data = {
        username: generate.phone(),
        name: generate.name(),
        cardId: generate.cardId(),
        sex: sex[Math.floor(Math.random() * sex.length)],
        phone: generate.phone(),
        email: generate.email(),
        address: generate.addressCode(),
        idPhoto: `https://resources.iyanghong.cn/global/header/${ramInt}.jpg`,
    };
    return data;
}

export function generateTeacher(num) {
    return new Promise(async resolve => {
        const jobsData = [
            {value: '普通教师'},
            {value: '中级教师'},
            {value: '高级教师'},
            {value: '副教授'},
            {value: '教授'},
        ]
        for (let i = 0; i < num; i++) {
            await generatePersonal().then(async response => {
                if (response.success === true) {
                    let ramInt = Math.floor(Math.random() * 100 + 1);
                    ramInt = ('000' + ramInt).substr(-3);
                    let data = {
                        username: response.data.phone,
                        name: response.data.name,
                        cardId: response.data.carId,
                        sex: response.data.sex,
                        phone: response.data.phone,
                        email: response.data.email,
                        address: response.data.addressCode,
                        idPhoto: `https://resources.iyanghong.cn/global/header/${ramInt}.jpg`,
                        job: jobsData[Math.floor(Math.random() * jobsData.length)].value,
                    };
                    await addTeacher(data)
                    // this.data = data;
                }
            })
        }

        resolve();
    })
}

export function generateRandomTeacher() {
    let num = random(10, 30);
    return generateTeacher(num)
}

export function generateStudent(num, cid) {
    return new Promise(async resolve => {
        for (let i = 0; i < num; i++) {
            let data = getPersonal();
            data.cid = cid || '';
            await addStudent(data)
        }

        resolve();
    })
}


export function generateRandomStudent(cid, min = 10, max = 30) {
    let num = random(min, max);
    return generateStudent(num, cid)
}

export function generateClass(num, pid) {
    return new Promise(async resolve => {
        let gradeList = [2019, 2020, 2021, 2022];
        let response = await getAllTeacher();
        let teacherList = response.data;
        for (let i = 0; i < num; i++) {
            let teacher = teacherList[Math.floor(Math.random() * teacherList.length)]
            let data = {
                grade: gradeList[Math.floor(Math.random() * gradeList.length)],
                principal: (teacher && teacher.id) || null,
                pid
            }
            await createClassGrade(data)
        }
        resolve();
    });

}

export function generateRandomClass(pid) {
    let num = random(2, 10);
    return generateClass(num, pid)
}
