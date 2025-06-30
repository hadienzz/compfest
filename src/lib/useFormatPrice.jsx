const useFormatPrice = (value) => {

    if (value >= 1000000) {
        return (value / 1000000).toFixed(2).replace(/\.00$/, '') + 'M'
    } else if (value >= 1000) {
        return (value / 1000).toFixed(0) + 'k'
    } else {
        return value
    }
}

export default useFormatPrice