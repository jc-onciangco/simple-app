const formatCurrency = value => {
    return new Intl.NumberFormat('fil-PH', {style: 'currency', currency: 'PHP'}).format(value)
}

export default formatCurrency