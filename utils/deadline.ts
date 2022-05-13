import { now } from './time'

/**
 * @param deadline = now() + 5m
 * @returns boolean
 */
export const verifyDeadline = (deadline: string | number): boolean => {
  if (!deadline) {
    return false
  }
   
  return now() < Number(deadline)
}
