import { format, getTime, formatDistanceToNow } from 'date-fns';

// Hàm định dạng ngày
export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

// Hàm định dạng ngày giờ
export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

// Hàm chuyển đổi thời gian thành timestamp
export function fTimestamp(date) {
  return getTime(new Date(date));
}

// Hàm định dạng ngày giờ với đuôi AM/PM
export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

// Hàm tính khoảng thời gian tới hiện tại
export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
