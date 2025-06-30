const useFormatPrice = (value) => {
    if (value >= 1000000) {
        // Jika >= 1 juta, format ke M
        return (value / 1000000).toFixed(2).replace(/\.00$/, '') + 'M'
    } else if (value >= 1000) {
        // Jika >= 1 ribu, format ke K
        return (value / 1000).toFixed(0) + 'k'
    } else {
        // Jika < 1000, tampilkan apa adanya
        return value.toString()
    }
}

export default useFormatPrice