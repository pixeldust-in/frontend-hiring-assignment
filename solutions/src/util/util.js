export const groupBy = (array, key) => {
    return array.reduce((acc, curr) => {
        if (!acc.hasOwnProperty(curr[key]))
            acc[curr[key]] = [{...curr}]
        else
            acc[curr[key]].push({...curr})
        return acc;
    }, {})
}

export const dateFilter = (input) => {
    let today = new Date().getDate()
    let date = new Date(input)
    if (date.getDate() === today) {
        return "Today";
    } else if ((date.getDate() - today) === 1) {
        return "Tomorrow";
    } else {
        let dateSplit = date.toDateString().split(" ")
        return `${dateSplit[1]} ${dateSplit[2]}`
    }
}

export const timeRange = (input) => {
    let time = new Date(input);
    let hh = time.getHours()
    let mm = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
    return `${hh}:${mm}`
}

export const getTotalTime = (list) => {
    return list.reduce((acc, curr) => {
        acc  = acc + (new Date(curr['endTime']).getHours() - new Date(curr['startTime']).getHours())
        return acc;
    }, 0)
}