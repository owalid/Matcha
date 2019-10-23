import faker from 'faker';
import bcrypt from 'bcrypt';
import { client } from '../connection';
import moment from "moment-timezone";
require('dotenv').config();

let date = moment.tz(moment(), "Europe/Paris").format();

const generateInterestUser = async () => {
    var sql = 'INSERT INTO users_interest(id_users, id_interest) VALUES($1, $2) RETURNING *'
    for (let i = 1; i <= 500; i++) {
        var values = [i, Math.floor(Math.random() * (1 - 6) + 6)]
        try {
            await client.query(sql, values);
            process.stdout.write(`USER INTEREST: ${i}/500\n`);
        } catch (err) {
            console.error(err);
        }
    }
}

const generateImg = () => {
    let tab = ['women', 'men'];

  return `https://randomuser.me/api/portraits/${tab[Math.floor(Math.random() * (0 - 2) + 2)]}/${Math.floor(Math.random() * (100 - 1) + 1)}.jpg`
}

const generateUser = (password) => {
    let img1 = generateImg();
    let img2 = generateImg();
    let img3 = generateImg();
    let uid = Math.floor(Math.random() * (99999 - 10000) + 10000);

    var gender = ["M", "F"];
    var orientation = ["G", "B", "H"];
    let user = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        password: password,
        email: faker.internet.email(),
        gender: gender[Math.floor(Math.random() * (0 - 2) + 2)],
        date_of_birth: faker.date.between('1970-01-01', '2000-01-01'),
        sexual_or: orientation[Math.floor(Math.random() * (0 - 3) + 3)],
        bio: faker.lorem.sentences(),
        popular_score: Math.floor(Math.random() * 100),
        hash: "",
        is_verified: 1,
        max_distance: Math.floor(Math.random() * 10),
        age_min: Math.floor(Math.random() * (30 - 18) + 18),
        age_max: Math.floor(Math.random() * (80 - 30) + 30),
        picture: `{${img1}, ${img2}, ${img3}}`,
        uid: uid.toString(),
        last_log: date
    };
    return user;
}

const generate = async (password) => {
    var user = generateUser(password);
    var sql = 'INSERT INTO users(age_max, age_min, bio, date_of_birth, email, \
                first_name, gender, hash, is_verified, last_name, \
                max_distance, password, popular_score, sexual_or, picture, uid, last_log) \
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *';
    var value = [user.age_max, user.age_min, user.bio, user.date_of_birth, user.email,
    user.first_name, user.gender, user.hash, user.is_verified, user.last_name,
    user.max_distance, user.password, user.popular_score,
    user.sexual_or, user.picture, user.uid, user.last_log];
    try {
        await client.query(sql, value);
    } catch (e) {
        console.error(e);
    }
}
const main = async () => {
    let colors = ["\x1b[31m", "\x1b[32m", "\x1b[33m",
        "\x1b[34m", "\x1b[35m", "\x1b[36m", "\x1b[34m",
        "\x1b[35m", "\x1b[36m", "\x1b[37m"]
    let dots = "";
    let maxDots = false;
    let password = await bcrypt.hash("123456789", parseInt(process.env.SALT_ROUNDS));
    for (let i = 1; i <= 500; i++) {
        await generate(password);
        if (dots === '...................................') {
            maxDots = true;
        }
        if (dots === '')
            maxDots = false;
        if (maxDots === true) {
            dots = dots.slice(0, dots.length - 1);
        }
        else
            dots += '.';
        console.log(colors[Math.floor(Math.random() * (10 - 0) + 0)], `USER: ${i}/500 ${dots}`);
    }
    try {
        let sql = `  INSERT INTO "users_achievement"
        ("id_achievement", "id_users")
        VALUES(1, 2);
      INSERT INTO "users_achievement"
        ("id_achievement", "id_users")
        VALUES(2, 2);
      INSERT INTO "users_achievement"
        ("id_achievement", "id_users")
        VALUES(4, 2);
      INSERT INTO "users_achievement"
        ("id_achievement", "id_users")
        VALUES(5, 2);
      INSERT INTO "users_achievement"
        ("id_achievement", "id_users")
        VALUES(6, 2);`
        await generateInterestUser();
        await client.query(sql);
    } catch (e) {
        console.error(e);
    }
    console.log("Finish");
}

main();