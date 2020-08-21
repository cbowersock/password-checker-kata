let changes = 0;
let uppers = 0;
let lowers = 0;
let nums = 0;
let originalPass;
let appropriateLengthChecked = false;
let alphaUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let alphaLower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const strongPasswordChecker = function (s) {

    changes = 0;
    uppers = 0;
    lowers = 0;
    nums = 0;

    originalPass = s.split('');

    if (originalPass.length > 20) {
        checkLong(originalPass);
    }

    if (originalPass.length < 5) {
        checkVeryShort(originalPass);
    }

    if (originalPass.length == 5) {
        checkKindaShort(originalPass);
    }

    if (originalPass.length > 5 && originalPass.length < 21 && appropriateLengthChecked == false) {
        checkAppropriateLength(originalPass);
    }

    return changes;
};

const checkSpecials = password => {
    password.forEach(char => {
        if (digits.includes(char)) {
            nums++;
        }
        else if (alphaUpper.includes(char)) {
            uppers++;
        }
        else if (alphaLower.includes(char)) {
            lowers++
        }
    })
    if (uppers == 0) {
        changes++;
    }
    if (lowers == 0) {
        changes++;
    }
    if (nums == 0) {
        changes++;
    }
}

const checkVeryShort = password => {
    changes = changes + (6 - password.length);
}

const checkKindaShort = password => {
    let usedSpecials = 0;
    checkSpecials(password);
    if (uppers != 0) {
        usedSpecials++;
    }
    if (lowers != 0) {
        usedSpecials++
    }
    if (nums != 0) {
        usedSpecials++
    }
    if (usedSpecials == 2 || usedSpecials == 3) {
        changes = 1;
    }
}

const checkAppropriateLength = password => {
    let unusedSpecials = 0;
    let hasThreeInARow = false;
    let multsOf3 = 0;
    checkSpecials(password);
    let i;
    let length = password.length;
    for (i = 0; i < length; i++) {
        if (password[i] == password[i + 1] && password[i] == password[i + 2]) {
            changes++;
            i = i + 2;
            hasThreeInARow = true;
            multsOf3++;
        }
    }
    if (hasThreeInARow) {
        if (uppers == 0) {
            unusedSpecials++;
        }
        if (lowers == 0) {
            unusedSpecials++
        }
        if (nums == 0) {
            unusedSpecials++
        }
        if (multsOf3 > 1) {
            changes = changes - unusedSpecials;
        }
        else {
            changes = changes - multsOf3;
        }
    }
}

const checkLong = password => {
    let fewestChanges = 1000;
    let bestPass;
    let i;
    let length = password.length;
    for (i = 0; i < length; i++) {
        if (password[i + 19] != undefined) {
            let newPass = password.slice(i, i + 20);
            changes = 0;
            uppers = 0;
            lowers = 0;
            nums = 0;
            checkAppropriateLength(newPass);
            if (changes < fewestChanges) {
                fewestChanges = changes;
                bestPass = newPass;
                appropriateLengthChecked = true;
            }
        }
    }
    changes = fewestChanges;
    changes = changes + (password.length - 20);
    originalPass = bestPass;
}

module.exports = {
    strongPasswordChecker: strongPasswordChecker
};