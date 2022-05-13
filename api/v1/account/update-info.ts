import { VercelRequest, VercelResponse } from '@vercel/node'
import updateAccountInfo from '../../../jobs/firebase/updateAccountInfo'
import { verifyBearerToken } from '../../../utils/jwt'
import { isEmptyObject, removeUndefinedFromObject } from '../../../utils/utils'

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<VercelResponse | void> => {
  if (req.method?.toUpperCase() !== 'POST') {
    return res.status(204).end()
  }

  try {
    if (
      req.headers
      && req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = req.headers.authorization.split(' ')[1]
      const payload = verifyBearerToken(token)
      const address = req.body.address || ''

      if (
        !address
        && address.toLowerCase() !== payload.address.toLowerCase()
      ) {
        return res.status(401).json({
          error: {
            message: 'Unauthorized'
          }
        })
      }
      
      const data = {
        name: req.body.name,
        email: req.body.email,
        github: req.body.github,
        twitter: req.body.twitter,
        ref: req.body.ref
      }
      const cleanData = removeUndefinedFromObject(data)

      if (isEmptyObject(cleanData)) {
        return res.status(400).json({
          error: {
            message: 'Bad Request: Whatcha Doin?'
          }
        })
      }
      
      const result = await updateAccountInfo(address, cleanData)
      if (!result) {
        return res.status(400).json({
          error: {
            message: 'Bad Request: Account is not active'
          }
        })
      }
      
      return res.status(200).json({
        success: true,
        address,
        data: cleanData
      })
    } else {
      return res.status(401).json({
        error: {
          message: 'Unauthorized'
        }
      })
    }
  } catch (error) {
    console.log({ error })
    return res.status(500).json({
      error: {
        message: 'Unknown error.'
      }
    })
  }
}
