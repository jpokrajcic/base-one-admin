function formatCurrency(inNumber) {
  if (inNumber !== 0 && !inNumber) {
    return null;
  }
  return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(inNumber);
}

export { formatCurrency };
