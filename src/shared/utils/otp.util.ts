/**
 * OTP Utility Functions
 * Centralized OTP generation logic following SOLID principles
 */

export interface OtpData {
  otpCode: string;
  otpExpiresAt: Date;
}

/**
 * Generates a random 6-digit OTP code
 * @returns A 6-digit string
 */
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generates an OTP expiry date
 * @param minutes - Number of minutes until expiry (default: 10)
 * @returns Date object representing the expiry time
 */
export function generateOtpExpiry(minutes: number = 10): Date {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + minutes);
  return expiryDate;
}

/**
 * Generates both OTP code and expiry date
 * @param expiryMinutes - Number of minutes until expiry (default: 10)
 * @returns Object containing otpCode and otpExpiresAt
 */
export function generateOtpData(expiryMinutes: number = 10): OtpData {
  return {
    otpCode: generateOtp(),
    otpExpiresAt: generateOtpExpiry(expiryMinutes),
  };
}
