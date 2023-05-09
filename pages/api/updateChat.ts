import { Request, Response } from 'express'
import db from '../../utils/db'

const handler = async (req: Request, res: Response): Promise<void> => {

  const { doc_id, user_two_address }: { doc_id: string, user_two_address: string } = req.body

  const docRef = await db.collection('Chat').doc(doc_id)
  const update = await docRef.update({
    user_two_address
  })

  res.status(200).json(update)
}

export default handler;
