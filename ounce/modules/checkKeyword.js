const Inko = require('inko');

module.exports = {
    checkWord : async(keyword) => {
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if (korean.test(keyword)) {
            return true;
        }

        return false;
    },

    changeKeyword : async(keyword) => {
        const inko = new Inko();
        const korKeyword = inko.en2ko(keyword);
        return korKeyword;
    }

}