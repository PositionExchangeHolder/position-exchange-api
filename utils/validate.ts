import { getPoolLength } from './stakingPool'

export const validateQueryPoolPids = async (pids: string[]): Promise<string[]> => {
  const poolLength = await getPoolLength()
  const poolPids: string[] = []
  for (let i = 0; i < pids.length; i++) {
    if (Number(pids[i]) < poolLength && !poolPids.includes(pids[i])) {
      poolPids.push(pids[i])
    }
  }

  return poolPids
}
