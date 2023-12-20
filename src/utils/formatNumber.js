import numeral from 'numeral';

// Hàm định dạng số tiền
export function fCurrency(number) {
  return numeral(number).format('0,0') + 'VNĐ';
}

// Hàm định dạng phần trăm
export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

// Hàm định dạng số
export function fNumber(number) {
  return numeral(number).format();
}

// Hàm rút gọn số
export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

// Hàm định dạng dữ liệu
export function fData(number) {
  return numeral(number).format('0.0 b');
}
