const status = import.meta.env.VITE_LOGGER_SWITCH

const info = (message: string) => {
  if (!status) return
  console.log(message);
}

const error = (message: string) => {
  if (!status) return 
  console.log('\x1B[31m%s\x1B[0m', message);
}

const warn = (message: string) => {
  if (!status) return
  console.log('\x1B[33m%s\x1B[0m', message);
}

const success = (message: string) => {
  if (!status) return
  console.log('\x1B[32m%s\x1B[0m', message);
}

const setting = (title: string, message: string) => {
  if (!status) return
  console.log(`🪛 %c[${title}] %c${message}`, 'color: #f87171', 'color: #d1d5db');
}

export default {
  info,
  error,
  warn,
  success,
  setting
}
