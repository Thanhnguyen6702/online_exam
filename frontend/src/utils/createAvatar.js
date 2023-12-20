// Các ký tự đầu tiên tương ứng với mỗi loại màu sắc avatar
const PRIMARY_NAME = ['A', 'N', 'H', 'L', 'Q', '9', '8'];
const INFO_NAME = ['F', 'G', 'T', 'I', 'J', '1', '2', '3'];
const SUCCESS_NAME = ['K', 'D', 'Y', 'B', 'O', '4', '5'];
const WARNING_NAME = ['P', 'E', 'R', 'S', 'C', 'U', '6', '7'];
const ERROR_NAME = ['V', 'W', 'X', 'M', 'Z'];

// Lấy ký tự đầu tiên của name và chuyển đổi thành chữ hoa
function getFirstCharacter(name) {
  return name && name.charAt(0).toUpperCase();
}

// Xác định màu sắc của avatar dựa trên ký tự đầu tiên của name
function getAvatarColor(name) {
  if (PRIMARY_NAME.includes(getFirstCharacter(name))) return 'primary';
  if (INFO_NAME.includes(getFirstCharacter(name))) return 'info';
  if (SUCCESS_NAME.includes(getFirstCharacter(name))) return 'success';
  if (WARNING_NAME.includes(getFirstCharacter(name))) return 'warning';
  if (ERROR_NAME.includes(getFirstCharacter(name))) return 'warning'; // Sử dụng màu sắc warning cho các ký tự không nằm trong các danh sách trên
  return 'default'; // Màu sắc mặc định
}

// Hàm tạo avatar
export default function createAvatar(name) {
  return {
    name: getFirstCharacter(name), // Ký tự đầu tiên của name
    color: getAvatarColor(name), // Màu sắc tương ứng
  };
}
