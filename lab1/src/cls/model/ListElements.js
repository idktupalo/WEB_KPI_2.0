import ItemElem from "./ItemElem.js";

export default class ListElements {
  constructor() {
    this.itemsToLearn = [];
    this.itemsLearned = [];
  }

  _getItemIndexLearned(itemId) {
    return this.itemsLearned.findIndex((item) => item.id === itemId);
  }

  _getItemIndexToLearn(itemId) {
    return this.itemsToLearn.findIndex((item) => item.id === itemId);
  }

  getItemLearned(id) {
    return this.itemsLearned[this._getItemIndexLearned(id)];
  }

  getItemToLearn(id) {
    return this.itemsToLearn[this._getItemIndexToLearn(id)];
  }

  getItemsToLearn() {
    return this.itemsToLearn;
  }

  getItemsLearned() {
    return this.itemsLearned;
  }

  add_learned(title, translation, transcription) {
    const item = new ItemElem(title, translation, transcription);
    this.itemsLearned.push(item);
  }

  add_tolearn(title, translation, transcription) {
    const item = new ItemElem(title, translation, transcription);
    this.itemsToLearn.push(item);
  }

  delete_learned(itemId) {
    this.itemsLearned.splice(this._getItemIndexLearned(itemId), 1);
  }

  delete_tolearn(itemId) {
    console.log("list_elements" + itemId);
    this.itemsToLearn.splice(this._getItemIndexToLearn(itemId), 1);
  }

  checkSelectedLearned(itemIdList) {
    this.itemsLearned.map((item) => {
      if (itemIdList.indexOf(item.id) > -1) item.checkSelected();
    });
  }

  checkSelectedToLearn(itemIdList) {
    this.itemsToLearn.map((item) => {
      if (itemIdList.indexOf(item.id) > -1) item.checkSelected();
    });
  }

  getTitle(itemId) {
    const itemIndex = this._getItemIndexToLearn(itemId);
    return this.itemsToLearn[itemIndex].title;
  }

  getTranslation(itemId) {
    const itemIndex = this._getItemIndexToLearn(itemId);
    return this.itemsToLearn[itemIndex].translation;
  }

  getTranscription(itemId) {
    const itemIndex = this._getItemIndexToLearn(itemId);
    return this.itemsToLearn[itemIndex].transcription;
  }
}
