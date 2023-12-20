// @mui
import { useTheme } from '@mui/material/styles';
// hooks
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

// Hàm trả về giá trị font cho một biến thể (variant) cho font chữ.
export default function GetFontValue(variant) {
  const theme = useTheme();
  const breakpoints = useWidth();

  const key = theme.breakpoints.up(breakpoints === 'xl' ? 'lg' : breakpoints);

  const hasResponsive =
    variant === 'h1' ||
    variant === 'h2' ||
    variant === 'h3' ||
    variant === 'h4' ||
    variant === 'h5' ||
    variant === 'h6';

  const getFont =
    hasResponsive && theme.typography[variant][key] ? theme.typography[variant][key] : theme.typography[variant];

  const fontSize = remToPx(getFont.fontSize);
  const lineHeight = Number(theme.typography[variant].lineHeight) * fontSize;
  const { fontWeight } = theme.typography[variant];
  const { letterSpacing } = theme.typography[variant];

  return { fontSize, lineHeight, fontWeight, letterSpacing };
}

// ----------------------------------------------------------------------

// Hàm chuyển đổi giá trị từ rem sang px

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

// Hàm chuyển đổi giá trị từ px sang rem

export function pxToRem(value) {
  return `${value / 16}rem`;
}

// Hàm tạo các font size đáp ứng
export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

// ----------------------------------------------------------------------
// Hàm sử dụng để lấy kích thước chiều rộng (width)

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useResponsive('up', key);
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}
