// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ZingMp3 } from 'zingmp3-api-full'
import { ZingMp3Response } from '../../src/types/ZingMP3Response.type'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ZingMp3Response>
) {
    await ZingMp3.getTop100().then((data: ZingMp3Response) => {
      res.status(200).json(data)
    })
    res.end()
}
