export const getTimeNyrsfm = () => {
    let date = new Date();
    let month = parseInt(date.getMonth() + 1);
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    // let callMsg =
    return (
        date.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
    );
}

export const getParamsTime = (time, type, forMat)=> {
    let date = new Date(time);
    let month = parseInt(date.getMonth() + 1);
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    // let callMsg =
    if (type == 'ny') {
        return date.getFullYear() + "-" + month
    }
    if (type == 'nyr') {
        return (
            date.getFullYear() +
            "" + month + "" + day
        );
    } else if (type == 'nyrsfm') {
        if (forMat) {
            return (
                date.getFullYear() +
                "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
            );
        } else {
            return (
                date.getFullYear() +
                "" + month + "" + day + "" + hours + "" + minutes + "" + seconds
            );
        }
    } else {
        return (
            date.getFullYear() +
            "" + month + "" + day + "" + hours + "" + minutes + "" + seconds
        );
    }
}