const reverseStr = (message) => {
    let listOfChars = message.split('');
    let reverseListOfChars = listOfChars.reverse();
    let reversedStr = reverseListOfChars.join('');
    return reversedStr;
    // return message.split('').reverse().join('');
}

const isPalindrome = (str) => {
    let reverse = reverseStr(str);
    return str === reverse;
}

const convertDateToString = (date) => {
    let dateStr = { day: '', month: '', year: '' };
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

const getAllDateFormats = (date) => {
    let dateStr = convertDateToString(date);
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

const checkPalindromeForAllDateFormats = (date) => {
    let listOfPalindromes = getAllDateFormats(date);
    let isPalindromebool = false;
    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            isPalindromebool = true;
            break;
        }
    }
    return isPalindromebool;
}

const isLeapYear = (year) => {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

const getPreviousDate = (date) => {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day < 1) {
        if (month == 1) {
            month = 12;
            year--;
            day = daysInMonth[month - 1];
        }
        else if (month == 3) {
            month--;
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = daysInMonth[month - 1];
            }
        }
        else {
            month--;
            day = daysInMonth[month - 1]
        }
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

const getNextDate = (date) => {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }

    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

const getNextPalindromeDate = (date) => {
    let counter = 0;
    let nextDate = getNextDate(date);

    while (1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

const getPreviousPalindromeDate = (date) => {
    let counter = 0;
    let prevDate = getPreviousDate(date);

    while (1) {
        counter++;
        let isPalindrome = checkPalindromeForAllDateFormats(prevDate);
        if (isPalindrome) {
            break;
        }
        prevDate = getPreviousDate(prevDate);
    }
    return [counter, prevDate];
}


const bdayInput = document.querySelector("#bday-input");
const submitBtn = document.querySelector("#submit-btn");
const outputText = document.querySelector("#result");
// const captionText = document.querySelector("#caption");
const loader = document.querySelector(".loader");


loader.style.display = "none";
outputText.style.display = "none";

const submitHandler = (_) => {
    if (bdayInput.value) {
        outputText.style.display = "none";
        loader.style.display = "block";
        setTimeout(() => {
            let bdayStr = bdayInput.value;
            let dateComponents = bdayStr.split('-');
            let date = {
                day: Number(dateComponents[2]),
                month: Number(dateComponents[1]),
                year: Number(dateComponents[0])
            };

            let isPalindrome = checkPalindromeForAllDateFormats(date);
            if (isPalindrome) {
                showMessage("Yay!! Your Birthday is a Palindrome 😁");
            } else {
                let [ctr, nextDate] = getNextPalindromeDate(date);
                let [ctr2, prevDate] = getPreviousPalindromeDate(date);
                showMessage(`The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} and the previous palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year} you missed them both by ${ctr} day${ctr === 1 ? "" : "s"} and ${ctr2} day${ctr2 === 1 ? "" : "s"} respectively 😣`);
            }
        }, 3000);
    } else {
        showMessage("Enter a birthday date !! 😉");
    }

}

const showMessage = (txt) => {
    loader.style.display = "none";
    outputText.style.display = "inline-block";
    outputText.innerText = txt;
}


submitBtn.addEventListener("click", submitHandler);