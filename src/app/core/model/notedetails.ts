import { label } from "./labels";
import { checklist } from "./checklist";

export interface Notedetails {

    collaborators: [object]
    color: string
    createdDate: Date
    description: ""
    id: string
    imageUrl: string
    isArchived: false
    isDeleted: false
    isPined: false
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
