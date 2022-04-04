import { VercelRequest, VercelResponse } from '@vercel/node'
import { version } from '../package.json'
import { endpoint } from '../utils/endpoint'

export default (req: VercelRequest, res: VercelResponse): void => {
  res.json({ version, endpoint })
}
