import { label } from "./labels";
import { checklist } from "./checklist";

export class Notedetails {

    collaborators: [object]
    color: string
    createdDate: Date
    description: ""
    id: string
    imageUrl: string
    isArchived: boolean
    isDeleted: boolean
    isPined: boolean
    label: Array<label>
    labelIdList: [object]
    linkUrl: ""
    modifiedDate: Date
    noteCheckLists: Array<checklist>
    noteLabels: Array<label>
    questionAndAnswerNotes: [object]
    reminder: [object]
    title: string
    userId: string
}
