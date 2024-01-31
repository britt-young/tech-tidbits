// Helper "date" function for handlebars template
module.exports = {
    format_date: (date) => {
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
    }
}