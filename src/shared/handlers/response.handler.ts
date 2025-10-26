/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export function responseHandler({
  success,
  statusCode,
  message,
  data,
}: {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
}) {
  return {
    success,
    statusCode,
    message,
    data: data || null,
  };
}
