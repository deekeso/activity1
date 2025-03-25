import { ElNotification } from "element-plus";

export function useNotification() {
  const successMsg = (options = {}) => {
    ElNotification(options);
  };

  const errorMsg = (options = {}) => {
    ElNotification(options);
  };

  return { successMsg, errorMsg };
}
