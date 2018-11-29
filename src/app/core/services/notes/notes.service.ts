import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpservice: HttpService) { }

  // *************** Notes Service *********************************
  
  addnotes(body) {
    console.log(body);
    return this.httpservice.postDataEncodedtype('/notes/addNotes', body);
  }

  updateNotes(body){
    return this.httpservice.postDataEncodedtype("/notes/updateNotes",body);
  }

  deleteNote(body){
    return this.httpservice.postDataJsonType("/notes/trashNotes",body);
  }
  trashNotesList(){
    return this.httpservice.getDataJsonType('/notes/getTrashNotesList');
  }
  deleteForeverNotes(body){
    return this.httpservice.postDataJsonType("/notes/deleteForeverNotes",body);
  }
  getNoteList(){
    return this.httpservice.getDataEncodedType("/notes/getNotesList");
  }

  archiveNotes(body)
  {
    return this.httpservice.postDataJsonType('/notes/archiveNotes',body)
  }
  getArchiveNotesList()
  {
    return this.httpservice.getDataJsonType('/notes/getArchiveNotesList')
  }

  pinUnpinNotes(body)
  {
    return this.httpservice.postDataJsonType('/notes/pinUnpinNotes',body)
  }

  addCollaboratorsNotes(id,body)
  {
    return this.httpservice.postDataJsonType("/notes/"+id+"/AddcollaboratorsNotes",body)
  }

  removeCollaboratorNotes(id,collabId){
    return this.httpservice.deleteData("/notes/"+id+"/removeCollaboratorsNotes/"+collabId)
  }
  //*********************Reminders*****************************************/


  getReminderNotesList()
  {
    return this.httpservice.getDataJsonType('/notes/getReminderNotesList')
  }
  

  addUpdateReminderNotes(body)
  {
    return this.httpservice.postDataJsonType('/notes/addUpdateReminderNotes',body)
  }
 
  removeReminderNotes(body)
  {
    return this.httpservice.postDataJsonType("/notes/removeReminderNotes",body)
  }
  getNotesDetail(id){
    return this.httpservice.getDataJsonType("/notes/getNotesDetail/"+id)
  }

 // *************** Labels Service *********************************
  
  addLabels(body) {
    console.log(body);
    return this.httpservice.postDataJsonType('/noteLabels', body);

  }

  addLabelToNotes(cardId, labelId, body) {
    return this.httpservice.postDataEncodedtype("/notes/" + cardId + "/addLabelToNotes/" + labelId + "/add", body)
  }

  editLabels(labelId, body) { 
    console.log(body);
    return this.httpservice.postDataJsonType("/noteLabels/" + labelId + "/updateNoteLabel", body);
  }

  deleteLabel(labelId) {
    return this.httpservice.deleteData("/noteLabels/" + labelId + "/deleteNoteLabel");
  }

  getLabels() {
    return this.httpservice.getDataEncodedType('/noteLabels/getNoteLabelList')
  }

  removeLabelsFromNotes(cardId, labelId, body) {
    return this.httpservice.postDataJsonType("/notes/" + cardId + "/addLabelToNotes/" + labelId + "/remove", body)
  }

  getNotesListByLabel(label){
    return this.httpservice.postDataJsonType("/notes/getNotesListByLabel/"+label,{});
  }


  /******************CheckList*****************/
  updateCheckList(noteId,listId,body){
    return this.httpservice.postDataJsonType("/notes/"+noteId+"/checklist/"+listId+"/update",body);
  }
  addCheckList(noteId,body){
    return this.httpservice.postDataJsonType("/notes/"+noteId+"/checklist/add",body);
  }
  removeChecklist(noteId,listId){
    return this.httpservice.postDataJsonType("/notes/"+noteId+"/checklist/"+listId+"/remove",{});
  }


  changesColorNotes(body)
  {
    return this.httpservice.postDataJsonType('/notes/changesColorNotes',body)
  }
}
