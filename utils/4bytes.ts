import axios from 'axios'

const FOR_BYTE_DIRECTION_API = 'https://www.4byte.directory/api/'

/**
 Response Example:
  {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 35318,
            "created_at": "2018-06-24T17:59:46.647106Z",
            "text_signature": "balanceOf()",
            "hex_signature": "0x722713f7",
            "bytes_signature": "r'\u0013÷"
        }
    ]
  }
 */

export const getTextSignature = async (bytesSignature: string): Promise<string> => {
  const api = `${FOR_BYTE_DIRECTION_API}/v1/signatures/?hex_signature=${bytesSignature}`
  const res = await axios.get(api)
  const { data } = res

  if (data.count < 1) {
    return ''
  }
  
  const textSignature = data.results[0].text_signature

  return textSignature
}
