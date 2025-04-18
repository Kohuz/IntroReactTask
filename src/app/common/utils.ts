export function formatCurrency(
  value: number,
  locale: string = "cs-CZ",
  currency: string = "CZK"
): string {
  let formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
  return `-${formattedValue}`;
}
