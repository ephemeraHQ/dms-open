import { Request, Response } from 'express'
import db from '../../utils/db'

const handler = async (req: Request, res: Response): Promise<void> => {

  const { doc_id }: { doc_id: string} = req.body

  const snapshot = await db.collection('Chat').doc(doc_id).get()
  if (snapshot.exists) {
    const data = snapshot.data()

    if (data && "user_two_address" in data) {
      res.status(404).json({ error: `Chat id ${doc_id} is already used` })
    } else {

      res.status(200).json(data)
    }

  } else {
    res.status(404).json({ error: `Document id ${doc_id} not found` })
  }

}

export default handler;
