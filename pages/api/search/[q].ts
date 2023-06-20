import type { NextApiRequest, NextApiResponse } from 'next'
import { ZingMp3 } from 'zingmp3-api-full'
import { ZingMp3Response } from '../../../src/types/ZingMP3Response.type'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ZingMp3Response>
) {
    const q  = req.query.q
    await ZingMp3.search(q as string).then((data: ZingMp3Response) => {
      res.json(data)
    })
    res.end()
}