function formatNumber (n) {
    const str = n.toString();
    return str[1] ? str : `0${str}`;
}

export function formatTime (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const t1 = [year, month, day].map(formatNumber).join('/');
    const t2 = [hour, minute, second].map(formatNumber).join(':');

    return `${t1} ${t2}`;
}

export function styles (style) {
    let s = [];
    for (let i in style) {
        s.push(i + ':' + style[i]);
    }
    s = s.join(';');
    return s;
}

export function toast (content) {
    wx.showToast({
        title: content,
        icon: 'none',
        duration: 1000
    });
}

export default {
    formatNumber,
    formatTime,
    styles,
    toast
};
