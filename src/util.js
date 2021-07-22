/**
 * 이메일 주소마스킹
 * @param {string} email
 */
export function maskEmail(email = '') {
    const emailId = email.split('@')[0]
    const emailDomain = email.split('@')[1]
    switch (emailId.length) {
        case 0:
            return emailId +'@'+ emailDomain;
        case 1:
            return emailId +'@'+ emailDomain;
        case 2:
            return emailId.substring(0, 0) + '*@'+ emailDomain;
        case 3:
            return emailId.substring(0, 1) + '*' + emailId.substring(2, 3) +'@'+ emailDomain;
        case 4:
            return emailId.substring(0, 1) + '**' + emailId.substring(3, 4) +'@'+ emailDomain;
        case 5:
            return emailId.substring(0, 2) + '**' + emailId.substring(4, 5) +'@'+ emailDomain;
        case 6:
            return emailId.substring(0, 2) + '***' + emailId.substring(5, 6) +'@'+ emailDomain;
        case 7:
            return emailId.substring(0, 2) + '***' + emailId.substring(5, 7) +'@'+ emailDomain;
        case 8:
            return emailId.substring(0, 2) + '****' + emailId.substring(6, 8) +'@'+ emailDomain;
        case 9:
            return emailId.substring(0, 3) + '****' + emailId.substring(7, 9) +'@'+ emailDomain;
        default:
            return emailId.substring(0, 3) + '*****' + emailId.substring(8) +'@'+ emailDomain;
    }
}

/**
 * 휴대전화번호 마스킹
 * @param {strinng} mobile
 */
export function maskMobile(mobile = '') {
    const filtered = mobile.replace(/[^0-9]/gi, "");
    if (filtered.length == 10) {
        const first = filtered.substring(0, 3);
        const second = filtered.substring(3, 6);
        const third = filtered.substring(6, 10);
        return first +"-"+ second.substring(0, 1) + '**-' + third.substring(0, 2) + '**'
    } else if (filtered.length == 11) {
        const first = filtered.substring(0, 3);
        const second = filtered.substring(3, 7);
        const third = filtered.substring(7, 11);
        return first +"-"+ second.substring(0, 2) + '**-' + third.substring(0, 2) + '**'
    } else {
        return mobile;
    }
}