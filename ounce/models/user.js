const pool = require('../modules/pool');
const table = 'user';

const user = {
    signup: async (id,  password, salt, email) => {
        const fields = 'id, password, salt, email';
        const questions = `?, ?, ?, ?`;
        const values = [id, password, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch(err) {
        if (err.errno == 1062) {
            console.log('signup ERROR : ', err.errno, err.code);
            throw err;
            }   
        }
    },

    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } 
            return true;
        } catch (err) {
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    findByUserId: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    getUserById: async (id) => {
        const query = `SELECT * FROM ${table} WHERE userIdx="${id}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            console.log('getUserById ERROR : ', err);
            throw err;
        }
    },
    getUserByIdx: async (idx) => {
        const query = `SELECT * FROM ${table} WHERE userIdx="${idx}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            console.log('getUserByIdx ERROR : ', err);
            throw err;
        }
    },

    getProfileCount: async(userIdx) => {
        const query = `SELECT p.profileIdx, count(p.profileIdx) as profileCount FROM user u JOIN profile p ON u.userIdx = p.userIdx WHERE u.userIdx = ${userIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('profileCount Error');
            throw err;
        }
    }

    
}

module.exports = user;