import { getXataClient } from '../../utils/xata.codegen'
import { Base64 } from 'js-base64'

const handler = async (req, res) => {
    try {
        const xata = getXataClient()
        const hashedPassword = Base64.encode(req.body.password)
        const record = await xata.db.users.create({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
        })

        return res.status(201).json(record)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}
export default handler
