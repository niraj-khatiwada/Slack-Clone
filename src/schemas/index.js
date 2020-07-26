import { gql } from "apollo-server-express"

import channel from "./channel"
import user from "./user"
import message from "./message"
import team from "./team"


const basicResponse = gql`
type BasicResponse {
    success: Boolean!
    message: String
}
`

export default [channel, user, message, team, basicResponse]