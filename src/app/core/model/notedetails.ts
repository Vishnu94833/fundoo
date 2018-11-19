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
export interface checklist {
    createdDate: Date
    id: string
    isDeleted: false
    itemName: string
    modifiedDate: Date
    notesId: string
    status: string

}
export interface label {
    id: string
    isDeleted: false
    label: string
    userId: string

}
